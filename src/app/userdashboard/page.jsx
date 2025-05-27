'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserHeader from '@/components/userdashboard/UserHeader';
import UserMainContent from '@/components/userdashboard/UserMainContent';

export default function Dashboard() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
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


console.log(user);
    return (
        <>
        <UserHeader user={user}/>
        <UserMainContent user={user}/>
        </>
    )
}