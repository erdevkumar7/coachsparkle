'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HandleLogin } from '@/app/api/auth';
import Cookies from 'js-cookie';
import "./_styles/login_form.css";

export default function Login() {
    const router = useRouter();
    const [role, setRole] = useState(3);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleRoleSwitch = (newRole) => {
        setRole(newRole);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            user_type: role, // Inject the role here
        };

        const result = await HandleLogin(dataToSend);
        if (result?.response?.status === 401) {
            setError(result.response.data.error || 'Invalid credentials');
        } else {
            // Handle success (store token, redirect, etc.)
            if (result.data.token) {
                Cookies.set('token', result.data.token, {
                    expires: 7, // Expires in 7 days
                    secure: true,
                    sameSite: 'Lax',
                });
            }

            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));

            if (result.data.user.user_type === 2) {
                router.push('/user/dashboard');
            } else if (result.data.user.user_type === 3) {
                router.push('/coach/dashboard');
            } else {
                router.push('/');
            }
        }
    };


    return (
        <>
            <div className="signup-page-add login-page-form">
                <div className="container-fluid">
                    <div className="row signup-page-top login-content-add">
                        {/* <div className="col-md-5 signup-left-side login-left-side">
                            <a className="navbar-logo-add" href="#"><img src={`${FRONTEND_BASE_URL}/images/signup-logo.png`} alt="Logo" /></a>
                        </div> */}
                        <div className="col-md-12 signup-right-side login-right-side">
                            <div className="login-container">
                                <h2>Log in</h2>


                                <div className="tabs">
                                    <button onClick={() => handleRoleSwitch(3)} className={`tab ${role === 3 ? "active" : ""}`}>I'm a Coach</button>
                                    <button onClick={() => handleRoleSwitch(2)} className={`tab ${role === 2 ? "active" : ""}`}>I'm a User</button>
                                </div>

                                <form className="login-form" onSubmit={handleSubmit}>
                                    <label>Email or Username</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                                    <div className="forgot">
                                        <a href="#">Forgot password?</a>
                                    </div>

                                    <button type="submit" className="login-btn">Log in <i className="bi bi-arrow-right"></i></button>

                                    <div className="divider"><span>Or</span></div>

                                    <button className="google-login">
                                        <img src="../images/google.png" alt="google" />
                                        Log in with Google
                                    </button>

                                    <p className="signup-text">
                                        Don’t have an account?
                                        <Link href="/register" onClick={() => sessionStorage.setItem('role', role)}>Sign up as a {role == 3 ? "Coach" : "User"}</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}