"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/message.css";

export default function Usermessage() {
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
                        <div className="row">
                            <div className="user-message-add-page">
                                <h3 className="messages-tittle">Messages</h3>
                                <section>
                                    <div className="container chat-message-start">
                                        <div className="row">
                                            <div className="col-md-12 left-col-add">
                                                <div className="card" id="chat3">
                                                    <div className="card-body">
                                                        <div className="row both-chat-start">
                                                            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 left-side-message">
                                                                <div className="p-1">
                                                                    <div className="input-group rounded mb-3">
                                                                        <input type="search" className="form-control rounded" placeholder="Search or start a new chat" aria-label="Search" aria-describedby="search-addon" />
                                                                        {/* <span className="input-group-text border-0" id="search-addon">
                                                                            <i className="fas fa-search"></i>
                                                                        </span> */}
                                                                    </div>

                                                                    <div>
                                                                        {" "}
                                                                        <ul className="list-unstyled mb-0">
                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#!" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="/coachsparkle/assets/images/top-nav.png"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 1</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end">5</span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#!" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 2</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end">5</span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#!" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="/coachsparkle/assets/images/top-nav.png"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 3</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end">5</span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#!" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 4</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end">5</span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#!" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="/coachsparkle/assets/images/faces/face-img.png"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 5</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end"></span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="/coachsparkle/assets/images/top-nav.png"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 6</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end"></span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>

                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="/coachsparkle/assets/images/coach-profile-one.png"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 6</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end">3</span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>



                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#!" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="/coachsparkle/assets/images/coach-profile-two.png"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 6</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end"></span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>



                                                                            <li className="p-2 border-bottom">
                                                                                <a href="#!" className="d-flex justify-content-between">
                                                                                    <div className="d-flex flex-row">
                                                                                        <div>
                                                                                            <img
                                                                                                src="/coachsparkle/assets/images/coach-profile-three.png"
                                                                                                alt="avatar"
                                                                                                className="d-flex align-self-center me-3"
                                                                                                width="60"
                                                                                            />
                                                                                            <span className="badge bg-success badge-dot"></span>
                                                                                        </div>
                                                                                        <div className="pt-1">
                                                                                            <p className="fw-bold mb-0">Coach Name 6</p>
                                                                                            <p className="small text-muted">User Name: <span>Hi</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-1">
                                                                                        <p className="small text-muted mb-1 time-add">17:36</p>
                                                                                        <span className="badge rounded-pill float-end">8</span>
                                                                                    </div>
                                                                                </a>
                                                                            </li>




                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 col-lg-7 col-xl-8 right-side-message">
                                                                <div className="chat-show-right-side">
                                                                    <div className="start-chat-with-coach">
                                                                        <div className="start-chat-add">
                                                                            <img className="alert-icon" src="/coachsparkle/assets/images/alrt-icon.png" alt="avatar" width="60" />

                                                                            <div>
                                                                                <p><b>Start a Conversation with Coach</b></p>
                                                                                <p>Hi [Coach's Name], excited to connect! I’m looking for guidance on [specific area]. My biggest challenge is [briefly describe challenge]. How do you typically work with new clients, and which of your coaching packages might help?
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <a className="report-btn-add">Report</a>
                                                                    </div>

                                                                    <div className="user-name-text">
                                                                        <p className="first-text-tell">Robin Jacks</p>
                                                                        <span>3 days, 2 hour ago</span>
                                                                        <div className="hi-text-tell">
                                                                            <p>Hi. Can you tell me what you are looking for with the mentorship?</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="user-name-text">
                                                                        <p className="first-text-tell">Emma Rose</p>
                                                                        <span>35 minutes ago</span>
                                                                        <div className="hi-text-tell">
                                                                            <p className="hi-enter-text">Hi</p>
                                                                        </div>
                                                                    </div>


                                                                    <div className="text-send-message">
                                                                        <span className="plus-add-value">+</span>
                                                                        <i className="bi bi-emoji-smile"></i>
                                                                        <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2" placeholder="Type a message" />

                                                                    </div>

                                                                    <button className="send-message-button">Send Message <i class="bi bi-arrow-right"></i></button>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
