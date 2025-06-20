'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import CoachSideBarComp from '../_coach_components/coachSideBar';
import { HandleValidateToken } from '@/app/api/auth';
import { FRONTEND_BASE_URL } from '@/utiles/config';


export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        }

        const fetchUser = async () => {
            const tokenData = await HandleValidateToken(token);
            if (!tokenData.success) {
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

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     setIsLoggedIn(false);
    //     setUser(null);
    //     router.push('/login');
    // };

    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <CoachSideBarComp user={user}/>
                <div className="main-panel">
                    <div className='content-wrapper'>

                        <div className="coach-dashboard-add">

                            <div className="header">
                                <h1>Welcome back, {user?.first_name} {user?.last_name}!  <br /> Ready to empower someone today?</h1>
                            </div>


                            <div className="profile-box">
                                <div className="profile-info">
                                    <img alt="profile"  src={user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}/>
                                    <div className='coach-profile-view'>
                                        <div>
                                            <p className='pro-add-value'>Pro</p>
                                            <div><strong>{user?.first_name} {user?.last_name}</strong></div>
                                            <p className='coach-name-text'>Coach</p>
                                        </div>
                                        <div className="status">
                                            <select>
                                                <option>Online</option>
                                                <option>Offline</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-line">
                                        <div className="progress-fill"><span>80%</span></div>
                                    </div>

                                    <div className='update-links'>
                                        <div className='complete-bar'>Profile 80% Complete</div>
                                        <div className="links">
                                            <a href="#">Update Profile</a>
                                            <a href="#">Add Services +</a>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="snapshot">
                                <h3 className="text-lg font-semibold mb-4 quick-text">Quick Snapshot</h3>
                                <div className="grid">
                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-one.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">New Coaching Request</p>
                                                <p className="count">03</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-two.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">Confirmed Booking</p>
                                                <p className="count">02</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-three.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">Upcoming Sessions (05)</p>
                                                <span>Aug 15, 8:00PM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-four.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">Service Performance</p>
                                                <span>54.6% avg</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-five.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">Total Earnings</p>
                                                <span>$3,560</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-six.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">Unread messages</p>
                                                <span>06</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-seven.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">Profile Views</p>
                                                <p className="count">15</p>
                                                <span className='this-month-text'>this month Increased by 20%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-eight.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">Average Rating</p>
                                                <p className="count">4.0</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="glance-box">
                                            <img src="/coachsparkle/assets/images/snapshot-img-nine.png" className="glance-img" />
                                            <div className="new-add-coming">
                                                <p className="title">No. of Favorite</p>
                                                <p className="count">10</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="cta">
                                    <button>Get Featured <i className="bi bi-arrow-right"></i>  </button>
                                </div>
                            </div>
                        </div>


                        <div className='active-coaching'>
                            <div className="grid">

                                <div className='matches-add'>
                                    <div className="card col-md-8">
                                        <h3 className="text-lg font-semibold mb-4 quick-text">Active Coaching Requests and AI Matches <strong>05</strong></h3>

                                        <div className="coaching-card">

                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th style={{ paddingLeft: '20px' }}>User Name</th>
                                                        <th>% Match</th>
                                                        <th>Goal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='coaching-all-match'>
                                                        <td className="user-info">
                                                            <img src="/coachsparkle/assets/images/coaching-img.png" alt="Coach Photo" />
                                                            <div className='tracy-text'>
                                                                <div className="name">Tracy McKenzie</div>
                                                                <div className="sub-info">Coding Coach At <strong>Hemax Pte. Ltd.</strong></div>
                                                                <div className="rating"><i className="bi bi-star-fill"></i> 5.0</div>
                                                            </div>
                                                        </td>
                                                        <td className="match">High Match</td>
                                                        <td className="goal">
                                                            Improve Public Speaking
                                                            <span className="tags"><span className="tag s">S</span><span className="tag r">R</span></span>
                                                        </td>
                                                    </tr>

                                                    <tr className='coaching-all-match'>
                                                        <td className="user-info">
                                                            <img src="/coachsparkle/assets/images/coaching-img.png" alt="Coach Photo" />
                                                            <div className='tracy-text'>
                                                                <div className="name">Tracy McKenzie</div>
                                                                <div className="sub-info">Coding Coach At <strong>Hemax Pte. Ltd.</strong></div>
                                                                <div className="rating"><i className="bi bi-star-fill"></i> 5.0</div>
                                                            </div>
                                                        </td>
                                                        <td className="match">High Match</td>
                                                        <td className="goal">
                                                            Build Confidence
                                                        </td>
                                                    </tr>

                                                    <tr className='coaching-all-match'>
                                                        <td className="user-info">
                                                            <img src="/coachsparkle/assets/images/coaching-img.png" alt="Coach Photo" />
                                                            <div className='tracy-text'>
                                                                <div className="name">Tracy McKenzie</div>
                                                                <div className="sub-info">Coding Coach At <strong>Hemax Pte. Ltd.</strong></div>
                                                                <div className="rating"><i className="bi bi-star-fill"></i> 5.0</div>
                                                            </div>
                                                        </td>
                                                        <td className="match">High Match</td>
                                                        <td className="goal">
                                                            Career Change
                                                            <span className="tags"><span className="tag s">S</span><span className="tag r">R</span></span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className='details-add-btn'>
                                            <button className="view-btn">View details <i className="bi bi-arrow-right"></i></button>
                                        </div>
                                    </div>


                                    <div className="card col-md-4 matches-right-side">


                                        <div id="app"></div>

                                        <div className='manage'>
                                            <button className="manage-buttons">Manage Calendar <i className="bi bi-arrow-right"></i></button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>




                        <div className='rating-reviews'>

                            <div className="card col-md-8 reviews-left-side">
                                <div className="review-container">
                                    <h3 className="text-lg font-semibold mb-4 quick-text">Rating And Reviews <span className="total-rating"><i className="bi bi-star"></i> 5.0 (21 reviews)</span></h3>
                                    <table className="review-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Reviews</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            <tr style={{ height: '10px' }}></tr>
                                        </thead>
                                        <tbody>
                                            <tr className='user-row' style={{ marginBottom: '20px' }}>
                                                <td>
                                                    <div className="user-info">
                                                        <img src="/coachsparkle/assets/images/coaching-img.png" alt="user" />
                                                        <div className="user-details">
                                                            <div className="review-stars">
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star"></i>
                                                            </div>
                                                            <strong>Selena McCoy</strong>

                                                            <small>15 October 2024</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='sed-tab'>
                                                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"</p>
                                                </td>
                                                <td><span className="status published">Published</span></td>
                                                <td className="action-btns">
                                                    <button className="reply-btn">Reply</button>
                                                    <i className="bi bi-eye"></i>
                                                </td>
                                            </tr>
                                            <tr style={{ height: '15px' }}></tr>


                                            <tr className='user-row' style={{ marginBottom: '20px' }}>
                                                <td>
                                                    <div className="user-info">
                                                        <img src="/coachsparkle/assets/images/coaching-img.png" alt="user" />
                                                        <div className="user-details">
                                                            <div className="review-stars">
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star"></i>
                                                            </div>
                                                            <strong>Selena McCoy</strong>

                                                            <small>15 October 2024</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='sed-tab'>
                                                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"</p>
                                                </td>
                                                <td><span className="status published">Published</span></td>
                                                <td className="action-btns">
                                                    <button className="reply-btn">Reply</button>
                                                    <i className="bi bi-eye"></i>
                                                </td>
                                            </tr>
                                            <tr style={{ height: '15px' }}></tr>

                                            <tr className='user-row' style={{ marginBottom: '20px' }}>
                                                <td>
                                                    <div className="user-info">
                                                        <img src="/coachsparkle/assets/images/coaching-img.png" alt="user" />
                                                        <div className="user-details">
                                                            <div className="review-stars">
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star"></i>
                                                            </div>
                                                            <strong>Selena McCoy</strong>

                                                            <small>15 October 2024</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='sed-tab'>
                                                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"</p>
                                                </td>
                                                <td><span className="status published">Published</span></td>
                                                <td className="action-btns">
                                                    <button className="reply-btn">Reply</button>
                                                    <i className="bi bi-eye"></i>
                                                </td>
                                            </tr>



                                        </tbody>
                                    </table>
                                    <div className="view-all">
                                        <button>View All <i className="bi bi-arrow-right"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div className="card col-md-4 reviews-right-side">

                                <div className="session-card">
                                    <h3 className="text-lg font-semibold quick-text">Upcoming Sessions</h3>


                                    <div className="session">
                                        <div className="session-date">
                                            <span className="day">30</span>
                                            <span className="month">AUG</span>
                                        </div>
                                        <img src="/coachsparkle/assets/images/sessions-img-one.png" alt="Lina Stratus" className="avatar" />
                                        <div className="session-info">
                                            <div className="name">Lina Stratus</div>
                                            <div className="time">5:00 PM</div>
                                        </div>
                                    </div>

                                    <div className="session">
                                        <div className="session-date">
                                            <span className="day">15</span>
                                            <span className="month">OCT</span>
                                        </div>
                                        <img src="/coachsparkle/assets/images/sessions-img-two.png" alt="Matthew Saw" className="avatar" />
                                        <div className="session-info">
                                            <div className="name">Matthew Saw</div>
                                            <div className="time">7:00 PM</div>
                                        </div>
                                    </div>

                                    <div className="session">
                                        <div className="session-date">
                                            <span className="day">20</span>
                                            <span className="month">DEC</span>
                                        </div>
                                        <img src="/coachsparkle/assets/images/sessions-img-three.png" alt="Dercy Sho" className="avatar" />
                                        <div className="session-info">
                                            <div className="name">Dercy Sho</div>
                                            <div className="time">10:00 AM</div>
                                        </div>
                                    </div>

                                    <div className="manage-btn">
                                        <button>Manage Bookings <i className="bi bi-arrow-right"></i></button>
                                    </div>
                                </div>


                            </div>


                        </div>





                        <div className='industry-insights'>
                            <div className="insight-card">
                                <h3 className="text-lg font-semibold quick-text">Industry Insights</h3>
                                <p className="subtitle">Top 3 searched services in your category</p>
                                <ol className="insight-list">
                                    <li>Career Advancement</li>
                                    <li>Public Speaking</li>
                                    <li>Interview Skills</li>
                                </ol>
                            </div>
                        </div>



                        <div className='services-performances'>
                            <div className="service-performance">
                                <h3 className="text-lg font-semibold quick-text">Services Performances</h3>

                                <table>
                                    <thead>
                                        <tr className='service-add'>
                                            <th>Service Packages</th>
                                            <th>No. of Views</th>
                                            <th>Inquiry Rate</th>
                                            <th>Booking Confirmed</th>
                                            <th>Rating & Reviews</th>
                                            <th>Total Earnings</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='growth-package'>
                                        <tr>
                                            <td>Career Growth Package</td>
                                            <td>12</td>
                                            <td>12</td>
                                            <td>2</td>
                                            <td>5.0</td>
                                            <td className='total-text'>$175</td>
                                            <td><span className="badge active">Active</span></td>
                                            <td className="actions">
                                                <a href="#"><i className="bi bi-pencil-square"></i></a>
                                                <a href="#"><i className="bi bi-trash3"></i></a>
                                                <a href="#"><i className="bi bi-eye"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Confidence Coaching</td>
                                            <td>12</td>
                                            <td>12</td>
                                            <td>0</td>
                                            <td>0.0</td>
                                            <td className='total-text'>$175</td>
                                            <td><span className="badge active">Active</span></td>
                                            <td className="actions">
                                                <a href="#"><i className="bi bi-pencil-square"></i></a>
                                                <a href="#"><i className="bi bi-trash3"></i></a>
                                                <a href="#"><i className="bi bi-eye"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Group Discussion Coaching</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0.0</td>
                                            <td className='total-text'>$0</td>
                                            <td><span className="badge unpublished">Unpublish</span></td>
                                            <td className="actions">
                                                <a href="#"><i className="bi bi-pencil-square"></i></a>
                                                <a href="#"><i className="bi bi-trash3"></i></a>
                                                <a href="#"><i className="bi bi-eye"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="footer-btn">
                                    <button className="manage-btn">Manage Services <i className="bi bi-arrow-right"></i></button>
                                </div>
                            </div>


                        </div>


                        <div className='my-articles'>
                            <h3 className="text-lg font-semibold quick-text">My Articles</h3>

                            <table>
                                <thead>
                                    <tr className='articles-add'>
                                        <th className='name-art'>Name</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    <tr style={{ height: '10px' }}></tr>
                                </thead>
                                <tbody>
                                    <tr className='info-add'>
                                        <td>
                                            <div className="article-info">
                                                <img src="/coachsparkle/assets/images/articles-one.png" alt="Article" />
                                                <span>Article Name</span>
                                            </div>
                                        </td>
                                        <td className='voluptatem-text'>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae...
                                        </td>
                                        <td><span className="badge published">Published</span></td>
                                        <td className="actions">
                                            <i className="bi bi-pencil-square"></i>
                                            <i className="bi bi-trash3"></i>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '10px' }}></tr>

                                    <tr className='info-add'>
                                        <td>
                                            <div className="article-info">
                                                <img src="/coachsparkle/assets/images/articles-two.png" alt="Article" />
                                                <span>Article Name</span>
                                            </div>
                                        </td>
                                        <td className='voluptatem-text'>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae...
                                        </td>
                                        <td><span className="badge published">Published</span></td>
                                        <td className="actions">
                                            <i className="bi bi-pencil-square"></i>
                                            <i className="bi bi-trash3"></i>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '10px' }}></tr>

                                    <tr className='info-add'>
                                        <td>
                                            <div className="article-info">
                                                <img src="/coachsparkle/assets/images/articles-three.png" alt="Article" />
                                                <span>Article Name</span>
                                            </div>
                                        </td>
                                        <td className='voluptatem-text'>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae...
                                        </td>
                                        <td><span className="badge pending">Pending</span></td>
                                        <td className="actions">
                                            <i className="bi bi-pencil-square"></i>
                                            <i className="bi bi-trash3"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>


                        <div className='activity-log'>

                            <h3 className="text-lg font-semibold quick-text">Activity Log</h3>
                            <p>- You sent a request to coach Tracy McCoy (3 days ago)</p>
                        </div>


                    </div>


                </div>
            </div>
        </>
    )
}