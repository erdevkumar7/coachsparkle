"use client";
import { getUserCompletedCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CompletedCoaching({ initialCompleted, token }) {
  const router = useRouter();
  const [getCompleted, setCompleted] = useState(initialCompleted.data);
  const [currentPage, setCurrentPage] = useState(initialCompleted.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialCompleted.pagination.last_page);


  const fetchPageData = async (page) => {
    const res = await getUserCompletedCoachingClient(page, token);
    if (res?.data) {
      setCompleted(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

  return (
    <div className="mt-5 meditation-package">
      <div className="coaching-progress-status">
        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
          <div>
            <h3>
              Completed Coaching ({initialCompleted.pagination.total < 10 ? `0${initialCompleted.pagination.total}` : initialCompleted.pagination.total})
            </h3>
          </div>
          <div className="sorting-data d-flex align-items-center gap-2">
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ExpandMoreOutlinedIcon"
            >
              <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg>
          </div>
        </div>

        <div className="d-flex justify-content-between flex-wrap py-4 px-4">
          <div className="row gap-4">
            {getCompleted.map((completed, index) => (
              <div key={index} className="col-md-4 coaching-progress p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  {/* <h4 className="mb-0">Pending review</h4> */}
                </div>

                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill">
                    Completed
                  </button>
                </div>

                <div className="d-flex align-items-start gap-2 mb-3 content">
                  <div>
                    <img
                      src={completed?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                      alt="User"
                      className="rounded-circle"
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  </div>
                  <div>
                    <span className="fw-semibold d-block name">
                      {completed.package_title?.slice(0, 20)} With {completed.first_name} {completed.last_name}
                    </span>
                    <span className="d-block time">Completed {completed.session_date_end}</span>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <button className="btn btn-primary button-note">
                    Leave a Review
                  </button>
                  <button
                    className="btn btn-outline-secondary button-msg"
                    onClick={() => {
                      router.push(`/user/user-message/3?coach_id=${completed.id}`)
                    }}
                  >
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
