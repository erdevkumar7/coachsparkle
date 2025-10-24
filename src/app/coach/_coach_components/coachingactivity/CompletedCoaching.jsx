"use client";
import { getUserCompletedCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompletedCoaching({ initialCompleted, token }) {
  const router = useRouter();
  const [getCompleted, setCompleted] = useState(initialCompleted.data);
  const [currentPage, setCurrentPage] = useState(initialCompleted.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialCompleted.pagination.last_page);
  const [isOpen, setIsOpen] = useState(true);

  const fetchPageData = async (page) => {
    const res = await getUserCompletedCoachingClient(page, token);
    if (res?.data) {
      setCompleted(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

  return (
    <div className="mt-5 status-complete">
      <div className="completed-status">
        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
          <div>
            <h3>Completed Coaching ({initialCompleted.pagination.total < 10 ? `0${initialCompleted.pagination.total}` : initialCompleted.pagination.total})</h3>
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
          <div className="d-flex justify-content-between flex-wrap py-4 px-4 inner-completed-status">
            <div className="row gap-4">
              {getCompleted.map((completed, index) => (
                <div className="col-md-4 completed p-3" key={index}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    {/* <h4 className="mb-0">{completed.heading}</h4> */}
                  </div>

                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">{completed.status}</button>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3 content">
                    <div>
                      <img
                        src={completed?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                        alt="User"
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        {/* {completed.name} */}
                        {completed.package_title?.slice(0, 20)} With {completed.first_name} {completed.last_name}
                      </span>
                      <span className="d-block time">Completed {completed.session_date_end}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note">Request Review</button>
                    <button
                      className="btn btn-outline-secondary button-msg"
                      onClick={() => {
                        router.push(`/coach/messages/1?user_id=${completed.id}`);
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
  );
}