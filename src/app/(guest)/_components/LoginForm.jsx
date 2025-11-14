'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validationSchema';
import { toast } from 'react-toastify';
import EastIcon from '@mui/icons-material/East';
import axios from 'axios';


export default function LoginForm() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');
    const emailVerified = searchParams.get('email_verified');
    const router = useRouter();
    const [role, setRole] = useState(2);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotError, setForgotError] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState("");
    // useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    // useEffect(() => {
    //     const role = searchParams.get("role");
    //     if (role) {
    //         sessionStorage.setItem("role", role);
    //     }
    // }, [searchParams]);

    useEffect(() => {
        const role = searchParams.get("role");
        if (role) {
            sessionStorage.setItem("role", role);
        }

        // Check for email_verified parameter
        if (emailVerified === 'true') {
            toast.success("Email already verified. Please login.");
            // Optional: Clear the parameter from URL without page reload
            const url = new URL(window.location.href);
            url.searchParams.delete('email_verified');
            window.history.replaceState({}, '', url.toString());
        }


        // Check for Google OAuth callback parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const user = urlParams.get('user');
        const type = urlParams.get('type');

        if (token && user) {
            // Handle Google OAuth success
            handleGoogleAuthSuccess(token, user, type);
        }
    }, [searchParams]);

    useEffect(() => {
        const storedRole = sessionStorage.getItem('role');
        if (storedRole) {
            const parsedRole = parseInt(storedRole, 10);
            setRole(parsedRole);

            // Optional: Clear role after setting it, if not needed again
            sessionStorage.removeItem('role');
        }
    }, []);

    const handleGoogleAuthSuccess = (token, userData, userType) => {
        try {
            const user = JSON.parse(userData);

            // Store token and user data
            Cookies.set('token', token, {
                expires: 7,
                secure: true,
                sameSite: 'Lax',
            });
            localStorage.setItem('user', JSON.stringify(user));

            toast.success("Google login successful!");

            // Redirect based on user type
            if (userType === 'coach' || user.user_type === 3) {
                router.push('/coach/dashboard');
            } else {
                router.push('/user/dashboard');
            }
        } catch (error) {
            console.error('Error handling Google auth success:', error);
            toast.error('Failed to complete Google login');
        }
    };

    const handleNavigation = async (path) => {
        try {
            router.push(path);
            await new Promise(resolve => setTimeout(resolve, 100));
            router.refresh();
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = path;
        }
    };


    // handle form submit
    const onSubmit = async (data) => {
        setLoading(true);
        setError('');

        const dataToSend = { ...data, user_type: role };

        try {
            // const result = await HandleLogin(dataToSend);
            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/login`,
                dataToSend,
                {
                    headers: { "Content-Type": "application/json" },
                    // withCredentials: true, // if you want Laravel to set cookies
                }
            );

            if (result?.response?.status === 403) {
                setError(result.response.data.error || 'User not found or deactivated');
                setLoading(false);
                return;
            }

            if (result?.response?.status === 401) {
                setError(result.response.data.error || 'Invalid credentials');
                setLoading(false);
                return;
            }

            if (result.data.token) {
                Cookies.set('token', result.data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'Lax',
                });
                localStorage.setItem('user', JSON.stringify(result.data.user));
            }

            if (redirect) {
                await handleNavigation(redirect);
            } else if (result.data.user.user_type === 2) {
                toast.success("Login successful!");
                await handleNavigation('/user/dashboard');
            } else if (result.data.user.user_type === 3) {
                toast.success("Login successful!");
                await handleNavigation('/coach/dashboard');
            } else {
                await handleNavigation('/');
            }
        } catch (err) {
            console.log('errrr', err)
            if (err.response && err.response.status === 401) {
                if (role == 3) {
                    setError('Invalid Coach Credentials');
                } else {
                    setError('Invalid User Credentials');
                }
            } else if (err.response && err.response.status === 403) {
                setError(err?.response?.data?.error || 'Please check your email for a verification link');
            } else {
                setError('Something went wrong. Please try again.');
            }
        }

        setLoading(false);
    };

    const handleRoleSwitch = (newRole) => {
        setRole(newRole);
    };

    const handleGoogleLogin = (userRole) => {
        setGoogleLoading(true);

        // Determine user type for the redirect
        const userType = userRole === 3 ? 'coach' : 'user';

        // Redirect directly to the backend endpoint that will handle the OAuth flow
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect?user_type=${userType}`;
    };


    const handleForgotPassword = async () => {
        setForgotError("");
        setForgotSuccess("");

        if (!forgotEmail) {
            setForgotError("Please Enter Your Email");
            return;
        }

        setForgotLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
                { email: forgotEmail }
            );

            if (res.data.status === true) {
                toast.success("Please Check Your Eamil, Password reset link sent successfully!");
                setShowForgotModal(false);
                setForgotError("");
                setForgotSuccess("");
                setForgotEmail("");

            } else {
                setForgotError(res.data.message || "Failed to send reset link.");
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setForgotError(err.response.data.message);
            } else if (err.response?.data?.errors?.email?.[0]) {
                setForgotError(err.response.data.errors.email[0]);
            } else {
                setForgotError("Something went wrong. Please try again.");
            }
        }
        setForgotLoading(false);
    };



    return (
        <div className="signup-page-add login-page-form">
            <div className="container-fluid">
                <div className="row signup-page-top login-content-add">
                    <div className="col-md-12 signup-right-side login-right-side">
                        <div className="login-container">
                            <h2>Log in</h2>
                            <div className="tabs">
                                <button
                                    onClick={() => handleRoleSwitch(3)}
                                    className={`tab ${role === 3 ? 'active' : ''}`}
                                >
                                    I'm a Coach
                                </button>
                                <button
                                    onClick={() => handleRoleSwitch(2)}
                                    className={`tab ${role === 2 ? 'active' : ''}`}
                                >
                                    I'm a User
                                </button>
                            </div>

                            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                                <label>Email or Username</label>
                                <input
                                    type="text"
                                    // {...register('email')}
                                    {...register('email', {
                                        onChange: (e) => {
                                            setError('');
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p style={{ color: 'red' }}>{errors.email.message}</p>
                                )}

                                <label>Password</label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        onChange: (e) => {
                                            setError('');
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p style={{ color: 'red' }}>{errors.password.message}</p>
                                )}

                                {error && (
                                    <div style={{ color: 'red', marginBottom: '10px' }}>
                                        {error}
                                    </div>
                                )}

                                {/* <div className="forgot">
                                    <a href="#">Forgot password?</a>
                                </div> */}

                                <div className="forgot">
                                    <button
                                        type="button"
                                        className="forgot-btn"
                                        onClick={() => setShowForgotModal(true)}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button type="submit" className="login-btn" disabled={loading}>
                                    {loading ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        <>
                                            Log in
                                            <EastIcon className='mui-icons' />
                                        </>
                                    )}
                                </button>

                                <div className="divider">
                                    <span>Or</span>
                                </div>

                                {/* <button className="google-login" type="button">
                                    <img src="./images/google.png" alt="google" />
                                    Log in with Google
                                </button> */}
                                <button
                                    className="google-login"
                                    type="button"
                                    onClick={() => handleGoogleLogin(role)}
                                    disabled={googleLoading}
                                >
                                    <img src="./images/google.png" alt="google" />
                                    {googleLoading ? 'Redirecting...' : 'Log in with Google'}
                                </button>

                                <p className="signup-text">
                                    Don’t have an account?
                                    <Link
                                        href="/register"
                                        onClick={() => sessionStorage.setItem('role', role)}
                                    >
                                        Sign up as a {role == 3 ? 'Coach' : 'User'}
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {/* ===== Forgot Password Modal ===== */}
            {showForgotModal && (
                <div className="forgot-modal-overlay ">
                    <div className="forgot-modal-container">
                        <button
                            className="forgot-modal-close"
                            onClick={() => {
                                setShowForgotModal(false);
                                setForgotError("");
                                setForgotSuccess("");
                                setForgotEmail("");
                            }}
                        >
                            &times;
                        </button>
                        <h3>Forgot Password</h3>
                        <p>Please enter your registered email to receive a reset link.</p>

                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={forgotEmail}
                            onChange={(e) => {
                                setForgotEmail(e.target.value);
                                setForgotError("");
                                setForgotSuccess("");
                            }}
                            className="forgot-input"
                        />

                        {forgotError && <p className="error-text">{forgotError}</p>}
                        {forgotSuccess && <p className="success-text">{forgotSuccess}</p>}

                        <div className="forgot-modal-actions">
                            <button
                                className="coach-forgot-btn coach-forgot-btn-secondary"
                                onClick={() => setShowForgotModal(false)}
                                disabled={forgotLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className="coach-forgot-btn coach-forgot-btn-danger"
                                onClick={handleForgotPassword}
                                disabled={forgotLoading}
                            >
                                {forgotLoading ? "Sending..." : "Send Link"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
