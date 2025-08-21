"use client";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useState } from "react";
export default function CoachingProgress({ initialProgress, token }) {
  const [getCoahcingProgress, setCoahcingProgress] = useState(initialProgress.data);
  // const inprogress = [
  //   {
  //     image: "/coachsparkle/assets/images/coaching-img.png",
  //     heading: "Session Booked",
  //     sessions: "1 Session left",
  //     status: "Active",
  //     name: "Breakthrough Package With User Display Name",
  //     time: "Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)",
  //     app: "/coachsparkle/images/zoom.png",
  //     buttonNote: "View Session",
  //   }
  // ];
  console.log('getCoahcingProgress', getCoahcingProgress)
  return (
    <div className="mt-5">
      <div className="coaching-progress-status">
        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
          <div>
            <h3>Coaching In Progress ({initialProgress.pagination.total < 10 ? `0${initialProgress.pagination.total}` : initialProgress.pagination.total})</h3>
          </div>
          <div className="sorting-data d-flex align-items-center gap-2">
            <ExpandMoreOutlinedIcon />
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap py-4 px-4">
          <div className="row gap-4">
            {getCoahcingProgress.map((session, index) => (
              <div className="col-md-4 coaching-progress p-3" key={index}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  {/* <h4 className="mb-0">{progress.heading}</h4> */}
                  <span className="session">{session.session_left} Session left</span>
                </div>

                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill">
                    {/* {session.status} */}
                    Session In Progress
                  </button>
                </div>

                <div className="d-flex align-items-start gap-3 mb-3 content">
                  <div>
                    <img
                      src={session?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                      alt="User"
                      className="rounded-circle"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </div>
                  <div>
                    <span className="fw-semibold d-block name">
                      {session.package_title?.slice(0, 20)} With {session.first_name} {session.last_name}
                    </span>
                    <span className="d-block time">
                      {session.session_date_start}
                      {session.slot_time_start &&
                        <> at {session.slot_time_start} </>}
                    </span>
                    <img src="/coachsparkle/images/zoom.png" alt="zoom" />
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <button className="btn btn-primary button-note">
                    View Session
                  </button>
                  <button className="btn btn-outline-secondary button-msg">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
