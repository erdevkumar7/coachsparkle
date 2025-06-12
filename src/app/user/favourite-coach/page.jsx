"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/match.css";
import "../_styles/favourite.css";

export default function favourite() {
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
                        <div className="row favourite-coach-page">
                             <h3 className="tittle-text">Favourite coach</h3>
                             <div className="col-md-4 favourite-card">
                                 
                             <div className="card engagements-cards">
                                    <div className="card-body">
                                        <p className="favourite-text-tittle">Tracy McCoy</p>                                        
                                        <div className="respond-add">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <p>Senior Enginner at IBM</p>
                                        </div>
                                        
                                        <div className="two-btn-free">
                                        <button className="start-btn">Apply</button>
                                        <button className="message-btn">Remove</button>
                                        </div>
                                    </div>
                                    </div>

                             </div>
                             <div className="col-md-4 favourite-card">
                                 
                                 <div className="card engagements-cards">
                                 <div className="card-body">
                                        <p className="favourite-text-tittle">Gary Sims</p>                                        
                                        <div className="respond-add">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <p>Data Analyst at IBM</p>
                                        </div>
                                        
                                        <div className="two-btn-free">
                                        <button className="start-btn">Apply</button>
                                        <button className="message-btn">Remove</button>
                                        </div>
                                    </div>
                                        </div>
    
                                 </div>

                                 <div className="col-md-4 favourite-card">
                                 
                                 <div className="card engagements-cards">
                                 <div className="card-body">
                                        <p className="favourite-text-tittle">Joe Wilson</p>                                        
                                        <div className="respond-add">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <p>Web Developer at IBM</p>
                                        </div>
                                        
                                        <div className="two-btn-free">
                                        <button className="start-btn">Apply</button>
                                        <button className="message-btn">Remove</button>
                                        </div>
                                    </div>
                                        </div>
    
                                 </div>



                                 <div className="col-md-4 favourite-card">
                                 
                                 <div className="card engagements-cards">
                                 <div className="card-body">
                                        <p className="favourite-text-tittle">Trish Boucher</p>                                        
                                        <div className="respond-add">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <p>UI/UX at IBM</p>
                                        </div>
                                        
                                        <div className="two-btn-free">
                                        <button className="start-btn">Apply</button>
                                        <button className="message-btn">Remove</button>
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
