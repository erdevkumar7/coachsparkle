"use client";
import { getUserProgressCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CoachingProgress({ initialProgress, token }) {
  const router = useRouter();
  const [getCoahcingProgress, setCoahcingProgress] = useState(initialProgress.data);
  const [currentPage, setCurrentPage] = useState(initialProgress.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialProgress.pagination.last_page);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const fetchPageData = async (page) => {
    const res = await getUserProgressCoachingClient(page, token);
    if (res?.data) {
      setCoahcingProgress(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

  const handleViewRequest = (rqst) => {
    console.log('item', rqst)
    setSelectedRequest(rqst);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  // console.log('getCoahcingProgress', getCoahcingProgress)
  return (
    <>
      <div className="mt-5 status-coaching-top">
        <div className="coaching-progress-status">
          <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
            <div>
              <h3>Coaching In Progress ({initialProgress.pagination.total < 10 ? `0${initialProgress.pagination.total}` : initialProgress.pagination.total})</h3>
            </div>
            {/* <div className="sorting-data d-flex align-items-center gap-2">
            <ExpandMoreOutlinedIcon />
          </div> */}
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
                      <button className="btn btn-primary button-note" onClick={() => handleViewRequest(session)}>
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
            </div>)}
        </div>
      </div>

      {showModal && selectedRequest && (
        <div className="request-modal-overlay">
          <div className="request-modal">
            <div className="request-modal-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Session Details</h5>
              <button className="request-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="request-modal-main-body">
              <div className="request-modal-body">
                <h6>1. Package Details</h6>
                <p><strong>Package Name:</strong> {selectedRequest?.package_title || "N/A"}</p>
                <p><strong>Session Start Date: </strong> {selectedRequest?.session_date_start || "N/A"}</p>
                <p><strong>Session Timing: </strong> {selectedRequest?.slot_time_start || "N/A"}</p>
              </div>
              <div className="request-modal-body">
                <h6>2. User Information</h6>
                <p><strong>User Name:</strong> {selectedRequest?.first_name} {selectedRequest?.last_name}</p>
                <p><strong>User Location:</strong> {selectedRequest?.country} </p>
                <p><strong>Preferred Contact Mode:</strong> Email / Phone </p>
              </div>
              <div className="request-modal-body">
                <h6>4. Session Status</h6>
                <p>
                  <strong>Status:</strong> {selectedRequest?.status || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
