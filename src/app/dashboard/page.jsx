'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import UserHeader from '@/components/userdashboard/UserHeader';
// import UserMainContent from '@/components/userdashboard/UserMainContent';
// import UserFooter from '@/components/userdashboard/UserFooter';

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        router.push('/login');
    };

    return (
        <>
            {/* <div className="container-scroller">
                <UserHeader />
                <UserMainContent />
                <UserFooter />
            </div> */}
            <Header />
            <div className="coach-banner-add">
                <div className="coach-profile-list-add">
                    <div className="container">
                        <div className="row coach-profile-list-inner">
                            <div className="col-md-8 coach-profile-list-left">
                                <div className="coach-profile-content">
                                    <h2>
                                        Dashbord
                                    </h2>
                                    <p>Welcome, <strong>{user?.first_name} {user?.last_name}</strong>!! Your dashboard is Under-development</p>
                                    {/* <button onClick={handleLogout}>Logout</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}