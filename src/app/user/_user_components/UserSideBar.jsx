'use client';
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AppsIcon from '@mui/icons-material/Apps';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from "react-toastify";
import { useState } from "react";




export default function UserSideBarComp({ user }) {
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

    const isActive = (href) =>
        pathname === href || pathname.startsWith(href + "/");

    return (
        <nav className="sidebar sidebar-offcanvas add-sdbar" id="sidebar">

            <div className="side-bar-left-top">
                <div className="flex items-center mt-4 side-top-bar">
                    <img
                        src={user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                        alt="profile" />
                    <div>
                        <h5 className="font-medium text-with-check-icons">
                            {user?.first_name} {user?.last_name}<span className="text-green-500 text-sm"><CheckCircleIcon /></span>
                        </h5>
                        <p className="text-sm text-gray-500">User</p>
                    </div>
                </div>
            </div>


            <ul className="nav">
                <li className={`nav-item ${isActive("/user/dashboard") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/dashboard'); toggleSidebar()}}>
                    <a className="nav-link" href="#" data-bs-toggle="collapse" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <AppsIcon />
                            <span className="menu-title">Dashboard</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item explore-tab" onClick={() => {router.push('/coach-detail/list'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <SearchOutlinedIcon />
                            <span className="menu-title">Explore Coaches</span>
                        </div>
                    </a>
                </li>

                <li className={`nav-item ${isActive("/user/coaching-activities") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/coaching-activities'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <WorkOutlineIcon />
                            <span className="menu-title">Coaching Activities</span>
                        </div>
                    </a>
                </li>

                <li className={`nav-item ${isActive("/user/favourite-coach") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/favourite-coach'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <FavoriteBorderOutlinedIcon />

                            <span className="menu-title">Favourite Coach</span>
                        </div>
                    </a>
                </li>

                <li className={`nav-item ${isActive("/user/user-message") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/user-message/1'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <TextsmsOutlinedIcon />
                            <span className="menu-title">Message</span>
                        </div>
                    </a>
                </li>

                <li className={`nav-item ${isActive("/user/booking") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/booking'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <CalendarMonthIcon />
                            <span className="menu-title">Booking</span>
                        </div>
                    </a>
                </li>



                <li className={`nav-item ${isActive("/user/review") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/review'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <StarBorderPurple500OutlinedIcon />
                            <span className="menu-title">Reviews</span>
                        </div>
                    </a>
                </li>




                <li className="nav-item profile-tab" onClick={() => {router.push('/user/profile'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <PersonOutlineIcon />
                            <span className="menu-title">Profile</span>
                        </div>
                    </a>
                </li>




                <li className={`nav-item ${isActive("/user/account-setting") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/account-setting'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <SettingsOutlinedIcon />
                            <span className="menu-title">Account Settings</span>
                        </div>
                    </a>
                </li>



                <li className={`nav-item ${isActive("/user/support") ? "active user-nav-active" : ""}`} onClick={() => {router.push('/user/support'); toggleSidebar()}}>
                    <a className="nav-link" >
                        <div>
                            <HeadsetMicOutlinedIcon />
                            <span className="menu-title">FAQs and Support</span>
                        </div>
                    </a>
                </li>


                <li className="nav-item sign-out" onClick={handleSignout}>
                    <a className="nav-link" >
                        <div>
                            <LogoutOutlinedIcon />
                            <span className="menu-title">Sign Out</span>
                        </div>
                    </a>
                </li>

            </ul>
        </nav>
    );
};