"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/profile.css";


export default function Profile() {
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
                                    <i class="bi bi-gear"></i>
                                    <span className="menu-title">Account Settings</span>
                                </div>
                            </a>
                        </li>



                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                <div>
                                    <i class="bi bi-headset"></i>
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
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold quick-text-add my-changes">
                                            Hi {user?.first_name}, <br />
                                            Ready to level up?
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-form-add">
                            <div className="card">
                                <h3 className="text-your-name">Your Profile</h3>
                                <div className="upload-photo-add">
                                    <img src="/coachsparkle/assets/images/top-nav.png" alt="profile" />
                                    <div className="upload-btn">
                                        <a href="#"><i class="bi bi-upload"></i> Upload photo</a>

                                    </div>
                                </div>

                                <div className="profile-form">
                                    <form>
                                        <div class="form-row">
                                            <div class="form-group">
                                                <label for="firstName">First Name*</label>
                                                <input type="text" id="firstName" name="firstName" required />
                                            </div>

                                            <div class="form-group">
                                                <label for="lastName">Last Name</label>
                                                <input type="text" id="lastName" name="lastName" />
                                            </div>

                                            <div class="form-group">
                                                <label for="displayName">Display Name*</label>
                                                <input type="text" id="displayName" name="displayName" required />
                                            </div>

                                            <div class="form-group">
                                                <label for="profile">Professional Profile</label>
                                                <input type="text" id="profile" name="profile" />
                                            </div>

                                            <div class="form-group">
                                                <label for="email">Email*</label>
                                                <input type="email" id="email" name="email" required />
                                            </div>

                                            <div class="form-group">
                                                <label for="location">Location</label>
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


                                            <div class="form-group">
                                                <label for="topics">Preferred Coaching Topics</label>
                                                <textarea id="topics" name="topics" rows="3"></textarea>
                                            </div>

                                            <div class="form-group">
                                                <label for="ageGroup">Age Group (Learner’s Demographic)</label>
                                                <select id="ageGroup" name="ageGroup">
                                                    <option value="">Select</option>
                                                    <option value="children">Children</option>
                                                    <option value="teens">Teens</option>
                                                    <option value="adults">Adults</option>
                                                    <option value="seniors">Seniors</option>
                                                </select>
                                            </div>

                                            <div class="form-group">
                                                <label for="profession">Your Profession</label>
                                                <input type="text" id="profession" name="profession" />
                                            </div>


                                        </div>

                                        <p className="set-text-one">Set up to 3 coaching Goals</p>
                                        <p className="set-text">Briefly state your coaching goals (e.g., improve leadership presence, transition careers, manage stress better).
                                            This helps us match yu with the the most suitable coaches and allow you to track your own coaching progress. </p>

                                        <div class="form-group goal">
                                            <label for="goal1">Goal #1</label>
                                            <input type="text" name="goal1" />
                                        </div>

                                        <div class="form-group goal">
                                            <label for="goal1">Goal #2</label>
                                            <input type="text" name="goal2" />
                                        </div>


                                        <div class="form-group goal">
                                            <label for="goal1">Goal #3</label>
                                            <input type="text" name="goal3" />
                                        </div>



                                        <div class="form-row preference-input">
                                            <div class="form-group">
                                                <label for="language">Language Preference</label>
                                                <input type="text" id="language" name="language" placeholder="e.g., English, Hindi" />
                                            </div>

                                            <div class="form-group">
                                                <label for="mode">Preferred Mode</label>
                                                <select id="mode" name="mode">
                                                    <option value="">Select Mode</option>
                                                    <option value="online">Online</option>
                                                    <option value="in-person">In-Person</option>
                                                    <option value="hybrid">Hybrid</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <label for="timings">Preferred Coaching Timings</label>
                                            <select id="timings" name="timings">
                                                <option value="">Select Timing</option>
                                                <option value="morning">Morning (8 AM - 12 PM)</option>
                                                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                                <option value="evening">Evening (4 PM - 8 PM)</option>
                                                <option value="weekends">Weekends</option>
                                                <option value="flexible">Flexible</option>
                                            </select>
                                        </div>


                                        <div class="form-group full-width">
                                            <label for="bio">Short Bio (Optional)</label>
                                            <textarea id="bio" name="bio" rows="3" placeholder="Write a short bio..."></textarea>
                                        </div>

                                        <div class="form-group check-box">
                                            <input type="checkbox" id="coachAgreement" name="coachAgreement" />
                                            <label for="coachAgreement">I agree to let Coach Sparkle match me with relevant coaches</label>
                                        </div>


                                        <div className="save-btn">
                                            <button type="submit" className="save-btn-add">Save Changes <i class="bi bi-arrow-right"></i></button>
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
