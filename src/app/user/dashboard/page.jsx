"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



export default function UserDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        }

        const fetchUser = async () => {
            const tokenData = await HandleValidateToken(token);
            if (!tokenData) {
                Cookies.remove('token');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }

            setUser(tokenData.data)
        };

        fetchUser();
    }, []);

    return (
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

                <div className="max-w-5xl mx-auto px-4 py-8 at-glance-add">
                    <div className="flex items-center gap-3 mt-4 user-profile-change-image">
                        <img
                            src={user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                            // src={`${FRONTEND_BASE_URL}/assets/images/faces/face-img.png`}
                            alt="profile" />
                        <div>
                            <h5 className="font-medium">
                                {user?.first_name} {user?.last_name}{" "}
                                <span className="text-green-500 text-sm">
                                <CheckCircleIcon/>
                                </span>
                            </h5>
                            <p className="text-sm text-gray-500">User</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 at-glance-add">
                    <div className="bg-white p-5 rounded-xl shadow-md boder-line-add">
                        <h3 className="text-lg font-semibold mb-4">At a Glance</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 inner-card-add">
                            <div className="bg-gray-100 rounded-xl p-4 text-center">
                                <img src="/coachsparkle/assets/images/glance-img-one.png" className="mx-auto mb-2" />
                                <div className="new-add-comeing">
                                    <p className="font-medium">New Coach Matches</p>
                                    <p className="text-blue-600 font-bold">02</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl p-4 text-center">
                                <img src="/coachsparkle/assets/images/glance-img-two.png" className="mx-auto mb-2" />
                                <div className="new-add-comeing">
                                    <p className="font-medium">Coaching Request Status</p>
                                    <p className="text-blue-600 font-bold">02</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl p-4 text-center">
                                <img src="/coachsparkle/assets/images/glance-img-three.png" className="mx-auto mb-2" />
                                <div className="new-add-comeing">
                                    <p className="font-medium">Active Coaching</p>
                                    <p className="text-blue-600 font-bold">02</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl p-4 text-center">
                                <img src="/coachsparkle/assets/images/glance-img-four.png" className="mx-auto mb-2" />
                                <div className="new-add-comeing">
                                    <div className="new-add-comeing">
                                        <p className="font-medium">Upcoming Session</p>
                                        <p className="text-blue-600 font-bold">Aug 15, 8:00PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl p-4 text-center">
                                <img src="/coachsparkle/assets/images/glance-img-five.png" className="mx-auto mb-2" />
                                <div className="new-add-comeing">
                                    <p className="font-medium">Unread Messages</p>
                                    <p className="text-blue-600 font-bold">03</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            You haven’t responded to any coaches yet.
                            <a href="#" className="text-blue-600 font-medium hover:underline">
                                View Matches
                            </a>
                        </p>
                    </div>
                </div>

                <div className="goals-progress">
                    <div className="left-column">
                        <div className="card">
                            <div className="card-header">
                                <h3>Your Coaching Goals Progress</h3>
                                <button className="user-update-btn">Update Goal <i className="bi bi-arrow-right"></i></button>
                            </div>
                            <div className="goal">
                                <p className="build-text-add">Build Confidence For Public Speaking</p>
                                <div className="progress">
                                    <div style={{ width: "80%" }}><p>40%</p></div>
                                </div>
                                <button className="view-btn">View Session</button>
                            </div>
                            <div className="goal">
                                <p className="build-text-add">Learn Skating In 3 Months</p>
                                <div className="progress two">
                                    <div style={{ width: "70%" }}><p>0%</p></div>
                                </div>
                                <button className="view-btn">View Match</button>
                            </div>
                            <div className="goal">
                                <p className="build-text-add">Learn Python Coding</p>
                                <div className="progress three">
                                    <div style={{ width: "90%" }}><p>90%</p></div>
                                </div>
                                <button className="view-btn">View Session</button>
                            </div>
                        </div>


                        <div className="card matched-add">
                            <h3>AI Matched Recommendations</h3>
                            <div className="coach">

                                <div className="info">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div className="name-text">
                                        <p>Tracy McCoy</p>
                                        <span><i className="bi bi-star-fill"></i> 5.0</span>
                                    </div>
                                </div>
                                <button className="msg-btn">Message</button>
                            </div>
                            <div className="coach">

                                <div className="info">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div className="name-text">
                                        <p>Jim Saw</p>
                                        <span><i className="bi bi-star-fill"></i> 5.0</span>
                                    </div>
                                </div>
                                <button className="msg-btn">Book Trial</button>
                            </div>
                            <div className="coach">


                                <div className="info">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div className="name-text">
                                        <p>Jammy Vardy</p>
                                        <span><i className="bi bi-star-fill"></i> 5.0</span>
                                    </div>
                                </div>
                                <button className="msg-btn">Message</button>
                            </div>
                        </div>

                    </div>

                    <div className="right-column">
                        <div className="coaching-card">
                            <h3 className="title">Recent Coaching Activities</h3>
                            <div className="card">
                                <p className="section-title">Your Active Match</p>
                                <span className="status">Awaiting response</span>
                                <div className="coach-info">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div className="coach-details">
                                        <p className="coach-name">Sarah Lee</p>
                                        <p className="coach-role">
                                            Life And Confidence Coach At <strong>Comex Pte. Ltd.</strong>
                                        </p>
                                        <p className="coach-rating"><i className="bi bi-star-fill"></i><span>5.0</span></p>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="btn view">View Profile</button>
                                    <button className="btn message">Message</button>
                                </div>
                            </div>


                            <div className="card">
                                <p className="section-title">You’re working with Tracy</p>
                                <span className="status">Awaiting response</span>
                                <h5>professional title will goes here...</h5>

                                <div className="coach-info">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div className="coach-details">
                                        <p className="coach-name">Tracy McCoy</p>

                                        <p className="coach-rating"><i className="bi bi-star-fill"></i><span>5.0</span></p>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="btn view">View Profile</button>
                                    <button className="btn message">Message</button>
                                </div>
                            </div>




                            <div className="card">
                                <p className="section-title">Recently Matched Coach</p>
                                <span className="status">Awaiting response</span>
                                <h5>professional title will goes here...</h5>

                                <div className="coach-info">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div className="coach-details">
                                        <p className="coach-name">Tracy McCoy</p>

                                        <p className="coach-rating"><i className="bi bi-star-fill"></i><span>5.0</span></p>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="btn view">View Profile</button>
                                    <button className="btn message">Message</button>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>








                <div className="goal-setting-tips">
                    <div className="goal-left-column">
                        <div className="tips-card">
                            <h3 className="card-title">Goal Setting Tips</h3>
                            <ul className="tips-list">
                                <li><img src="/coachsparkle/assets/images/carbon_course.png" alt="Coach Image" className="coach-img" />
                                    5 - Minute Tips For Goal Setting</li>
                                <li><img src="/coachsparkle/assets/images/carbon_course.png" alt="Coach Image" className="coach-img" /> How To Reach Your Goals In Life</li>
                                <li><img src="/coachsparkle/assets/images/carbon_course.png" alt="Coach Image" className="coach-img" /> How To Reach Your Goals In Life</li>
                            </ul>
                            <a href="#" className="explore-link">Explore Coaches to learn Public Speaking, Skating and Python Coding</a>
                        </div>

                    </div>

                    <div className="goal-right-column">
                        <div className="coaching-card">

                            <div className="coach-card">
                                <h3 className="card-title">Your Favourite Coach</h3>
                                <div className="coach-list">
                                    <div className="coach-item">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <span className="coach-name">Tracy McCoy</span>
                                        <button className="btn-book">Book Now</button>
                                    </div>
                                    <div className="coach-item">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <span className="coach-name">Jim Saw</span>
                                        <button className="btn-book">Book Now</button>
                                    </div>
                                    <div className="coach-item">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <span className="coach-name">Jammy Vardy</span>
                                        <button className="btn-book">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>



                <div className="activity-log-card">
                    <h3 className="activity-title">Activity Log</h3>
                    <ul className="activity-list">
                        <li>- You Sent A Request To Coach Tracy McCoy <span className="activity-time">(3 days ago)</span></li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
