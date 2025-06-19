'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CoachHeader from '@/app/coach/_coach_components/CoachHeader';
import CoachFooter from '@/app/coach/_coach_components/CoachFooter';
import Cookies from 'js-cookie';
import CoachSideBarComp from '../_coach_components/coachSideBar';

export default function Dashboard() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        const userData = localStorage.getItem('user');

        if (!token) {
            router.push('/login');
        }

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     setIsLoggedIn(false);
    //     setUser(null);
    //     router.push('/login');
    // };
    console.log(user);
    return (
        <>
            <CoachHeader user={user} />
            <div className="container-fluid page-body-wrapper">
                <CoachSideBarComp />

                <div className="main-panel">
                    <div className='content-wrapper'>

                        <div className="container coach-dashboard-add">

                            <div className="header">
                                <h1>Welcome back, Coach James! Ready to empower someone today?</h1>
                            </div>


                            <div className="profile-box">
                                <div className="profile-info">
                                <img alt="profile" src="/coachsparkle/assets/images/faces/face-img.png" />
                                    <div className='coach-profile-view'>
                                        <div>
                                        <p className='pro-add-value'>Pro</p>
                                        <div><strong>James Vince</strong></div>
                                        <p className='coach-name-text'>Coach</p>
                                        </div>
                                        <div className="status">
                                            <select>
                                                <option>Online</option>
                                                <option>Offline</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="progress-bar">
                                    <div>Profile 80% Complete</div>
                                    <div className="progress-line">
                                        <div className="progress-fill"></div>
                                    </div>
                                    <div className="links">
                                        <a href="#">Update Profile</a>
                                        <a href="#">Add Services</a>
                                    </div>
                                </div>
                            </div>


                            <div className="snapshot">
                                <h2>Quick Snapshot</h2>
                                <div className="grid">
                                    <div className="card">
                                        <strong>03</strong>
                                        New Coaching Request
                                    </div>
                                    <div className="card">
                                        <strong>02</strong>
                                        Confirmed Booking
                                    </div>
                                    <div className="card">
                                        <strong>Aug 15, 8:00PM</strong>
                                        Upcoming Sessions (05)
                                    </div>
                                    <div className="card">
                                        <strong>54.6%</strong>
                                        Service Performance
                                    </div>
                                    <div className="card">
                                        <strong>$3,560</strong>
                                        Total Earnings
                                    </div>
                                    <div className="card">
                                        <strong>06</strong>
                                        Unread Messages
                                    </div>
                                    <div className="card">
                                        <strong>15</strong>
                                        Profile Views <small>Increased by 22%</small>
                                    </div>
                                    <div className="card">
                                        <strong>4.0</strong>
                                        Average Rating
                                    </div>
                                    <div className="card">
                                        <strong>10</strong>
                                        No. of Favorite
                                    </div>
                                </div>

                                <div className="cta">
                                    <button>Get Featured →</button>
                                </div>
                            </div>
                        </div>


                        <div className="badge sr1">S</div>
                        <div className="badge sr2">R</div>


                    </div>


                </div>


            </div>

            <CoachFooter />
        </>
    )
}