"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/match.css";


export default function Matchcoach() {
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
                        <div className="row match-card-add">
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        <img src="/coachsparkle/assets/images/match-one.png" alt="match-one" />
                                        <div className="content-part">
                                            <p>Pending <span>2</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        <img src="/coachsparkle/assets/images/match-two.png" alt="match-one" />
                                        <div className="content-part">
                                            <p>Active <span>2</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        <img src="/coachsparkle/assets/images/match-three.png" alt="match-one" />
                                        <div className="content-part">
                                            <p>Completed <span>1</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        <img src="/coachsparkle/assets/images/match-four.png" alt="match-one" />
                                        <div className="content-part">
                                            <p>Canceled <span>1</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>


                        <div className="pending-engagements">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Pending engagements
                                            <span className="accordion-arrow"></span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body cards-engagement">
                                            <div className="card engagements-cards">
                                                <div className="card-body">
                                                    <p>Gary Sims - waiting for coach reply</p>
                                                    <a href="#" className="Responded-btn">Responded</a>
                                                    <div className="respond-add">
                                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                                        <p>Gary Sims</p>
                                                    </div>
                                                    <div className="two-btn-free">
                                                        <button className="start-btn">Start Free Trial</button>
                                                        <button className="message-btn">Message</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card engagements-cards">
                                                <div className="card-body">
                                                    <p>Jane Lee - Coach Accepted, Schedule Trial</p>
                                                    <a href="#" className="accepted-btn">Accepted</a>
                                                    <div className="respond-add">
                                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                                        <p>Jane Lee</p>
                                                    </div>
                                                    <div className="two-btn-free">
                                                        <button className="start-btn">Start Free Trial</button>
                                                        <button className="message-btn">Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Active Engagements (Session booked or started)
                                        <span className="accordion-arrow"></span>
                                    </button>
                                    
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        <div className="accordion-body cards-engagement">
                                            <div className="card engagements-cards">
                                                <div className="card-body">
                                                    <p>Adam Bell - Session Booked</p>
                                                    <a href="#" className="active-btn">Active</a>
                                                    <div className="respond-add">
                                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                                        <p>Adam Bell</p>
                                                    </div>
                                                    <div className="two-btn-free">
                                                        <button className="start-btn">View Session</button>
                                                        <button className="message-btn">Message</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card engagements-cards">
                                                <div className="card-body">
                                                    <p>Tony Buck - In Progress</p>
                                                    <a href="#" className="progress-btn">In Progress</a>
                                                    <div className="respond-add">
                                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                                        <p>Jane Lee</p>
                                                    </div>
                                                    <div className="two-btn-free">
                                                        <button className="start-btn">Manage Session</button>
                                                        <button className="message-btn">Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Completed Coaching
                                        <span className="accordion-arrow"></span>
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        <div className="accordion-body cards-engagement">
                                            <div className="card engagements-cards">
                                                <div className="card-body">
                                                    <p>Adam Bell - Leave a Review</p>
                                                    <a href="#" className="completed-btn">Completed</a>
                                                    <div className="respond-add">
                                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                                        <p>Adam Bell</p>
                                                    </div>
                                                    <div className="two-btn-free">
                                                        <button className="start-btn">Leave a Review</button>
                                                        <button className="message-btn">Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Canceled / No Show
                                        <span className="accordion-arrow"></span>
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        <div className="accordion-body cards-engagement">
                                            <div className="card engagements-cards">
                                                <div className="card-body">
                                                    <p>Adam Bell - Rebook Session</p>
                                                    <a href="#" className="canceled-btn">Canceled</a>
                                                    <div className="respond-add">
                                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                                        <p>Adam Bell</p>
                                                    </div>
                                                    <div className="two-btn-free">
                                                        <button className="start-btn">Rebook Session</button>
                                                        <button className="message-btn">Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>




















                    </div>
                </div>
            </div>
            
        </>
        
    );
    
}
