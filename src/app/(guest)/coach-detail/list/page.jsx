'use client';

import { useEffect, useState } from 'react';
import { FRONTEND_BASE_URL } from "@/config/url_config";
import axios from 'axios';
import Link from 'next/link';
import "../../_styles/coach-list.css"


export default function CoachList() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [coaches, setCoaches] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        getAllCoaches(currentPage);
    }, [currentPage]);

    const getAllCoaches = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                url: `${apiUrl}/coachlist?page=${page}`,
            });

            setCoaches(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching coaches:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        // console.log(page, 'pageee')
        if (page !== pagination.current_page && page >= 1 && page <= pagination.last_page) {
            setCurrentPage(page);
        }
    };



    // console.log(currentPage, 'coachescoaches')
    return (
        <>
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


                    {loading ? (
                        <main className="main-content">
                            <p>Loading...</p>
                        </main>) : coaches.length > 0 ? (

                            <main className="main-content">
                                {coaches.map((coach, index) => (
                                    <div className="coach-card" key={index}>
                                        <img
                                            src={
                                                coach.profile_image
                                                    ? coach.profile_image
                                                    : `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                                            }
                                            alt="coach"
                                        />
                                        <div className="coach-info">
                                            <div className="senior-engineer-details-add">
                                                <div>
                                                    <h2>{coach.first_name} {coach.last_name}</h2>
                                                    <p className="reviews-text"><i className="bi bi-star"></i><span>5.0</span> (21 reviews)</p>
                                                    <p className="senior-engineer-text">
                                                        <i className="bi bi-briefcase"></i><strong>{coach.coach_type || 'free coaching'} </strong>
                                                    </p>
                                                    <p className="description">
                                                        {coach.short_bio || "Focus on your personal and professional growth with tailored development support. Whether you're building new skills, leading a complex project, or aiming for your next milestone, you'll get practical guidance designed to help you move forward with confidence."}
                                                    </p>
                                                </div>
                                                <div className="coach-actions">
                                                    <p className="price">
                                                        {coach.price ? `$${coach.price}/month` : 'N/A'}
                                                    </p>
                                                    <button className="book">Inquiry Now <i className="bi bi-arrow-right"></i></button>
                                                    <Link href={`/coach-detail/${coach.user_id}`}><button className="profile">View Profile <i className="bi bi-arrow-right"></i></button></Link>
                                                </div>
                                            </div>
                                            <div className="tags">
                                                {coach.service_names && coach.service_names.length > 0 ? (
                                                    coach.service_names.map((service, index) => (
                                                        <span key={index}>{service}</span>
                                                    ))
                                                ) : (
                                                    <span>No services listed</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="container-fluid pt-3 pagination-content-add">
                                    <div className="row pagination-content-inner">
                                        <div className="pagination">
                                            <button className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><i className="bi bi-chevron-left"></i> Back</button>
                                            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    className={`page-number ${page === currentPage ? 'active' : ''}`}
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.last_page}>Next <i className="bi bi-chevron-right"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </main>) : (
                        <main className="main-content">
                            <p>No coaches found.</p>
                        </main>
                    )}

                </div>
            </div>
        </>
    );
}