"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/match.css";
import { HandleValidateToken } from "@/app/api/auth";
import Cookies from "js-cookie";

export default function Matchcoach() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
            return;
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
    );

}
