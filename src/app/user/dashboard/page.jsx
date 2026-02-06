"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgress } from "@mui/material";
import { newDateTimeFormatter } from "@/lib/commonFunction";
import DashboardAIRecommendations from "./_components/DashboardAIRecommendations";

export default function UserDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [favoriteCoaches, setFavoriteCoaches] = useState([]);
    const [userGoals, setUserGoals] = useState([]);
    const [loadingGoals, setLoadingGoals] = useState(true);
    const [atAGlanceData, setAtAGlanceData] = useState(null);
    const [loadingAtAGlance, setLoadingAtAGlance] = useState(true);

    const [recentActivityData, setRecentActivityData] = useState(null);
    const [loadingRecentActivity, setLoadingRecentActivity] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchAllData = async () => {
            try {

                // Validate token first
                const tokenData = await HandleValidateToken(token);
                if (!tokenData) {
                    Cookies.remove('token');
                    localStorage.removeItem('user');
                    router.push('/login');
                    return;
                }

                setUser(tokenData.data);

                // Prepare all API calls
                const favoritesPromise = fetchAllFavorites(token);
                const goalsPromise = fetchUserGoals(token);
                const glancePromise = fetchAtAGlanceData(token);
                const recentActivityPromise = fetchRecentActivity(token);

                // Execute all promises concurrently
                const [favorites, goals, glanceData, recentActivity] = await Promise.all([
                    favoritesPromise,
                    goalsPromise,
                    glancePromise,
                    recentActivityPromise
                ]);

                // Set states with results
                setFavoriteCoaches(favorites);
                setUserGoals(goals);
                setAtAGlanceData(glanceData);
                setRecentActivityData(recentActivity);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                // Handle individual errors gracefully
                setUserGoals([]);
                setAtAGlanceData(null);
                setRecentActivityData(null);
            } finally {
                setLoadingGoals(false);
                setLoadingAtAGlance(false);
                setLoadingRecentActivity(false);
            }
        };

        const fetchAllFavorites = async (token) => {
            const perPage = 4;
            let pageNum = 1;
            let allFavorites = [];
            let hasMore = true;

            try {
                while (hasMore) {
                    const response = await fetch(
                        `${apiUrl}/coachFavoriteList?page=${pageNum}&per_page=${perPage}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const result = await response.json();
                    if (result?.data?.length > 0) {
                        allFavorites = [...allFavorites, ...result.data];
                        pageNum++;
                    } else {
                        hasMore = false;
                    }
                }

                const sorted = allFavorites.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                return sorted.slice(0, 3);
            } catch (error) {
                console.error("Error fetching favorites:", error);
                return [];
            }
        };

        const fetchUserGoals = async (token) => {
            try {
                const response = await fetch(`${apiUrl}/getusergoals`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                return result.success ? (result.data || []) : [];
            } catch (error) {
                console.error("Error fetching user goals:", error);
                return [];
            }
        };

        const fetchAtAGlanceData = async (token) => {
            try {
                const response = await fetch(`${apiUrl}/at-a-glance-user-dashboard`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                return result.success ? result.data : null;
            } catch (error) {
                console.error("Error fetching at-a-glance data:", error);
                return null;
            }
        };

        const fetchRecentActivity = async (token) => {
            try {
                const response = await fetch(`${apiUrl}/recentCoachingactivity`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                return result.success ? result : null;
            } catch (error) {
                console.error("Error fetching recent activity:", error);
                return null;
            }
        };

        fetchAllData();
    }, [router, apiUrl]);


    // Rest of your component remains the same...
    const getProgressColor = (percent) => {
        if (percent >= 80) return "success";
        if (percent >= 50) return "warning";
        if (percent >= 25) return "info";
        return "danger";
    };

    const getProgressWidth = (percent) => {
        return `${Math.min(percent, 100)}%`;
    };

    const handleUpdateGoal = () => {
        router.push('/user/profile');
    };

    const handleViewSession = (coachId, packageId) => {
        router.push(`/coach-detail/${coachId}/package/${packageId}`);
    };

    const formatUpcomingSession = (upcomingSession) => {
        if (!upcomingSession || !upcomingSession.session_date_start) {
            return "No upcoming session";
        }

        try {
            const date = new Date(upcomingSession.session_date_start);
            const time = upcomingSession.slot_time_start || "00:00";

            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });

            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

            return `${formattedDate}, ${formattedTime}`;
        } catch (error) {
            console.error("Error formatting session date:", error);
            return "Invalid date";
        }
    };

    const hasUnrespondedMatches = atAGlanceData?.total_coach_matches > 0;

    // Helper function to get status text and class based on booking status
    const getBookingStatus = (status) => {
        switch (status) {
            case 0:
                return { text: "Pending", className: "status-pending" };
            case 1:
                return { text: "Confirmed", className: "status-confirmed" };
            case 2:
                return { text: "Completed", className: "status-completed" };
            case 3:
                return { text: "Cancelled", className: "status-cancelled" };
            default:
                return { text: "Pending", className: "status-pending" };
        }
    };

    // console.log('recentActivityData', recentActivityData)

    return (
        <div className="main-panel">
            <div className="content-wrapper user-dash-top-content">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0 user-dash-add">
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
                                    <CheckCircleIcon />
                                </span>
                            </h5>
                            <p className="text-sm text-gray-500">User</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 at-glance-add">
                    <div className="bg-white p-5 rounded-xl shadow-md boder-line-add">
                        <h3 className="text-lg font-semibold mb-4">At a Glance</h3>
                        {loadingAtAGlance ? (
                            <div className="flex grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 inner-card-add">
                                <div className="circular_for_glance">
                                    <CircularProgress />
                                </div>
                            </div>
                        ) : atAGlanceData ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 inner-card-add">
                                {/* New Coach Matches */}
                                <div className="bg-gray-100 rounded-xl p-4 text-center">
                                    <img src="/coachsparkle/assets/images/glance-img-one.png" className="mx-auto mb-2" alt="Coach Matches" />
                                    <div className="new-add-comeing">
                                        <p className="font-medium">New Coach Matches</p>
                                        <p className="text-blue-600 font-bold">
                                            {atAGlanceData.total_coach_matches || 0}
                                        </p>
                                    </div>
                                </div>

                                {/* Coaching Request Status */}
                                <div className="bg-gray-100 rounded-xl p-4 text-center" onClick={() => router.push('/user/coaching-activities')}>
                                    <img src="/coachsparkle/assets/images/glance-img-two.png" className="mx-auto mb-2" alt="Coaching Requests" />
                                    <div className="new-add-comeing">
                                        <p className="font-medium">Coaching Request Status</p>
                                        <p className="text-blue-600 font-bold">
                                            {atAGlanceData.total_coaching_request || 0}
                                        </p>
                                    </div>
                                </div>

                                {/* Active Coaching */}
                                <div className="bg-gray-100 rounded-xl p-4 text-center" onClick={() => router.push('/user/coaching-activities')}>
                                    <img src="/coachsparkle/assets/images/glance-img-three.png" className="mx-auto mb-2" alt="Active Coaching" />
                                    <div className="new-add-comeing">
                                        <p className="font-medium">Active Coaching</p>
                                        <p className="text-blue-600 font-bold">
                                            {atAGlanceData.active_coaching || 0}
                                        </p>
                                    </div>
                                </div>

                                {/* Upcoming Session */}
                                <div className="bg-gray-100 rounded-xl p-4 text-center" onClick={() => router.push('/user/booking')}>
                                    <img src="/coachsparkle/assets/images/glance-img-four.png" className="mx-auto mb-2" alt="Upcoming Session" />
                                    <div className="new-add-comeing">
                                        <p className="font-medium">Upcoming Session</p>
                                        <p className="text-blue-600 font-bold text-sm">
                                            {formatUpcomingSession(atAGlanceData.upcoming_session)}
                                        </p>
                                    </div>
                                </div>

                                {/* Unread Messages */}
                                <div className="bg-gray-100 rounded-xl p-4 text-center" onClick={() => router.push('/user/user-message/1')}>
                                    <img src="/coachsparkle/assets/images/glance-img-five.png" className="mx-auto mb-2" alt="Unread Messages" />
                                    <div className="new-add-comeing">
                                        <p className="font-medium">Unread Messages</p>
                                        <p className="text-blue-600 font-bold">
                                            {atAGlanceData.unread_message || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-500">
                                Failed to load dashboard data
                            </div>
                        )}

                        {/* <p className="mt-6 text-sm text-gray-500">
                            You haven’t responded to any coaches yet.
                            <a href="#" className="text-blue-600 font-medium hover:underline">
                                View Matches
                            </a>
                        </p> */}

                        <p className="mt-6 text-sm text-gray-500">
                            {hasUnrespondedMatches ? (
                                <>
                                    You have {atAGlanceData.total_coach_matches} coach match(es) to respond to.
                                    <a
                                        href="#"
                                        className="text-blue-600 font-medium hover:underline ml-1"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push('/coach-detail/list');
                                        }}
                                    >
                                        View Matches
                                    </a>
                                </>
                            ) : (
                                "You're all caught up with your coach matches."
                            )}
                        </p>
                    </div>
                </div>

                <div className="goals-progress">
                    <div className="left-column">

                        <div className="card">
                            <div className="card-header">
                                <h3>Your Coaching Goals Progress</h3>
                                <button
                                    className="user-update-btn"
                                    onClick={handleUpdateGoal}
                                >
                                    Update Goal <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>

                            {loadingGoals ? (
                                <div className="loading-state">
                                    <p>Loading your goals...</p>
                                </div>
                            ) : userGoals.length === 0 ? (
                                <div className="empty-state">
                                    <p>No goals set yet. Start by setting your coaching goals!</p>
                                    <button
                                        className="user-update-btn"
                                        onClick={handleUpdateGoal}
                                    >
                                        Set Goals <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            ) : (
                                userGoals.map((goal, index) => (
                                    <div key={index} className="goal">
                                        <p className="build-text-add">{goal.goal}</p>
                                        {goal.matched_package_title && <p className="text-muted small">Matched with: {goal.matched_package_title}</p>}
                                        <div className="progress">
                                            <div
                                                className={`progress-bar ${getProgressColor(goal.progress_percent)}`}
                                                style={{ width: getProgressWidth(goal.progress_percent) }}
                                            >
                                                {goal.progress_percent > 0 && <p>{goal.progress_percent}%</p>}
                                            </div>
                                            {goal.progress_percent === 0 && (
                                                <div className="progress-bar">
                                                    <p>0%</p>
                                                </div>
                                            )}

                                        </div>
                                        {goal.matched_package_id &&
                                            <div className="goal-actions">
                                                <button
                                                    className="view-btn"
                                                    onClick={() => handleViewSession(goal.coach_id, goal.matched_package_id)}
                                                >
                                                    View Session
                                                </button>
                                            </div>
                                        }
                                    </div>
                                ))
                            )}
                        </div>


                        <DashboardAIRecommendations />

                    </div>

                    <div className="right-column">
                        <div className="coaching-card">
                            <h3 className="title">Recent Coaching Activities</h3>

                            {/* Loading State */}
                            {loadingRecentActivity && (
                                <div className="loading-recent">
                                    <p className="section-title text-center">Loading Recent activities ...</p>
                                    <div className="circular_for_glance loading-make-size flex justify-center py-4">
                                        {/* <CircularProgress size={24} /> */}
                                    </div>
                                </div>
                            )}
                            {/* <div className="card">
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
                            </div> */}

                            {/*
                            <div className="card">
                                <p className="section-title">You’re working with Tony Buck</p>
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
                            </div> */}

                            {/* Latest Booking Card */}
                            {!loadingRecentActivity && (
                                <>
                                    {(() => {
                                        const hasBooking = recentActivityData?.latest_booking &&
                                            !Array.isArray(recentActivityData.latest_booking);
                                        const hasCoachingRequest = recentActivityData?.latest_coaching_request &&
                                            !Array.isArray(recentActivityData.latest_coaching_request);

                                        if (hasBooking || hasCoachingRequest) {
                                            return (
                                                <>
                                                    {hasBooking && (
                                                        <div className="card">
                                                            <p className="section-title">You're working with {recentActivityData.latest_booking.first_name} {recentActivityData.latest_booking.last_name}</p>
                                                            <span className={`status ${getBookingStatus(recentActivityData.latest_booking.status).className}`}>
                                                                {getBookingStatus(recentActivityData.latest_booking.status).text}
                                                            </span>
                                                            <h5>{recentActivityData.latest_booking.title}</h5>

                                                            <div className="coach-info">
                                                                <img
                                                                    src={recentActivityData.latest_booking.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                                                                    alt="Coach Image"
                                                                    className="coach-img"
                                                                    onError={(e) => {
                                                                        e.target.src = `${FRONTEND_BASE_URL}/images/default_profile.jpg`;
                                                                    }}
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => router.push(`/coach-detail/${recentActivityData.latest_booking.coach_id}`)}
                                                                />
                                                                <div className="coach-details">
                                                                    <p className="coach-name">{recentActivityData.latest_booking.first_name} {recentActivityData.latest_booking.last_name}</p>
                                                                    <p className="coach-rating">
                                                                        {/* <i className="bi bi-star-fill"></i>
                                                                        <span>5.0</span> */}
                                                                        {newDateTimeFormatter(recentActivityData.latest_booking.session_date_start, recentActivityData.latest_booking.slot_time_start)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="buttons">
                                                                <button
                                                                    className="btn view"
                                                                    onClick={() => router.push(`/coach-detail/${recentActivityData.latest_booking.coach_id}`)}
                                                                >
                                                                    View Profile
                                                                </button>
                                                                <button
                                                                    className="btn message"
                                                                    onClick={() => router.push(`/user/user-message/3?coach_id=${recentActivityData.latest_booking.coach_id}`)}
                                                                >
                                                                    Message
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {hasCoachingRequest && (
                                                        <div className="card">
                                                            <p className="section-title">Coaching Request Sent</p>
                                                            {/* <span className="status">Awaiting response</span> */}
                                                            <h5>{recentActivityData.latest_coaching_request.professional_title}</h5>

                                                            <div className="coach-info">
                                                                <img
                                                                    src={recentActivityData.latest_coaching_request.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                                                                    alt="Coach Image"
                                                                    className="coach-img"
                                                                    onError={(e) => {
                                                                        e.target.src = `${FRONTEND_BASE_URL}/images/default_profile.jpg`;
                                                                    }}
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => router.push(`/coach-detail/${recentActivityData.latest_coaching_request.coach_id}`)}
                                                                />
                                                                <div className="coach-details">
                                                                    <p className="coach-name">
                                                                        {recentActivityData.latest_coaching_request.first_name} {recentActivityData.latest_coaching_request.last_name}
                                                                    </p>
                                                                    <p className="coach-rating">
                                                                        <i className="bi bi-star-fill"></i>
                                                                        <span>{recentActivityData.latest_coaching_request.average_rating || 0}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="buttons">
                                                                <button
                                                                    className="btn view"
                                                                    onClick={() => router.push(`/coach-detail/${recentActivityData.latest_coaching_request.coach_id}`)}
                                                                >
                                                                    View Profile
                                                                </button>
                                                                <button
                                                                    className="btn message"
                                                                    onClick={() => router.push(`/user/user-message/2?coach_id=${recentActivityData.latest_coaching_request.coach_id}`)}
                                                                >Message
                                                                </button>
                                                            </div>
                                                        </div>

                                                    )}
                                                </>
                                            );
                                        } else {
                                            return (
                                                <div className="card no-recent-activity">
                                                    <p className="section-title">No recent activities</p>
                                                    <p>Start by booking a session or sending coaching requests!</p>
                                                </div>)
                                        }
                                    })()}
                                </>
                            )}
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
                                    {favoriteCoaches.length > 0 ? (
                                        favoriteCoaches.map((item) => {
                                            const coach = item.coach;
                                            return (
                                                <div className="coach-item" key={coach?.id ?? 0}>
                                                    <img
                                                        src={coach?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                                                        alt="Coach"
                                                        className="coach-img"
                                                        onError={(e) => {
                                                            e.target.src = `${FRONTEND_BASE_URL}/images/default_profile.jpg`;
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => router.push(`/coach-detail/${coach?.id}`)}
                                                    />
                                                    <span className="coach-name">
                                                        {coach?.first_name} {coach?.last_name}
                                                        <p className="coach-desc-title">
                                                            {coach?.professional_title} at{" "}
                                                            <b>{coach?.company_name || "Unknown Company"}</b>.
                                                        </p>
                                                        <i className="bi bi-star-fill"></i>
                                                        {coach?.reviews.rating || "5.0"}
                                                    </span>

                                                    <button className="btn-book" onClick={() => router.push(`/coach-detail/${coach?.id}`)}>Book Now</button>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p>No favorite coaches found.</p>
                                    )}
                                </div>
                                {/* <div className="coach-item">
                                        <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                        <span className="coach-name">Jammy Vardy</span>
                                        <button className="btn-book">Book Now</button>
                                    </div> */}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="activity-log-card">
                    <h3 className="activity-title">Activity Log</h3>
                    {loadingRecentActivity ? (
                        <div className="activity-list loading-state">
                            <p>Loading activities...</p>
                        </div>
                    ) : recentActivityData?.activities && recentActivityData.activities.length > 0 ? (
                        <ul className="activity-list">
                            {recentActivityData.activities.map((activity, index) => (
                                <li key={index}>
                                    - {activity.message} <span className="activity-time">({activity.time_ago})</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="activity-list">
                            <li>- No recent activities</li>
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}
