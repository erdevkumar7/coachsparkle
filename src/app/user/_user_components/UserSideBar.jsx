'use client';
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useRouter } from "next/navigation";

export default function UserSideBarComp({user}) {
    const router = useRouter();


    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">


            <div className="side-bar-left-top">
                <div className="flex items-center mt-4 side-top-bar">
                    <img
                        src={user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                        alt="profile" />
                    <div>
                        <h5 className="font-medium">
                            {user?.first_name} {user?.last_name}<span className="text-green-500 text-sm"><i className="bi bi-check-circle-fill"></i></span>
                        </h5>
                        <p className="text-sm text-gray-500">User</p>
                    </div>
                </div>
            </div>


            <ul className="nav">
                <li className="nav-item" onClick={() => router.push('/user/dashboard')}>
                    <a className="nav-link" href="#" data-bs-toggle="collapse" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-grid-3x3-gap-fill"></i>
                            <span className="menu-title">Dashboard</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item explore-tab">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-search"></i>
                            <span className="menu-title">Explore Coaches</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item" onClick={() => router.push('/user/coaching-activities')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-duffle"></i>
                            <span className="menu-title">Coaching Activities</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item" onClick={() => router.push('/user/favourite-coach')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-heart"></i>
                            <span className="menu-title">Favourite Coach</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item" onClick={() => router.push('/user/user-message')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-chat-dots"></i>
                            <span className="menu-title">Message</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-calendar2-week"></i>
                            <span className="menu-title">Booking</span>
                        </div>
                    </a>
                </li>



                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-star"></i>
                            <span className="menu-title">Reviews</span>
                        </div>
                    </a>
                </li>




                <li className="nav-item profile-tab" onClick={() => router.push('/user/profile')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-person"></i>
                            <span className="menu-title">Profile</span>
                        </div>
                    </a>
                </li>




                <li className="nav-item" onClick={() => router.push('/user/account-setting')}>
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-gear"></i>
                            <span className="menu-title">Account Settings</span>
                        </div>
                    </a>
                </li>



                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-headset"></i>
                            <span className="menu-title">FAQs and Support</span>
                        </div>
                    </a>
                </li>


                <li className="nav-item sign-out">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <div>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span className="menu-title">Sign Out</span>
                        </div>
                    </a>
                </li>

            </ul>
        </nav>
    );
};