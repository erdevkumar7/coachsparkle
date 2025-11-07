"use client";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { getUserCanceledCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CanceledMissed({ initialCanceled, token }) {
  const router = useRouter();
  const [getCoahcingCanceled, setCoahcingProgress] = useState(initialCanceled.data);
  const [currentPage, setCurrentPage] = useState(initialCanceled.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialCanceled.pagination.last_page);
  const [isOpen, setIsOpen] = useState(true);

  const fetchPageData = async (page) => {
    const res = await getUserCanceledCoachingClient(page, token);
    if (res?.data) {
      setCoahcingProgress(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };


  const handleRescheduleRequest = (rqst) => {
    console.log('item', rqst)
  };



  return (
    <>
      <div className="mt-5 canceled-missed">
        <div className="coaching-progress-status">
          <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
            <div>
              <h3>
                Canceled / Missed ({initialCanceled.pagination.total > 0 && initialCanceled.pagination.total < 10 ? `0${initialCanceled.pagination.total}` : initialCanceled.pagination.total})
              </h3>
            </div>
            <div
              className="sorting-data d-flex align-items-center gap-2"
              onClick={() => setIsOpen((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              <ExpandMoreOutlinedIcon
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
          </div>

          {isOpen && (
            <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4">
                {getCoahcingCanceled.map((session, index) => (
                  <div key={index} className="col-md-4 coaching-progress p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4 className="mb-0">Session Canceled</h4>
                      <span className="session">{session.session_left} Session left</span>
                    </div>

                    <div className="mb-3 status-div">
                      <button className="border px-3 py-1 rounded-pill">
                        {/* {session.status} */}
                        Canceled
                      </button>
                    </div>

                    <div className="d-flex align-items-start gap-2 mb-3 content">
                      <div>
                        <img
                          src={session?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                          alt="user"
                          className="rounded-circle"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                      </div>
                      <div>
                        <span className="fw-semibold d-block name">
                          {session.package_title?.slice(0, 20)} With {session.first_name} {session.last_name}
                        </span>
                        <span className="d-block time">{session.session_date_start}
                          {session.slot_time_start &&
                            <> at {session.slot_time_start} </>}
                        </span>
                        <img src="/coachsparkle/images/zoom.png" alt="platform" />
                      </div>
                    </div>

                    <div className="d-flex gap-3">
                      <button className="btn btn-primary button-note" onClick={() => handleRescheduleRequest(session)}>
                        Reschedule Session
                      </button>
                      <button
                        className="btn btn-outline-secondary button-msg"
                        onClick={() => {
                          router.push(`/user/user-message/3?coach_id=${session.id}`)
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
            </div>)}
        </div>
      </div>
    </>
  );
}

