'use client';

import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useRouter } from "next/navigation";

export default function UpcomingSessions({ upcomingSession }) {
  const router = useRouter();
  console.log('updaa', upcomingSession)
  return (
    <>
      <h3 className="text-lg font-semibold quick-text">Upcoming Sessions</h3>
      {upcomingSession && upcomingSession.length > 0 ? (upcomingSession.map((session) => (
        <div className="session" key={session?.booking_id}>
          <div className="session-date">
            {/* <span className="day">{session?.session_date_start}</span> */}
            {/* <span className="month">AUG</span> */}
            <span className="day">
              {new Date(session.session_date_start).toLocaleDateString(
                "en-US",
                { day: "numeric", month: "short", year: "numeric" }
              )}
            </span>
          </div>
          <img
            src={session?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
            alt="UserImg"
            className="avatar"
          />
          <div className="session-info">
            <div className="name">{session?.first_name} {session?.last_name}</div>
            <div className="time">{session?.slot_time_start}</div>
          </div>
        </div>))) :
        (
          <p>No upcoming sessions</p>
        )}

      <div className="manage-btn">
        <button onClick={() => router.push('/coach/booking')}>
          Manage Bookings <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </>
  );
}
