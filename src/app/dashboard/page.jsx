'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <>
            <div className="coach-banner-add">
                <div className="coach-profile-list-add">
                    <div className="container">
                        <div className="row coach-profile-list-inner">
                            <div className="col-md-8 coach-profile-list-left">
                                <div className="coach-profile-content">
                                    <h2>
                                        Dashbord
                                    </h2>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}