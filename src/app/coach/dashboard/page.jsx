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

                </div>
            </div>

            <CoachFooter />
        </>
    )
}