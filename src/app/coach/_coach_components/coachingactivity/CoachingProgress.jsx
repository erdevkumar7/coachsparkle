"use client";
import { getUserProgressCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CoachingProgress({ initialProgress, token }) {
  const router = useRouter();
  const [getCoahcingProgress, setCoahcingProgress] = useState(initialProgress.data);
  const [currentPage, setCurrentPage] = useState(initialProgress.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialProgress.pagination.last_page);

  const fetchPageData = async (page) => {
    const res = await getUserProgressCoachingClient(page, token);
    if (res?.data) {
      setCoahcingProgress(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

  // console.log('getCoahcingProgress', getCoahcingProgress)
  return (
    <div className="mt-5 status-coaching-top">
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
                  <button className="btn btn-outline-secondary button-msg"
                    onClick={() => {
                      router.push(`/coach/messages/3?user_id=${session.id}`);
                    }}>
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={fetchPageData}
          />
        </div>
      </div>
    </div>
  );
}
