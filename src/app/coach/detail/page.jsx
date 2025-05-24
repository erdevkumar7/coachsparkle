'use client';

import { useEffect, useState } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FRONTEND_BASE_URL, BACK_END_BASE_URL } from "@/config/url_config";
import axios from 'axios';


export default function CoachDetail() {




    return (
        <>
            <Header />
            <div className="coach-banner-add">
                <div className="coach-profile-list-add">
                    <div className="container">
                        <div className="row coach-profile-list-inner">
                            <div className="col-md-8 coach-profile-list-left">
                                <div className="coach-profile-content">
                                    <div className="coach-card">
                                        <img src={`${FRONTEND_BASE_URL}/images/coach-list-img-two.png`} alt="Coach Image" />
                                       
                                        <div className="coach-info">
                                            <div className="senior-engineer-details-add">
                                                <div>
                                                    <h2>
                                                        Coach Name <span className="verified-text"> <i className="bi bi-check"></i>Verified</span>
                                                    </h2>
                                                    <p className="senior-engineer-text">
                                                        <strong>Senior Engineer at <b>Company</b></strong>
                                                    </p>
                                                    <p className="senior-engineer-text">
                                                        <strong>12+ Years in <b>Personal Development & Life Coaches</b></strong>
                                                    </p>

                                                    <div className="profile-card">
                                                        <span className="badge">Motivational Coach</span>

                                                        <div className="info-item">
                                                            <i className="bi bi-geo-alt"></i>
                                                            <span>Canada</span>
                                                        </div>

                                                        <div className="info-item">
                                                            <i className="bi bi-translate"></i>
                                                            <span>Speaks English, Portuguese and Spanish</span>
                                                        </div>

                                                        <div className="info-item">
                                                            <i className="bi bi-star"></i>
                                                            <span><b>5.0</b> (21 reviews)</span>
                                                        </div>

                                                        <div className="info-item">
                                                            <i className="bi bi-globe"></i>
                                                            <span>Hybrid</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="coach-action-profile-icon">
                                                    <i className="bi bi-heart"></i>
                                                </div>
                                            </div>
                                            <div className="tags">
                                                <span>Software</span>
                                                <span>Software</span>
                                                <span>Software</span>
                                                <span>Software</span>
                                                <span>Software</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="about-section">
                                        <h4>About</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                            qui officia deserunt mollit anim id est laborum.
                                        </p>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                                            sunt explicabo.
                                        </p>
                                    </div>

                                    <h5 className="what-user-text">What User's Say</h5>
                                    <div className="review-section">
                                        <div className="review-card">
                                            <div className="review-adding">
                                                <img src={`${FRONTEND_BASE_URL}/images/profile-say-one.png`} alt="Coach Image" />
                                                <div className="review-header">
                                                    <div className="rating-star-adding">

                                                        {/* <img src="./imges/star-add-icons.png"> */}
                                                        <p>
                                                            <strong className="profile-name">Selena McCoy</strong><br />
                                                            <small className="month-date-add">15 October 2024</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <strong>Good Tour, Really Well Organised</strong>
                                                <p className="review-text">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="review-card">
                                            <div className="review-adding">
                                                <img src={`${FRONTEND_BASE_URL}/images/profile-say-two.png`} alt="Coach Image" />
                                                <div className="review-header">
                                                    <div className="rating-star-adding">

                                                        {/* <img src="./imges/star-add-icons.png"> */}
                                                        <p>
                                                            <strong className="profile-name">Selena McCoy</strong><br />
                                                            <small className="month-date-add">15 October 2024</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <strong>Good Tour, Really Well Organised</strong>
                                                <p className="review-text">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="review-card">
                                            <div className="review-adding">
                                                <img src={`${FRONTEND_BASE_URL}/images/profile-say-three.png`} alt="Coach Image" />
                                                <div className="review-header">
                                                    <div className="rating-star-adding">

                                                        {/* <img src="./imges/star-add-icons.png"> */}
                                                        <p>
                                                            <strong className="profile-name">Selena McCoy</strong><br />
                                                            <small className="month-date-add">15 October 2024</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <strong>Good Tour, Really Well Organised</strong>
                                                <p className="review-text">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="services-offered">
                                        <h5 className="what-user-text">Services Offered</h5>
                                        <div className="tags">
                                            <span>Software</span>
                                            <span>React</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                            <span>Software</span>
                                        </div>
                                    </div>

                                    <div className="related-coaches">
                                        <h5 className="what-user-text">Related Coaches</h5>

                                        <div className="container">
                                            <div className="row related-coaches-inner">
                                                <div className="col-md-12">
                                                    <div id="news-slider" className="owl-carousel">
                                                        <div className="col-12 col-sm-6 col-md-4 coaches-view-cards">
                                                            <div className="card h-100">
                                                                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
                                                                <div className="card-body">
                                                                    <h5 className="card-title"><a href="#">Coach Name</a></h5>
                                                                    <p className="card-text">Staff Software Engineer at eBay</p>
                                                                    <div className="software-engineer-list">
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-4 coaches-view-cards">
                                                            <div className="card h-100">
                                                                <img src="./imges/related-img-one.png" className="card-img-top" alt="Coach Image" />
                                                                <div className="card-body">
                                                                    <h5 className="card-title"><a href="#">Coach Name</a></h5>
                                                                    <p className="card-text">Staff Software Engineer at eBay</p>
                                                                    <div className="software-engineer-list">
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-4 coaches-view-cards">
                                                            <div className="card h-100">
                                                                <img src={`${FRONTEND_BASE_URL}/images/related-img-two.png`} className="card-img-top" alt="Coach Image" />
                                                                <div className="card-body">
                                                                    <h5 className="card-title"><a href="#">Coach Name</a></h5>
                                                                    <p className="card-text">Staff Software Engineer at eBay</p>
                                                                    <div className="software-engineer-list">
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-4 coaches-view-cards">
                                                            <div className="card h-100">
                                                                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
                                                                <div className="card-body">
                                                                    <h5 className="card-title"><a href="#">Coach Name</a></h5>
                                                                    <p className="card-text">Staff Software Engineer at eBay</p>
                                                                    <div className="software-engineer-list">
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-4 coaches-view-cards">
                                                            <div className="card h-100">
                                                                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
                                                                <div className="card-body">
                                                                    <h5 className="card-title"><a href="#">Coach Name</a></h5>
                                                                    <p className="card-text">Staff Software Engineer at eBay</p>
                                                                    <div className="software-engineer-list">
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-sm-6 col-md-4 coaches-view-cards">
                                                            <div className="card h-100">
                                                                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
                                                                <div className="card-body">
                                                                    <h5 className="card-title"><a href="#">Coach Name</a></h5>
                                                                    <p className="card-text">Staff Software Engineer at eBay</p>
                                                                    <div className="software-engineer-list">
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
                                                                        <a href="#">Software</a>
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

                            <div className="col-md-4 coach-profile-list-right">
                                <div className="profile-card">
                                    <img src={`${FRONTEND_BASE_URL}/images/profile-video.png`} alt="Team Image" className="top-image" />

                                    <div className="profile-message">
                                        <div className="price">$120 <span>/ month</span></div>

                                        <button className="btn-primary"><i className="bi bi-chat-dots"></i>Send Message</button>
                                        <button className="btn-secondary"><i className="bi bi-envelope"></i>Message Via Email</button>
                                        <button className="btn-secondary"><i className="bi bi-telephone"></i>(808) 567-8901</button>

                                        <div className="trial-offer">
                                            <span> <i className="bi bi-patch-check"></i>Willing to offer free trial session</span>
                                            <div className="yes-no-add">
                                                <label><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /> Yes</label>
                                                <label><input className="form-check-input" type="checkbox" value="" id="no" /> No</label>
                                            </div>
                                        </div>

                                        <div className="social-links">
                                            <h5>Contact Now</h5>
                                            <div className="contact-now-add">
                                                <a href="#"><img src={`${FRONTEND_BASE_URL}/images/contact-icons-one.png`} alt="WhatsApp" /></a>
                                                <a href="#"><img src={`${FRONTEND_BASE_URL}/images/contact-icons-two.png`} alt="Facebook" /></a>
                                                <a href="#"><img src={`${FRONTEND_BASE_URL}/images/contact-icons-three.png`} alt="LinkedIn" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="calendar shadow-sm calendar-profile-show">
                                    <div className="d-flex prve-next-btn mb-3">
                                        <h4 id="monthYear" className="mb-0"></h4>
                                        <div className="next-prev-part">
                                            <button id="prev" className="btn btn-primary btn-sm"><i className="bi bi-chevron-left"></i></button>
                                            <button id="next" className="btn btn-primary btn-sm"><i className="bi bi-chevron-right"></i></button>
                                        </div>
                                    </div>

                                    <div className="day-names border-bottom pb-2 mb-2">
                                        <div>Sun</div>
                                        <div>Mon</div>
                                        <div>Tue</div>
                                        <div>Wed</div>
                                        <div>Thu</div>
                                        <div>Fri</div>
                                        <div>Sat</div>
                                    </div>

                                    <div className="days" id="calendarDays"></div>
                                    <div className="calendar-legend">
                                        <span><span className="dot available-dot"></span> Available</span>
                                        <span><span className="dot unavailable-dot"></span> Unavailable</span>
                                    </div>
                                </div>







                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}