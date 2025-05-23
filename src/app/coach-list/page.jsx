'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FRONTEND_BASE_URL } from "@/config/url_config";


export default function CoachList() {

    //   useEffect(() => {
    //     (async () => {
    //         const jQuery = (await import('jquery')).default;
    //         window.$ = window.jQuery = jQuery;

    //         const maxPage = 10;
    //         const visiblePage = 2;

    //         const createPaginationLink = (currentPage, label, isEnable) => {
    //             const pageLink = jQuery(`<a class="page-link" href="javascript:void(0);">`).html(`<div class="text-center" style="width: 1.5rem">${label}</div>`);
    //             const pageItem = jQuery('<li class="page-item">').html(pageLink);
    //             if (!isEnable) pageItem.addClass('disabled');
    //             else {
    //                 pageLink.on('click', () => refreshPagination(currentPage));
    //             }
    //             return pageItem;
    //         };

    //         const createPagination = (currentPage) => {
    //             let startPage = currentPage - visiblePage;
    //             let endPage = currentPage + visiblePage;

    //             const pagination = jQuery('<ul class="pagination justify-content-center">');

    //             // First
    //             pagination.append(createPaginationLink(1, '<i class="fa-solid fa-angles-left"></i>', currentPage !== 1));
    //             // Previous
    //             pagination.append(createPaginationLink(currentPage - 1, '<i class="fa-solid fa-angle-left"></i>', startPage > 1));

    //             if (startPage < 1) {
    //                 endPage += -(startPage - 1);
    //                 startPage = 1;
    //             } else if (maxPage < endPage) {
    //                 startPage -= (endPage - maxPage);
    //                 if (startPage < 1) startPage = 1;
    //                 endPage = maxPage;
    //             }

    //             for (let i = startPage; i <= endPage && i <= maxPage; i++) {
    //                 const number = createPaginationLink(i, i, true);
    //                 if (i === currentPage) {
    //                     number.addClass('active');
    //                     number.css('pointer-events', 'none');
    //                 }
    //                 pagination.append(number);
    //             }

    //             // Next
    //             pagination.append(createPaginationLink(currentPage + 1, '<i class="fa-solid fa-angle-right"></i>', endPage < maxPage));
    //             // Last
    //             pagination.append(createPaginationLink(maxPage, '<i class="fa-solid fa-angles-right"></i>', currentPage !== maxPage));

    //             jQuery('#pagination').html(pagination);
    //         };

    //         const refreshPagination = (currentPage) => {
    //             jQuery("#pagination").empty();
    //             if (currentPage < 1) currentPage = 1;
    //             createPagination(currentPage);
    //         };

    //         jQuery(() => {
    //             refreshPagination(1);
    //         });
    //     })();
    // }, []);


    return (
        <>
            <Header />
            <div className="coach-banner-add">
                <div className="banner">
                    <div className="overlay"></div>
                    <div className="banner-text">
                        Browse over 1000+ <br />
                        Coaches.
                    </div>
                </div>

                <div className="container list-start">

                    <aside className="sidebar">
                        <input type="text" placeholder="Search for any skill, title or company" />
                        <p className="results">1000+ coaches found</p>

                        <div className="filter-section">
                            <h4>Prices</h4>
                            <div className="price-range-slider">
                                <div className="range-values">
                                    <span id="amount-left">$0</span>
                                    <span id="amount-right">$2000</span>
                                </div>
                                <div id="slider-range" className="range-bar"></div>
                            </div>

                            <p className="usd-text">All prices in USD</p>
                        </div>

                        <div className="filter-section">
                            <h4>Services</h4>
                            <div className="filter-services">
                                <label><input type="checkbox" /> Leadership</label>
                                <label><input type="checkbox" /> Product Management</label>
                                <label><input type="checkbox" /> Career Growth</label>
                                <label><input type="checkbox" /> Career</label>
                                <label><input type="checkbox" /> Product Strategy</label>
                                <label><input type="checkbox" /> Startup</label>
                                <label><input type="checkbox" /> Management</label>
                                <a href="#">Show more services</a>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Coach Type</h4>
                            <div className="filter-services">
                                <label><input type="checkbox" /> Career & Professional Coaches</label>
                                <label><input type="checkbox" /> Personal Development & Life Coaches</label>
                                <label><input type="checkbox" /> Wellness & Health Coaches</label>
                                <label><input type="checkbox" /> Family, Relationship & Youth Coaches</label>
                                <label><input type="checkbox" /> Academic & Learning Coaches </label>
                                <label><input type="checkbox" /> Specialized & Skill-Based Coaches </label>
                                <label><input type="checkbox" /> Niches (Emerging)</label>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Delivery Mode</h4>
                            <div className="filter-services">
                                <label><input type="checkbox" /> Online</label>
                                <label><input type="checkbox" /> In-Person</label>
                                <label><input type="checkbox" /> Hybrid</label>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Coaching Category</h4>

                            <div className="filter-services">
                                <label><input type="checkbox" /> Structured</label>
                                <label><input type="checkbox" /> Free-flow</label>
                                <label><input type="checkbox" /> Visual</label>
                                <label><input type="checkbox" /> Practical</label>
                                <label><input type="checkbox" /> Mindfulness-based</label>
                                <label><input type="checkbox" /> Conversational </label>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Languages</h4>
                            <div className="filter-services">
                                <label><input type="checkbox" /> French</label>
                                <label><input type="checkbox" /> English</label>
                                <label><input type="checkbox" /> Arabic</label>
                                <label><input type="checkbox" /> Spanish</label>
                                <label><input type="checkbox" /> Hindi</label>
                                <label><input type="checkbox" /> Italian</label>
                                <label><input type="checkbox" /> German</label>
                                <a href="#">Show more languages</a>
                            </div>
                        </div>

                        <div className="filter-section rating-add">
                            <h4>Rating</h4>

                            <div className="filter-services">
                                <label><input type="checkbox" /> <i className="bi bi-star"></i></label>
                                <label><input type="checkbox" /> <i className="bi bi-star"></i><i className="bi bi-star"></i></label>
                                <label><input type="checkbox" /> <i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></label>
                                <label><input type="checkbox" /> <i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></label>
                                <label>
                                    <input type="checkbox" /> <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                </label>
                            </div>
                        </div>
                    </aside>


                    <main className="main-content">
                        <div className="coach-card">
                            <img src={`${FRONTEND_BASE_URL}/images/coach-list-img-two.png`} alt="coach-img-two" />
                            <div className="coach-info">
                                <div className="senior-engineer-details-add">
                                    <div>
                                        <h2>Coach Name</h2>
                                        <p className="reviews-text"><i className="bi bi-star"></i><span>5.0</span> (21 reviews)</p>
                                        <p className="senior-engineer-text">
                                            <i className="bi bi-briefcase"></i><strong>Senior Engineer at <b>Company</b></strong>
                                        </p>
                                        <p className="description">
                                            Focus on your personal and professional growth with tailored development support. Whether you're building new skills, leading a complex project, or aiming for your next milestone, you'll get practical
                                            guidance designed to help you move forward with confidence.
                                        </p>
                                    </div>
                                    <div className="coach-actions">
                                        <p className="price">$120 / month</p>
                                        <button className="book">Inquiry Now <i className="bi bi-arrow-right"></i></button>
                                        <button className="profile">View Profile <i className="bi bi-arrow-right"></i></button>
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

                        <div className="coach-card">
                            <img src={`${FRONTEND_BASE_URL}/images/coach-list-img-one.png`} alt="coach-img-one" />
                            <div className="coach-info">
                                <div className="senior-engineer-details-add">
                                    <div>
                                        <h2>Coach Name</h2>
                                        <p className="reviews-text"><i className="bi bi-star"></i><span>5.0</span> (21 reviews)</p>
                                        <p className="senior-engineer-text">
                                            <i className="bi bi-briefcase"></i><strong>Senior Engineer at <b>Company</b></strong>
                                        </p>
                                        <p className="description">
                                            Focus on your personal and professional growth with tailored development support. Whether you're building new skills, leading a complex project, or aiming for your next milestone, you'll get practical
                                            guidance designed to help you move forward with confidence.
                                        </p>
                                    </div>
                                    <div className="coach-actions">
                                        <p className="price">$120 / month</p>
                                        <button className="book">Inquiry Now <i className="bi bi-arrow-right"></i></button>
                                        <button className="profile">View Profile <i className="bi bi-arrow-right"></i></button>
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

                        <div className="coach-card">
                            <img src={`${FRONTEND_BASE_URL}/images/coach-list-img-three.png`} alt="coach-img-three" />
                            <div className="coach-info">
                                <div className="senior-engineer-details-add">
                                    <div>
                                        <h2>Coach Name</h2>
                                        <p className="reviews-text"><i className="bi bi-star"></i><span>5.0</span> (21 reviews)</p>
                                        <p className="senior-engineer-text">
                                            <i className="bi bi-briefcase"></i><strong>Senior Engineer at <b>Company</b></strong>
                                        </p>
                                        <p className="description">
                                            Focus on your personal and professional growth with tailored development support. Whether you're building new skills, leading a complex project, or aiming for your next milestone, you'll get practical
                                            guidance designed to help you move forward with confidence.
                                        </p>
                                    </div>
                                    <div className="coach-actions">
                                        <p className="price">$120 / month</p>
                                        <button className="book">Inquiry Now <i className="bi bi-arrow-right"></i></button>
                                        <button className="profile">View Profile <i className="bi bi-arrow-right"></i></button>
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

                        <div className="coach-card">
                            <img src={`${FRONTEND_BASE_URL}/images/coach-list-img-two.png`} alt="coach-img-two" />
                            <div className="coach-info">
                                <div className="senior-engineer-details-add">
                                    <div>
                                        <h2>Coach Name</h2>
                                        <p className="reviews-text"><i className="bi bi-star"></i><span>5.0</span> (21 reviews)</p>
                                        <p className="senior-engineer-text">
                                            <i className="bi bi-briefcase"></i><strong>Senior Engineer at <b>Company</b></strong>
                                        </p>
                                        <p className="description">
                                            Focus on your personal and professional growth with tailored development support. Whether you're building new skills, leading a complex project, or aiming for your next milestone, you'll get practical
                                            guidance designed to help you move forward with confidence.
                                        </p>
                                    </div>
                                    <div className="coach-actions">
                                        <p className="price">$120 / month</p>
                                        <button className="book">Inquiry Now <i className="bi bi-arrow-right"></i></button>
                                        <button className="profile">View Profile <i className="bi bi-arrow-right"></i></button>
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

                        <div className="container-fluid pt-3 pagination-content-add">

                            <div className="row pagination-content-inner">
                                <div className="pagination">
                                    <button className="page-btn"><i className="bi bi-chevron-left"></i> Back</button>
                                    <button className="page-number">1</button>
                                    <button className="page-number active">2</button>
                                    <button className="page-number">3</button>
                                    <button className="page-number">4</button>
                                    <button className="page-number">5</button>
                                    <button className="page-btn">Next <i className="bi bi-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}