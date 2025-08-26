import { cookies } from "next/headers";
import CoachCalendar from "../_coach_components/CoachCalendar";
import QuickSnapshot from "../_coach_components/QuickSnapshot";
import ActiveCoaching from "../_coach_components/ActiveCoaching";
import RatingReviews from "../_coach_components/RatingReviews";
import UpcomingSessions from "../_coach_components/UpcomingSessions";
import IndustryInsights from "../_coach_components/IndustryInsights";
import ServicePerformancess from "../_coach_components/ServicePerformances";
import MyArticles from "../_coach_components/MyArticles";
import ActivityLog from "../_coach_components/ActivityLog";
import WelcomeBack from "../_coach_components/WelcomeBack";


export default async function CoachDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;


  const [pendingRes, QuickSnapRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPendingCoaching`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    }),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachDashboard`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    }),
  ])
  const pendingRequest = await pendingRes.json();
  const QuickSnapData = await QuickSnapRes.json();
  const upcomingSession = QuickSnapData.data.upcoming_bookings || [];
  console.log('upcomingSession', upcomingSession)
  return (
    <div className="main-panel">
      <div className="new-content-wrapper coach-wrap">
        <div className="coach-dashboard-add">
          <WelcomeBack />

          <div className="snapshot">
            <QuickSnapshot QuickSnapData={QuickSnapData} />
          </div>
        </div>

        <div className="active-coaching">
          <div className="grid">
            <div className="matches-add">
              <div className="card col-md-8">
                <ActiveCoaching
                  initialRequest={pendingRequest}
                  token={token} />
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
              <UpcomingSessions upcomingSession={upcomingSession}/>
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
