"use client";

import { getUserPendingCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";

export default function UserCoachingRequest({ initialRequest, token }) {
  const router = useRouter();
  const [pendingRequest, setPendingRequest] = useState(initialRequest.data);
  const [currentPage, setCurrentPage] = useState(initialRequest.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialRequest.pagination.last_page);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);

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
    console.log('item', rqst)
    setSelectedRequest(rqst);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // console.log('pendingRequest', pendingRequest)

  return (
    <>
      <div className="coaching-status">
        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
          <div>
            <h3>
              Pending Coaching ({initialRequest.request_count > 0 && initialRequest.request_count < 10 ? `0${initialRequest.request_count}` : initialRequest.request_count})
            </h3>
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
            <a href="#">Bulk Edit</a>
          </div>
        </div>

        <div className="d-flex justify-content-between flex-wrap py-4 px-4 pending-coaching-add">
          <div className="row gap-3 m-2 pending-coach-result">
            {pendingRequest.map((item, index) => (
              <div className="col-md-4 coaching-content p-3" key={index}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">{item.title}</h4>

                </div>

                <div className="mb-3 status-div">
                  <button
                    className={`border px-3 py-1 rounded-pill ${item.statusClass}`}
                  >
                    {/* {item.statusText} */}
                    Awaiting response
                  </button>
                </div>

                <div className="respond-add">
                  <img src={item.profile_image} alt="Coach Image" className="coach-img" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <div>
                    <p className="favourite-text-tittle">{item.first_name} {item.last_name}</p>
                    <p className="life-add-text">
                      {item.coach_type ? item.coach_type : item.coach_subtype}
                      {item.company_name && <> at <b>{item.company_name}</b></>}

                    </p>
                    <div className="star-add-pointer">
                      <i className="bi bi-star-fill"></i>
                      <p>{item.review_coach}</p>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 view-request">
                  <button className="btn btn-primary button-note" onClick={() => handleViewRequest(item)}>
                    {/* {item.primaryAction} */}
                    View Request
                  </button>
                  <button className="btn btn-outline-secondary button-msg"
                    onClick={() => {
                      router.push(`/user/user-message/2?coach_id=${item.id}`)
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
                  <strong>Type of Coaching:</strong> {selectedRequest?.coach_type || "N/A"}
                </p>
                <p>
                  <strong>Sub Coaching Category:</strong> {selectedRequest?.coach_subtype || "N/A"}
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
                  <strong>Language Preference:</strong>{" "}
                  {selectedRequest?.languages?.length > 0
                    ? selectedRequest.languages.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <strong>Preferred Communication Channel:</strong> {selectedRequest?.prefered_communication_channel || "N/A"}
                </p>
              </div>
              <div className="request-modal-body">
                <h6>3. Additional Fields</h6>
                <p>
                  <strong>Target Age Group or Demographic:</strong> {selectedRequest?.target_age_group || "N/A"}
                </p>
                <p>
                  <strong>Preferred Coaching/Teaching Style:</strong> {selectedRequest?.coaching_category || "N/A"}
                </p>
                <p>
                  <strong>Budget Range:</strong> {selectedRequest?.budget_range || "(Not specified)"}
                </p>
                <p>
                  <strong>Preferred Schedule:</strong> (Not specified)
                </p>
                <p>
                  <strong>Gender Preference of Coach:</strong> {" "}
                  {selectedRequest?.gender_prefernece === 1 ? "Male"
                    : selectedRequest?.gender_prefernece === 2 ? "Female"
                      : selectedRequest.gender_prefernece === 3 ? "Other" : "(Not specified)"
                  }
                </p>
                <p>
                  <strong>Coach Experience Level:</strong> {selectedRequest?.experience_level || "N/A"}
                </p>
                <p>
                  <strong>Only Certified Coach:</strong> {selectedRequest?.certified_coach ? "Yes" : "(Not specified)"}
                </p>
                <p>
                  <strong>Urgency or Preferred Start Date:</strong> {selectedRequest?.prefered_urgency_date || "N/A"}
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
