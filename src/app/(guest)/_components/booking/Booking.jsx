"use client";
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import { useRouter } from "next/navigation";

const mockSlots = {
  "2025-08-04": ["3:00pm", "4:00pm"],
  "2025-08-05": [
    "09:00am",
    "09:30am",
    "10:00am",
    "10:30am",
    "11:00am",
  ],
  "2025-08-06": ["1:00pm", "2:00pm"],
  "2025-08-08": ["09:00am", "10:00am", "11:00am"],
  "2026-01-02": ["12:00pm", "12:30pm"],

};

// const mockSlots = {
//   "" : []
// }

export default function Booking({ coach_id, package_id, packageData }) {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  console.log('packageData', packageData)

  useEffect(() => {
    const key = selectedDate.toLocaleDateString("en-CA");
    setTimeSlots(mockSlots[key] || []);
    setSelectedTime(null);
  }, [selectedDate]);

  const getActiveDays = (year, month) => {
    const active = [];

    Object.keys(mockSlots).forEach((dateStr) => {
      const date = new Date(dateStr);
      if (date.getFullYear() === year && date.getMonth() === month) {
        active.push(date.getDate());
      }
    });

    return active;
  };

  return (
    <div className="booking-container mt-5 mb-5 p-0">
      <div className="booking-card d-flex">
        <div className="left-panel px-4 pt-4 pb-3">
          <div className="position-relative mb-3">
            <div className="top-divider-line"></div>
            <img
              src="/coachsparkle/images/coach-list-img-one.png"
              alt="Coach"
              className="rounded-circle top-0 translate-middle-x profile-img"
            />
          </div>

          <div className="fw-semibold mb-2 title">
            {packageData?.coach_profile?.first_name} {packageData?.coach_profile?.last_name}
          </div>
          <div className="fw-bold mb-1 package-name">
            {packageData?.coach_profile?.session_title}
          </div>
          <div className="small text-muted package-desc">
            {packageData?.coach_profile?.short_description}
          </div>

          <div className="session-info">
            <ul className="list-unstyled small text-muted">
              <li className="d-flex align-items-start">
                <i className="bi bi-receipt me-2 pkg-icons"></i>
                <span>{packageData?.coach_profile?.session_price}</span>
              </li>
              {packageData?.coach_profile?.session_count &&
                <li className="d-flex align-items-start">
                  <i className="bi bi-people me-2 pkg-icons"></i>
                  <span>{packageData?.coach_profile?.session_count} Session</span>
                </li>}

              {packageData?.coach_profile?.session_duration && <li className="d-flex align-items-start">
                <i className="bi bi-clock me-2 pkg-icons"></i>
                <span>{packageData?.coach_profile?.session_duration} min / Session</span>
              </li>}

              <li className="d-flex align-items-start">
                <i className="bi bi-camera-video me-2 pkg-icons"></i>
                <span>Zoom</span>
              </li>

              <li className="d-flex align-items-start">
                <i className="bi bi-x-circle me-2 pkg-icons"></i>
                <span> Flexible - Full refund if canceled ≥ 24 hours before session</span>
              </li>
              <li className="d-flex align-items-start">
                <i className="bi bi-calendar-check me-2 pkg-icons"></i>
                <span>Use within 6 weeks from first session</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="calendar-panel p-4 flex-grow-1">
          <Calendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            getActiveDays={getActiveDays}
          />
        </div>

        <div className="time-panel p-4">
          <div className="inner-panel">
            <div className="fw-semibold mb-3">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="time-slot-scroll">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot, idx) => (
                  <div key={idx} className="mb-2">
                    {selectedTime === slot ? (
                      <div className="d-flex">
                        <button
                          className="time-slot-btn selected flex-fill me-2"
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </button>
                        <button
                          className="btn btn-primary btn-sm confirm-btn flex-fill"
                          onClick={() => setShowConfirmation(true)}
                        >
                          Confirm
                        </button>
                        {showConfirmation && (
                          <>
                            <div className="modal d-block booking-confirm-modal">
                              <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content rounded-4 overflow-hidden">
                                  <div className="modal-header text-white flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-2">
                                      <h5 className="modal-title mb-0">
                                        <span className="me-2 fs-4">✅</span>
                                        Booking Confirmed Breakthrough Package with Sarah Lee
                                      </h5>
                                    </div>
                                  </div>

                                  <div className="modal-body">
                                    <p>
                                      Hi Emma Rosen,
                                      <br />
                                      Thank you for booking the{" "}
                                      <strong>
                                        Breakthrough Package (3 Sessions)
                                      </strong>{" "}
                                      with Sarah Lee. Your journey toward
                                      clarity and growth begins now!
                                    </p>

                                    <h6 className="fw-bold mt-4">
                                      Package Details:
                                    </h6>
                                    <ul className="list-unstyled small">
                                      <li>
                                        <strong>Coach:</strong> Sarah Lee
                                      </li>
                                      <li>
                                        <strong>Dates:</strong> 15/08/2025 -
                                        10/09/2025 (to be confirmed)
                                      </li>
                                      <li>
                                        <strong>Number of Sessions:</strong> 3
                                      </li>
                                      <li>
                                        <strong>Session Format:</strong> Online
                                        video (Zoom)
                                      </li>
                                      <li>
                                        <strong>Weekly Use:</strong> Use all 3
                                        sessions within 6 weeks
                                      </li>
                                      <li>
                                        <strong>Policy:</strong> One free
                                        reschedule per session
                                      </li>
                                      <li>
                                        <strong>Notes:</strong> Intake form +
                                        session worksheet + voice note support
                                      </li>
                                    </ul>

                                    <h6 className="fw-bold mt-4">
                                      Zoom Meeting Link
                                    </h6>
                                    <p className="small">
                                      Please join your sessions at the scheduled
                                      time using the link below:
                                      <br />
                                      <a href="#" className="link">Join Zoom Meeting</a>
                                      <br />
                                      (The same link will remain for all
                                      sessions unless otherwise updated by your
                                      coach.)
                                    </p>

                                    <h6 className="fw-bold mt-4">
                                      What’s Included
                                    </h6>
                                    <ul className="small">
                                      <li>
                                        Personalized coaching worksheets
                                      </li>
                                      <li>
                                        Voice note support between sessions
                                        (Mon–Fri)
                                      </li>
                                      <li>
                                        One free reschedule per session
                                        (24-hour notice required)
                                      </li>
                                    </ul>

                                    <h6 className="fw-bold mt-4">Next Steps</h6>
                                    <p className="small">
                                      Sarah will be in touch shortly to schedule
                                      your first session and share prep
                                      materials. You can also message her
                                      directly from your dashboard.
                                    </p>
                                  </div>

                                  <div className="modal-footer justify-content-start gap-3">
                                    <button
                                      className="btn msg-btn"
                                      onClick={() => {
                                        setShowConfirmation(false);
                                        router.push("/send-message")
                                      }}
                                    >
                                      Message Sarah <i className="bi bi-arrow-right"></i>
                                    </button>
                                    <button className="btn btn-primary">
                                      View Bookings <i className="bi bi-arrow-right"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <button
                        className="time-slot-btn w-100"
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-muted small">No slots available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
