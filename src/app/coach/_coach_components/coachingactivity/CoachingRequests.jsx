'use client';
import { getUserPendingCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";

export default function CoachingRequests({ initialRequest, token }) {
  const router = useRouter();
  const [pendingRequest, setPendingRequest] = useState(initialRequest.data);
  const [currentPage, setCurrentPage] = useState(initialRequest.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialRequest.pagination.last_page);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Add items per page state

  dayjs.extend(relativeTime);

  function formatReceivedTime(createdAt) {
    const now = dayjs();
    const created = dayjs(createdAt);

    const diffInHours = now.diff(created, "hour");
    const diffInDays = now.diff(created, "day");

    if (diffInDays > 2) {
      return created.format("DD MMM YYYY"); // If more than 2 days, show date
    } else if (diffInHours >= 24) {
      return created.fromNow(); // e.g., "2 days ago"
    } else {
      return created.fromNow(); // e.g., "2 hours ago"
    }
  }

    useEffect(() => {
      fetchPageData(currentPage);
    }, [itemsPerPage]);


  const fetchPageData = async (page) => {
    const res = await getUserPendingCoachingClient(page, token, itemsPerPage);
    if (res?.data) {
      setPendingRequest(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

  const handleViewRequest = (rqst) => {
    setSelectedRequest(rqst);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

    // Add handler for items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // console.log('pendingRequest', pendingRequest)
  return (
    <>
      <div className="mt-5 status-coachings">
        <div className="coaching-status">
          <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
            <div>
              <h3>Coaching Requests ({initialRequest.request_count})</h3>
            </div>
            <div className="sorting-data d-flex align-items-center gap-2">
              <span>Sort By:</span>
              <select>
                <option>Most Recent</option>
              </select>
               <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
              </select>
              <Link href="#">Bulk Edit</Link>
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap py-4 px-4">
            <div className="row gap-4">
              {pendingRequest.map((rqst, indx) => (
                <div key={indx} className="col-md-4 coaching-content p-3">
                  {/* <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Request received</h4>
                    <MoreHorizOutlinedIcon sx={{ color: '#A9A9A9' }} />
                  </div> */}

                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill" style={{
                      backgroundColor: "#FFA500",
                      color: "#FFFFFF",
                      borderColor: "#FFA500",
                    }}>
                      New Coaching Request
                    </button>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div>
                      <img
                        src={rqst?.profile_image ||
                          `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                        }
                        alt="coachsparkle" className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">{rqst.first_name} {rqst.last_name}</span>
                      <span className="d-block location">{rqst.country}</span>
                      <span className="d-block time">
                        {/* Received 2 hours ago */}
                        Received {formatReceivedTime(rqst.created_at)}
                      </span>
                      <p className="mt-2 mb-0 note">{rqst.coaching_request_goal?.length > 30
                        ? rqst.coaching_request_goal?.slice(0, 30) + "..." : rqst.coaching_request_goal}</p>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note" onClick={() => handleViewRequest(rqst)}>View request</button>
                    <button className="btn btn-outline-secondary button-msg" onClick={() => {
                      router.push(`/coach/messages/2?user_id=${rqst.id}`);
                    }}>
                      Message
                    </button>
                  </div>
                </div>))}
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={fetchPageData}
              />
            </div>
          </div>
        </div>
      </div>


      {showModal && selectedRequest && (
        <div className="request-modal-overlay">
          <div className="request-modal">
            <div className="request-modal-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Coaching Request Details</h5>
              <button className="request-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="request-modal-main-body">
              <div className="request-modal-body">
                <h6>1. Coaching Details</h6>
                <p>
                  <strong>Type of Coaching:</strong> {selectedRequest?.coaching_category || "N/A"}
                </p>
                <p>
                  <strong>Sub Coaching Category:</strong> {selectedRequest?.coach_sub_category || "N/A"}
                </p>
                <p>
                  <strong>Preferred Mode of Delivery:</strong> {selectedRequest?.delivery_mode || "N/A"}
                </p>
                <p>
                  <strong>Location:</strong> {selectedRequest?.country || "N/A"}
                </p>
                <p>
                  <strong>Goal or Objective of Coaching/Learning:</strong> {selectedRequest?.coaching_request_goal || "N/A"}
                </p>
              </div>
              <div className="request-modal-body">
                <h6>2. Communication Preferences</h6>
                <p>
                  <strong>Language Preference:</strong> English, German
                </p>
                <p>
                  <strong>Preferred Communication Channel:</strong> Video Call
                </p>
              </div>
              <div className="request-modal-body">
                <h6>3. Additional Fields</h6>
                <p>
                  <strong>Target Age Group or Demographic:</strong> Adults
                </p>
                <p>
                  <strong>Preferred Coaching/Teaching Style:</strong> Free-Flow
                </p>
                <p>
                  <strong>Budget Range:</strong> (Not specified)
                </p>
                <p>
                  <strong>Preferred Schedule:</strong> (Not specified)
                </p>
                <p>
                  <strong>Gender Preference of Coach:</strong> Female
                </p>
                <p>
                  <strong>Coach Experience Level:</strong> Highly Experienced
                </p>
                <p>
                  <strong>Only Certified Coach:</strong> Yes
                </p>
                <p>
                  <strong>Urgency or Preferred Start Date:</strong> Flexible
                </p>
                <p>
                  <strong>Special Requirements (If Any):</strong> Optional
                </p>
              </div>
              <div className="request-modal-body">
                <h6>4. Contact Information</h6>
                <p>
                  <strong>Preferred Contact Mode:</strong> Email / Phone
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
