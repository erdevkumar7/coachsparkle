'use client';
import { FRONTEND_BASE_URL } from '@/utiles/config';
import '../_styles/coach_sidebar.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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



export default function CoachSideBarComp() {
    const { user } = useUser();
    const router = useRouter();

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
                            {user?.first_name} {user?.last_name} <span className="text-green-500 text-sm"><CheckCircleIcon/></span>
                        </h5>
                        <p className="text-sm text-gray-500">Coach</p>
                    </div>
                </div>
            </div>


            <ul className="nav">
                <li className="nav-item" onClick={() => router.push('/coach/dashboard')}>
                    <a className="nav-link" href="#" data-bs-toggle="collapse" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                          <AppsIcon/>
                            <span className="menu-title">Dashboard</span>
                        </div>
                    </a>
                </li>


                <li className="nav-item profile-tab" onClick={() => router.push('/coach/profile')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <PersonOutlineIcon/>
                            <span className="menu-title">Profile</span>
                        </div>
                    </a>
                </li>


                <li className="nav-item" onClick={() => router.push('/coach/service-packages')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                           <ViewInArIcon/>
                            <span className="menu-title">Service Packages</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item" onClick={() => router.push('/coach/coaching-activities')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                          <WorkOutlineIcon/>
                            <span className="menu-title">Coaching Activities</span>
                        </div>
                    </a>
                </li>


                <li className="nav-item" onClick={() => router.push('/coach/booking')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <CalendarMonthIcon/>
                            <span className="menu-title">Booking</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item" onClick={() => router.push('/coach/messages')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                              <TextsmsOutlinedIcon/>
                            <span className="menu-title message-text">
                                Message + Coaching <br /> Requests
                            </span>

                        </div>
                    </a>
                </li>



                <li className="nav-item" onClick={() => router.push('/coach/review')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                             <StarBorderPurple500OutlinedIcon/>
                            <span className="menu-title">Reviews</span>
                        </div>
                    </a>
                </li>



                <li className="nav-item account-settings-tab" onClick={() => router.push('/coach/account-settings')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <SettingsOutlinedIcon/>
                            <span className="menu-title">Account Settings</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item" onClick={() => router.push('/coach/subscription-plan')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <FavoriteBorderOutlinedIcon/>
                            <span className="menu-title">Subscription Plan</span>
                        </div>
                    </a>
                </li>



                <li className="nav-item" onClick={() => router.push('/coach/faq')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <HeadsetMicOutlinedIcon/>
                            <span className="menu-title">FAQs and Support</span>
                        </div>
                    </a>
                </li>


                <li className="nav-item sign-out">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div
                        >
                             <LogoutOutlinedIcon/>
                            <span className="menu-title">Sign Out</span>
                        </div>
                    </a>
                </li>

            </ul>
        </nav>
    )
}