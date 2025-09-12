'use client';
import { FRONTEND_BASE_URL } from '@/utiles/config';
import '../_styles/coach_sidebar.css';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import AppsIcon from '@mui/icons-material/Apps';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import Link from 'next/link';



export default function CoachSideBarComp() {
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        // Check if we're on mobile (window width less than 992px)
        if (typeof window !== 'undefined' && window.innerWidth < 992) {
            const sidebar = document.getElementById("sidebar");
            if (sidebar) {
                sidebar.classList.toggle("collapsed");
            }
            setCollapsed(!collapsed);
        }
    };

    const handleSignout = () => {
        // HandleAuthLogout()
        Cookies.remove("token");
        localStorage.removeItem("user");
        router.push("/login");
        toast.success("Signout Successful!")
    };

    const menuItems = [
        { href: "/coach/dashboard", label: "Dashboard", icon: <AppsIcon />},
        { href: "/coach/profile", label: "Profile", icon: <PersonOutlineIcon />, className: "mt-5" },
        { href: "/coach/service-packages", label: "Service Packages", icon: <ViewInArIcon /> },
        { href: "/coach/coaching-activities", label: "Coaching Activities", icon: <WorkOutlineIcon /> },
        { href: "/coach/booking", label: "Booking", icon: <CalendarMonthIcon /> },
        { href: "/coach/messages/1", label: "Message + Coaching Requests", icon: <TextsmsOutlinedIcon /> },
        { href: "/coach/review", label: "Reviews", icon: <StarBorderPurple500OutlinedIcon /> },
        { href: "/coach/account-settings", label: "Account Settings", icon: <SettingsOutlinedIcon />, className: "mt-5" },
        { href: "/coach/subscription-plan", label: "Subscription Plan", icon: <FavoriteBorderOutlinedIcon /> },
        { href: "/coach/faq", label: "FAQs and Support", icon: <HeadsetMicOutlinedIcon /> },
    ];

    const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

    return (
        <nav className="sidebar sidebar-offcanvas add-sdbar" id="sidebar">

            <div className="side-bar-left-top">
                <div className="flex items-center mt-4 side-top-bar">
                    <img alt="profile" src={user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} />
                    <div>
                        {user?.subscription_plan?.plan_name == 'Pro' ? (
                            <p className="pro-add-value">Pro</p>
                        ) : (
                            <p className="basic-add-value">Basic</p>
                        )}
                        <h5 className="font-medium text-with-check-icons">
                            {user?.first_name} {user?.last_name} <span className="text-green-500 text-sm"><CheckCircleIcon /></span>
                        </h5>
                        <p className="text-sm text-gray-500">Coach</p>
                    </div>
                </div>
            </div>


            <ul className="nav">
                {menuItems.map((item, idx) => (
                    <li
                        key={idx}
                        className={`nav-item ${isActive(item.href) ? "active user-nav-active" : ""} ${item.className ? item.className : ""}`}
                    >
                        <Link href={item.href} className="nav-link" onClick={toggleSidebar}>
                            <div>
                                {item.icon}
                                <span className="menu-title">{item.label}</span>
                            </div>
                        </Link>
                    </li>
                ))}


                <li className="nav-item sign-out" onClick={handleSignout}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div
                        >
                            <LogoutOutlinedIcon />
                            <span className="menu-title">Sign Out</span>
                        </div>
                    </a>
                </li>

            </ul>
        </nav>
    )
}