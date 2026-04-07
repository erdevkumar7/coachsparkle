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

const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
 const [showCalendar, setShowCalendar] = useState(false);
const [currentDate, setCurrentDate] = useState(new Date());
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [selectedDate, setSelectedDate] = useState(
  formatDate(new Date()) // default today
);
const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

// ✅ Time: HH:mm:ss → HH:mm
const formatDisplayTime = (timeStr) => {
  if (!timeStr) return "";

  return timeStr.slice(0, 5);
};

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
    // ✅ Date
    const finalDate = currentDate
      ? new Date(currentDate)
      : new Date();

    const formattedDate = finalDate.toISOString().split("T")[0];

    // ✅ VALIDATION (important)
    if (!startTime || !endTime) {
      toast.error("Please select start and end time");
      return;
    }

    const payload = {
      ondemondenquiryid: selectedRequest?.id,
      date: formattedDate,

      // ✅ ADD THESE
      start_time: startTime,
      end_time: endTime,

      // optional (recommended)
      start_datetime: `${formattedDate} ${startTime}`,
      end_datetime: `${formattedDate} ${endTime}`,
    };

    const res = await fetch(`${apiUrl}/confirmOnDemondBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
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

                // ✅ FIXED KEYS
                booking_start_time: startTime,
                booking_end_time: endTime,
              }
            : item
        )
      );
      setSelectedRequest((prev) => ({
        ...prev,
        status: 1,
        booking_date: formattedDate,
        booking_start_time: startTime,
        booking_end_time: endTime,
      }));
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
  }

const packageBookings = requests.filter(
  (item) => item.package_id === selectedRequest?.package_id
);
const bookedDates = (packageBookings || [])
  .map(item => item?.booking_date)
  .filter(Boolean);

const hasBooking = bookedDates.length > 0;

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
                        <span className="d-block time">
  {formatDisplayDate(req.booking_date)}{" "}
  {formatDisplayTime(req.booking_start_time)} to{" "}
  {formatDisplayTime(req.booking_end_time)}
</span>
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
                <p><strong>Status:</strong>  {selectedRequest.status == 1 ? 'Confirmed' : 'Pending'} (
  {formatDisplayDate(selectedRequest.booking_date)}{" "}
  {formatDisplayTime(selectedRequest.booking_start_time)} to{" "}
  {formatDisplayTime(selectedRequest.booking_end_time)}
)</p>
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
                        Booking slots are full ❌
                      </div>

                    ) : (
                      
                      // ✅ CALENDAR SHOW
                    <div style={{ display: "flex", gap: "20px" }}>
                      
                      {/* LEFT: Calendar */}
                      <div className="calendar-panel p-4">
                        <OnDemondCalendar
                          onDateSelect={handleDateSelect}
                          disabledDates={bookedDates}
                          currentDate={currentDate}
                        />
                      </div>

                      {/* RIGHT: Time Picker */}
                       {!hasBooking && ( 
                      <div className="time-panel">
                        
                        {selectedDate && (
                          <>
                            <h5>Start Time</h5>

                          <input
                            type="time"
                            value={startTime}
                            min={
                              selectedDate === formatDate(new Date())
                                ? new Date().toTimeString().slice(0, 5)
                                : "00:00"
                            }
                            onChange={(e) => {
                              const time = e.target.value;
                              setStartTime(time);
                            }}
                            style={{
                              width: "150px",
                              padding: "8px",
                              marginTop: "10px",
                            }}
                          />
                          </>
                        )}
                      </div>
                       )} 
                      {!hasBooking && (
                        <div className="time-panel">
                        {selectedDate && (
                          <>
                            <h5>End Time</h5>

                           <input
                            type="time"
                            value={endTime}
                            min={startTime || "00:00"} // ✅ important
                            onChange={(e) => {
                              const time = e.target.value;
                                if (time <= startTime) {
                                  toast.error("End time must be greater than start time");
                                  return;
                                }
                              setEndTime(time);
                            }}
                            style={{
                              width: "150px",
                              padding: "8px",
                              marginTop: "10px",
                            }}
                          />
                          </>
                        )}
                      </div>
                      )}
                    </div>

                    )}
                  </>
                )}
                </div>
                {!hasBooking && (

                  <button
                    className="btn btn-success d-block mt-3"
                    onClick={handleConfirmBooking}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}