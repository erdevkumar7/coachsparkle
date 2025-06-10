'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FRONTEND_BASE_URL } from "@/config/url_config";

export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user')

        if (userData) {
            const user = JSON.parse(userData);            
            if (user.user_type === 2) {
                router.push('/user/dashboard');
            } else if (user.user_type === 3) {
                router.push('/coach/dashboard');
            } else {
                router.push('/');
            }
        }

        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        router.push('/login');
    };

    // console.log(router, 'isLoggedIn')
    return (
        <nav className="navbar navbar-expand-lg coach-top-navber-add">
            <div className="container">
                <Link className="navbar-logo-add" href="/"><img src={`${FRONTEND_BASE_URL}/images/logo.png`}  alt="Logo" /></Link>
                <button className="navbar-toggler tech" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav list-show">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/coach-detail/list">Browse Coaches</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Get Match
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/">Match 1</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 2</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 3</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                For Corporate
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/">Corporate 1</Link></li>
                                <li><Link className="dropdown-item" href="/">Corporate 2</Link></li>
                                <li><Link className="dropdown-item" href="/">Corporate 3</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/">Events</Link>
                        </li>
                    </ul>

                    <div className="register-login">
                        <div className="register-content">
                            {isLoggedIn ? (
                                <button onClick={handleLogout} style={{
                                    display: 'inline-block',
                                    padding: '6px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    marginLeft: '10px',
                                    border: 'white'
                                }}>Logout</button>
                            ) : (
                                <>
                                    <Link href="/login" className="Login-navbar">Login</Link>
                                    <Link
                                        href="/select-role"
                                        style={{
                                            display: 'inline-block',
                                            padding: '8px 16px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            borderRadius: '4px',
                                            textDecoration: 'none',
                                            textAlign: 'center',
                                            marginLeft: '10px'
                                        }}
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}