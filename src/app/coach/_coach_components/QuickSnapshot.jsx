"use client";
import { useUser } from "@/context/UserContext";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

export default function QuickSnapshot({ QuickSnapData }) {
  const {
    average_rating,
    completed_bookings,
    confirmed_bookings,
    in_progress_count,
    upcoming_session_count,
    no_of_favorite,
    profile_percentage,
    profile_views,
    unread_messages,
    service_performance_percentage,
    profile_views_this_month_increment,
    new_requests,
    total_earning,
    upcoming_sessions = [],
  } = QuickSnapData?.data || {};

  console.log('QuickSnapDataaaaaa', QuickSnapData)
  const { user } = useUser();
  let isProUser = user.subscription_plan.plan_status;

  const LockedCard = ({ title, image }) => (
    <div className="card locked-card">
      <div className="glance-box locked">
        <img src={image} className="glance-img" />
        <div className="new-add-coming">
          <p className="title">
            {title}
            <i className="bi bi-lock-fill text-warning"></i>
          </p>
          <p className="count">**</p>
        </div>
        <div className="tooltip-box">
          <InfoOutlineIcon />
          Upgrade To Pro Coach Plan To Unlock This Metric
        </div>
      </div>
    </div>
  );

  return (
    <>
      <h3 className="text-lg font-semibold mb-4 quick-text">Quick Snapshot</h3>
      <div className="grid">
        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-one.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">New Coaching Request</p>
              <span className="count">{new_requests < 10 ? `0${new_requests}` : new_requests}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-two.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Confirmed Booking</p>
              <span className="count">{confirmed_bookings < 10 ? `0${confirmed_bookings}` : confirmed_bookings}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-three.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Upcoming Sessions ({upcoming_session_count < 10 ? `0${upcoming_session_count}` : upcoming_session_count})</p>
              {upcoming_sessions && upcoming_sessions.length > 0 ?
                <span>
                  {new Date(upcoming_sessions[0].session_date_start).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "short" }
                  )}
                </span> : <span> N/A</span>}
            </div>
          </div>
        </div>

        {isProUser ? (
          <div className="card">
            <div className="glance-box">
              <img
                src="/coachsparkle/assets/images/snapshot-img-four.png"
                className="glance-img"
              />
              <div className="new-add-coming">
                <p className="title">Service Performance</p>
                <span>{service_performance_percentage || 0}% Avg</span>
              </div>
            </div>
          </div>
        ) : (
          <LockedCard
            title="Service Performance"
            image={"/coachsparkle/assets/images/snapshot-img-four.png"}
          />
        )}

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-five.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Total Earnings</p>
              <span>${total_earning}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-six.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Unread messages</p>
              <span className="count">{unread_messages < 10 ? `0${unread_messages}` : unread_messages}</span>
            </div>
          </div>
        </div>

        {isProUser ? (
          <div className="card">
            <div className="glance-box">
              <img
                src="/coachsparkle/assets/images/snapshot-img-seven.png"
                className="glance-img"
              />
              <div className="new-add-coming">
                <p className="title">Profile Views</p>
                <span className="count">{profile_views < 10 ? `0${profile_views}` : profile_views}</span>
                <span className="this-month-text">
                  this month Increased by {profile_views_this_month_increment}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <LockedCard
            title="Profile Views"
            image={"/coachsparkle/assets/images/snapshot-img-seven.png"}
          />
        )}

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-eight.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Average Rating</p>
              <span className="count">{average_rating || '00'}</span>
            </div>
          </div>
        </div>

        {isProUser ? (
          <>
            <div className="card">
              <div className="glance-box">
                <img
                  src="/coachsparkle/assets/images/snapshot-img-nine.png"
                  className="glance-img"
                />
                <div className="new-add-coming">
                  <p className="title">No. of Favorite</p>
                  <span className="count">{no_of_favorite < 10 ? `0${no_of_favorite}` : no_of_favorite}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <LockedCard
              title="No. of Favorite"
              image={"/coachsparkle/assets/images/snapshot-img-nine.png"}
              buttonText={"Upgrade To Pro Coach Plan To Unlock This Metric"}
            />
          </>
        )}
      </div>

      {!isProUser && (
        <div className="cta">
          <button>
            Upgrade to Pro Coach Plan <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      )}
    </>
  );
}
