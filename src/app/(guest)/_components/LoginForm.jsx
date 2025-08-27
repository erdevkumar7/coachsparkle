'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { HandleLogin, HandleValidateToken } from '@/app/api/auth';
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
    const router = useRouter();
    const [role, setRole] = useState(3);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    useEffect(() => {
        const role = searchParams.get("role");
        if (role) {
            sessionStorage.setItem("role", role);
        }
    }, [searchParams]);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const fetchUser = async () => {
                const tokenData = await HandleValidateToken(token);
                // console.log('tokenData', tokenData)

                if (!tokenData) {
                    Cookies.remove('token')
                }

                if (tokenData) {
                    if (tokenData.data.user_type == 2) {
                        router.push('/user/dashboard');
                    } else if (tokenData.data.user_type == 3) {
                        router.push('/coach/dashboard');
                    }
                }
            };

            fetchUser();
        }
        const storedRole = sessionStorage.getItem('role');
        if (storedRole) {
            const parsedRole = parseInt(storedRole, 10);
            setRole(parsedRole);

            // Optional: Clear role after setting it, if not needed again
            sessionStorage.removeItem('role');
        }
    }, []);


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
                // localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', JSON.stringify(result.data.user));
            }

            if (redirect) {
                router.push(redirect);
            } else if (result.data.user.user_type === 2) {
                toast.success("Login successful!");
                router.push('/user/dashboard');
            } else if (result.data.user.user_type === 3) {
                toast.success("Login successful!");
                router.push('/coach/dashboard');
            } else {
                router.push('/');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError(err.response.data.error || 'Invalid credentials');
            } else {
                setError('Something went wrong. Please try again.');
            }
        }

        setLoading(false);
    };

    const handleRoleSwitch = (newRole) => {
        setRole(newRole);
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

                                <div className="forgot">
                                    <a href="#">Forgot password?</a>
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

                                <button className="google-login" type="button">
                                    <img src="./images/google.png" alt="google" />
                                    Log in with Google
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
        </div>
    );
}
