"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/profile.css";
import "../_styles/account.css";

export default function Accountsetting() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            router.push("/login");
        }

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" data-bs-toggle="collapse" aria-expanded="false" aria-controls="ui-basic">
                                <div>
                                    <i className="bi bi-grid-3x3-gap-fill"></i>
                                    <span className="menu-title">Overview</span>
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

                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                <div>
                                    <i className="bi bi-duffle"></i>
                                    <span className="menu-title">Coaching Activities</span>
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                <div>
                                    <i className="bi bi-heart"></i>
                                    <span className="menu-title">Favourite Coach</span>
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
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

                        <li className="nav-item profile-tab">
                            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                <div>
                                    <i className="bi bi-person"></i>
                                    <span className="menu-title">Profile</span>
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
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

                <div className="main-panel">
                    <div className="content-wrapper">

                        <div className="profile-form-add account-information">
                            <div className="card">
                                <h3 className="text-your-name">Account Information</h3>
                                <div className="upload-photo-add">
                                    <img src="/coachsparkle/assets/images/top-nav.png" alt="profile" />
                                    <div className="upload-btn">
                                        <a href="#">
                                            <i className="bi bi-upload"></i> Upload photo
                                        </a>
                                    </div>
                                </div>

                                <div className="profile-form account-information-form">
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="text" id="firstName" placeholder="Emma" name="firstName" required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="text" id="lastName" placeholder="Rose" name="lastName" />
                                            </div>

                                            <div className="row  account-info-add">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="email" id="email" placeholder="Enter your email" name="email" className="form-control" required />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="language">Language Setting</label>
                                                        <select id="language" name="language" className="form-control">
                                                            <option value="">Language Setting</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Phone Number</label>
                                                        <select id="phone" name="phone" className="form-control">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="location">Location</label>
                                                <select id="location" name="location">
                                                    <option value="">Select Location</option>
                                                    <option value="new-york">New York</option>
                                                    <option value="los-angeles">Los Angeles</option>
                                                    <option value="chicago">Chicago</option>
                                                    <option value="houston">Houston</option>
                                                    <option value="san-francisco">San Francisco</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="location">Zip Code</label>
                                                <input id="zip" name="zip" type="text" placeholder="Enter your zip code" pattern="[0-9]*" />
                                            </div>
                                        </div>

                                        <p className="set-text-one">Consent to Data Sharing and AI Matching </p>

                                        <div className="form-group check-box">
                                            <input type="checkbox" id="coachAgreement" name="coachAgreement" />
                                            <label htmlFor="coachAgreement">I agree to let Coach Sparkle match me with relevant coaches</label>
                                        </div>

                                        <button className="save-changes-btn">Save Changes</button>

                                        <div className="change-password-add">
                                            <h3 className="text-your-name">Change Password</h3>

                                            <div className="change-password-input-list">
                                                <div className="input-group mb-3">
                                                    <label htmlFor="currentPassword" className="form-label w-100">
                                                        Current Password
                                                    </label>
                                                    <input type="password" className="form-control" id="currentPassword" placeholder="Current Password" />
                                                    <span className="input-group-text">
                                                        <i className="fas fa-eye"></i>
                                                    </span>
                                                </div>

                                                <div className="input-group mb-3">
                                                    <label htmlFor="newPassword" className="form-label w-100">
                                                        New Password
                                                    </label>
                                                    <input type="password" className="form-control" id="newPassword" placeholder="New Password" />
                                                    <span className="input-group-text">
                                                        <i className="fas fa-eye"></i>
                                                    </span>
                                                </div>

                                                <div className="input-group mb-3">
                                                    <label htmlFor="confirmPassword" className="form-label w-100">
                                                        Confirm Password
                                                    </label>
                                                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                                                    <span className="input-group-text">
                                                        <i className="fas fa-eye"></i>
                                                    </span>
                                                </div>
                                            </div>

                                            <button class="save-changes-btn">Save Changes</button>
                                        </div>

                                        <div className="change-password-add">
                                            <h3 className="text-your-name">Notifications</h3>
                                            <div className="container notifications-add">
                                                <div className="row">
                                                    <div className="col-3 notifications-one">
                                                        <p>New Coach Match Alert</p>
                                                        <label className="switch">
                                                            <input type="checkbox" id="togBtn" />
                                                            <div className="slider round">
                                                                <span className="on">ON</span>
                                                                <span className="off">OFF</span>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="col-3 notifications-one">
                                                        <p>Message Notifications</p>
                                                        <label className="switch">
                                                            <input type="checkbox" id="togBtn" />
                                                            <div className="slider round">
                                                                <span className="on">ON</span>
                                                                <span className="off">OFF</span>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="col-3 notifications-one">
                                                        <p>Booking Reminders</p>
                                                        <label className="switch">
                                                            <input type="checkbox" id="togBtn" />
                                                            <div className="slider round">
                                                                <span className="on">ON</span>
                                                                <span className="off">OFF</span>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="col-3 notifications-one">
                                                        <p>Coaching Request Status</p>
                                                        <label className="switch">
                                                            <input type="checkbox" id="togBtn" />
                                                            <div className="slider round">
                                                                <span className="on">ON</span>
                                                                <span className="off">OFF</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-3 notifications-one">
                                                        <p>Platform Announcements</p>
                                                        <label className="switch">
                                                            <input type="checkbox" id="togBtn" />
                                                            <div className="slider round">
                                                                <span className="on">ON</span>
                                                                <span className="off">OFF</span>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="col-3 notifications-one">
                                                        <p>Blog / Article Recommendations</p>
                                                        <label className="switch">
                                                            <input type="checkbox" id="togBtn" />
                                                            <div className="slider round">
                                                                <span className="on">ON</span>
                                                                <span className="off">OFF</span>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="col-3 notifications-one">
                                                        <p>Billing Updates</p>
                                                        <label className="switch">
                                                            <input type="checkbox" id="togBtn" />
                                                            <div className="slider round">
                                                                <span className="on">ON</span>
                                                                <span className="off">OFF</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="change-password-add">
                                            <h3 className="text-your-name">Data & Privacy Control</h3>

                                            <div className="row privacy-control one">
                                                <div className="col-md-4">
                                                    <div class="form-group check-box">
                                                        <label htmlFor="coachAgreement">Profile Visibility</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="coachAgreement">Public</label>
                                                        <input type="checkbox" name="coachAgreement" />
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="coachAgreement">Private</label>
                                                        <input type="checkbox" name="coachAgreement" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row privacy-control two">
                                                <div className="col-md-4">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="coachAgreement">Communication Preference</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="Email">Email</label>
                                                        <input type="checkbox" name="coachAgreement" />
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="In-App">In-App</label>
                                                        <input type="checkbox" name="coachAgreement" />
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="Push">Push Toggles</label>
                                                        <input type="checkbox" name="coachAgreement" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row privacy-control three">
                                                <div className="col-md-6 left">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="coachAgreement">Allow AI Matching</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 right">
                                                    <div className="form-group check-box">
                                                        <label htmlFor="Email">I agree to AI Personalization</label>
                                                        <input type="checkbox" name="coachAgreement" />
                                                    </div>
                                                </div>
                                            </div>

                                            <a href="#" className="manage-text">
                                                Manage Cookie Preferences
                                            </a>

                                            <a href="#" className="manage-text-view">
                                                View Terms of Use & Privacy Policy
                                            </a>
                                        </div>

                                        <div className="delete-account-add">
                                            <h3 className="text-your-name">Delete Account</h3>
                                            <p>Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data, messages, and coaching history will be permanently removed.</p>

                                            <div className="form-group check-box">
                                                <input type="checkbox" id="coachAgreement" name="coachAgreement" />
                                                <label htmlFor="coachAgreement">I understand and wish to proceed with account deletion.</label>
                                            </div>

                                            <button className="delete-btn">
                                                <i class="bi bi-trash3"></i> Delete Account
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
