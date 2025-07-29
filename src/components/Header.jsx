'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from 'js-cookie';
import { HandleAuthLogout, HandleValidateToken } from '@/app/api/auth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header({ user }) {
    const router = useRouter();

    const handleLogout = () => {
        // HandleAuthLogout()
        Cookies.remove('token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };



    return (
        <nav className="navbar navbar-expand-lg coach-top-navber-add">
            <div className="container">
                <Link className="navbar-logo-add" href="/"><img src={`${FRONTEND_BASE_URL}/images/logo.png`} alt="Logo" /></Link>
                <button className="navbar-toggler tech" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav list-show">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/coach-detail/list">Explore Coaches <KeyboardArrowDownIcon className='mui-icons' /></Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/send-coaching-request">
                                Send Coaching Request
                                <KeyboardArrowDownIcon className='mui-icons' />
                            </Link>
                            {/* <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/">Match 1</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 2</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 3</Link></li>
                            </ul> */}
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                For Corporate <KeyboardArrowDownIcon className='mui-icons' />
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
                            {user ? (
                                // <button onClick={handleLogout} style={{
                                //     display: 'inline-block',
                                //     padding: '6px 16px',
                                //     backgroundColor: '#007bff',
                                //     color: 'white',
                                //     borderRadius: '4px',
                                //     textDecoration: 'none',
                                //     textAlign: 'center',
                                //     marginLeft: '10px',
                                //     border: 'white'
                                // }}>Logout</button>



                                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end logout-add-head">
                                    <ul className="navbar-nav navbar-nav-right">
                                        <li className="nav-item nav-profile dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                data-bs-toggle="dropdown"
                                                id="profileDropdown"
                                            >
                                                <img
                                                    src={user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                                                    alt="profile"
                                                    style={{ borderRadius: '100%', width: '40px', height: '40px' }} />
                                                <p className="top-name-add">{user?.first_name} <i className="bi bi-chevron-down"></i></p>
                                            </a>

                                            <div
                                                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                                                aria-labelledby="profileDropdown"
                                            >
                                                <a className="dropdown-item">
                                                    <i className="bi bi-gear mx-0"></i>&nbsp; Settings{" "}
                                                </a>
                                                {user?.user_type == 2 && <Link className="dropdown-item" href={'/user/profile'}>
                                                    <i className="bi bi-person-circle mx-0"></i>&nbsp; Profile{" "}
                                                </Link>}
                                                {user?.user_type == 3 && <Link className="dropdown-item" href={'/coach/dashboard'}>
                                                    <i className="bi bi-person-circle mx-0"></i>&nbsp; Dashboard{" "}
                                                </Link>}
                                                <a className="dropdown-item" onClick={handleLogout}>
                                                    <i className="bi bi-power text-primary"></i>&nbsp;Logout{" "}
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                    <button
                                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                                        type="button"
                                        data-bs-toggle="offcanvas"
                                    >
                                        <i className="bi bi-list fs-2"></i>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="Login-navbar">Login</Link>
                                    <Link
                                        href="/select-role"
                                        style={{
                                            display: 'inline-block',
                                            padding: '15px 30px',
                                            backgroundColor: '#009BFA',
                                            color: 'white',
                                            borderRadius: '10px',
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