"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import CoachCalendar from "../_coach_components/CoachCalendar";
import QuickSnapshot from "../_coach_components/QuickSnapshot";
import ActiveCoaching from "../_coach_components/ActiveCoaching";
import RatingReviews from "../_coach_components/RatingReviews";
import UpcomingSessions from "../_coach_components/UpcomingSessions";
import IndustryInsights from "../_coach_components/IndustryInsights";
import ServicePerformancess from "../_coach_components/ServicePerformances";
import MyArticles from "../_coach_components/MyArticles";
import ActivityLog from "../_coach_components/ActivityLog";

export default function CoachDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }

    const fetchUser = async () => {
      const tokenData = await HandleValidateToken(token);
      if (!tokenData) {
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }

      setUser(tokenData.data);
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
    <div className="main-panel">
      <div className="content-wrapper coach-wrap">
        <div className="coach-dashboard-add">
          <div className="header">
            <h1>
              Welcome back, Coach {user?.first_name}! <br /> Ready
              to empower someone today?
            </h1>
          </div>

          <div className="profile-box">
            <div className="profile-info">
              <img
                alt="profile"
                src={
                  user?.profile_image ||
                  `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                }
              />
              <div className="coach-profile-view">
                <div>
                  <p className="pro-add-value">Pro</p>
                  <div>
                    <strong>
                      {user?.first_name} {user?.last_name}
                    </strong>
                  </div>
                  <p className="coach-name-text">Coach</p>
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
                <div className="progress-fill">
                  <span>80%</span>
                </div>
              </div>

              <div className="update-links">
                <div className="complete-bar">Profile 80% Complete</div>
                <div className="links">
                  <a href="#">Update Profile</a>
                  <a href="#">Add Services +</a>
                </div>
              </div>
            </div>
          </div>

          <div className="snapshot">
            <QuickSnapshot />
          </div>
        </div>

        <div className="active-coaching">
          <div className="grid">
            <div className="matches-add">
              <div className="card col-md-8">
                <ActiveCoaching />
              </div>

              <div className="col-md-4 matches-right-side">
                <div id="app"></div>
                <CoachCalendar />
              </div>
            </div>
          </div>
        </div>

        <div className="rating-reviews">
          <div className="card col-md-8 reviews-left-side">
            <div className="review-container">
              <RatingReviews />
            </div>
          </div>

          <div className="card col-md-4 reviews-right-side">
            <div className="session-card">
              <UpcomingSessions />
            </div>
          </div>
        </div>

        <div className="industry-insights">
          <div className="insight-card">
            <IndustryInsights />
          </div>
        </div>

        <div className="services-performances">
          <div className="service-performance">
            <ServicePerformancess />
          </div>
        </div>

        <div className="my-articles">
          <MyArticles />
        </div>

        <div className="activity-log">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}
