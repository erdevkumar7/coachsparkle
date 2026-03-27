"use client";

import React, { useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import OnDemondCalendar from "@/components/OnDemondCalendar";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useRouter } from "next/navigation";

export default function OnDemondRequest({ onDemondRes = [], token = "", totalbooked } = {}) {
  const router = useRouter();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Hooks at top level
  const [requests, setRequests] = useState(onDemondRes || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); // optional if you have pagination
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
 const [showCalendar, setShowCalendar] = useState(false);
const [currentDate, setCurrentDate] = useState(new Date());

  const handleViewRequest = (req) => {
    setSelectedRequest(req);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleConfirmBooking = async () => {
  try {
    // ✅ agar user ne select nahi kiya to current date use ho
    const finalDate = currentDate
      ? new Date(currentDate)
      : new Date();

    const formattedDate = finalDate.toISOString().split("T")[0];

    const payload = {
      ondemondenquiryid: selectedRequest?.id,
      date: formattedDate,
    };

    const res = await fetch(`${apiUrl}/confirmOnDemondBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.status === "success") {
      toast.success("Booking Confirmed");
        setRequests((prev) =>
    prev.map((item) =>
      item.id === selectedRequest.id
        ? {
            ...item,
            status: 1,
            booking_date: formattedDate,
          }
        : item
    )
  );
      setShowModal(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
};

  const fetchPageData = (page) => {
    // Optional: Implement pagination fetch here
    setCurrentPage(page);
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
  };

  const [selectedDates, setSelectedDates] = useState([
  { date: new Date().toISOString().split("T")[0] }
]);

  return (
    <>
      <div className="mt-5">
        <div className="coaching-progress-status">
          <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
            <div>
              <h3>
                On-Demand Requests ({requests.length > 0 && requests.length < 10 ? `0${requests.length}` : requests.length})
              </h3>
            </div>
            <div
              className="sorting-data d-flex align-items-center gap-2"
              onClick={() => setIsOpen(prev => !prev)}
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
                {requests.map((req, index) => (
                  <div key={index} className="col-md-4 coaching-progress p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="session">Request ID: {req.id}</span>
                    </div>

                    <div className="mb-3 status-div">
                      <button className="border px-3 py-1 rounded-pill">
                        {req.status == 1 ? 'Confirmed' : 'Pending'}
                      </button>
                    </div>

                    <div className="d-flex align-items-start gap-2 mb-3 content">
                      <div>
                        <img
                          src={`${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                          alt="user"
                          className="rounded-circle"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                      </div>
                      <div>
                        <span className="fw-semibold d-block name">
                          {req.user_name} requested from {req.coach_name}
                        </span>
                        <span className="d-block time">{req.prefered_dt}</span>
                        <span className="d-block time">{req.booking_date}</span>
                        <img src="/coachsparkle/images/zoom.png" alt="platform" />
                      </div>
                    </div>

                    <div className="d-flex gap-3">
                      <button className="btn btn-primary button-note" onClick={() => handleViewRequest(req)}>
                        View Request
                      </button>
                      <button
                        className="btn btn-outline-secondary button-msg"
                        onClick={() => {
                          router.push(`/coach/messages/2?user_id=${req.user_id}`);
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
          )}
        </div>
      </div>

      {showModal && selectedRequest && (
        <div className="request-modal-overlay">
          <div className="request-modal">
            <div className="request-modal-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">On Demand Request Details</h5>
              <button className="request-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="request-modal-main-body">
              <div className="request-modal-body">
                <h6>1. Package Details</h6>
                {/* <p><strong>Package ID:</strong> {selectedRequest.package_id}</p> */}
                <p><strong>Package Name:</strong> {selectedRequest?.package?.title}</p>
                <p><strong>Preferred Date:</strong> {selectedRequest.prefered_dt}</p>
              </div>
              <div className="request-modal-body">
                <h6>2. User Information</h6>
                <p><strong>User Name:</strong> {selectedRequest.user_name}</p>
                <p><strong>Email:</strong> {selectedRequest.user_email}</p>
              </div>
              <div className="request-modal-body">
                <h6>3. Coach Information</h6>
                <p><strong>Coach Name:</strong> {selectedRequest.coach_name}</p>
              </div>
              <div className="request-modal-body">
                <h6>4. Session Status</h6>
                <p><strong>Status:</strong>  {selectedRequest.status == 1 ? 'Confirmed' : 'Pending'} ({selectedRequest.booking_date})</p>
              </div>
              <div className="request-modal-body">
                
                <label>
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    checked={showCalendar}
                    onChange={(e) => setShowCalendar(e.target.checked)}
                  />
                  Booking Calendar Show & Hide
                </label>
                <div className="calendar-panel p-4 flex-grow-1">
{showCalendar && (
  <>
    {totalbooked >= selectedRequest.package.booking_slots ? (
      
      // ❌ ERROR MESSAGE
      <div className="alert alert-danger mt-3">
        Booking slots full ho chuke hain ❌
      </div>

    ) : (
      
      // ✅ CALENDAR SHOW
      <div className="calendar-panel p-4 flex-grow-1">
        <OnDemondCalendar
          onDateSelect={handleDateSelect}
          currentDate={currentDate}
        />
      </div>

    )}
  </>
)}
                </div>
                <button className="btn btn-success d-block mt-3" onClick={handleConfirmBooking}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}