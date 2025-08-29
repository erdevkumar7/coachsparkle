"use client";
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import { useRouter } from "next/navigation";
import { fetchAvailability } from "@/app/api/guest";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { PackageBookingAndStripePayment, PackageBookingSubmit } from "@/app/api/packages";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Link from "next/link";

export default function Booking({ coach_id, package_id, packageData: initialPackageData }) {
  const router = useRouter();
  const [packageData, setPackageData] = useState(initialPackageData);
  const [selectedDates, setSelectedDates] = useState([]); // Array of {date: Date, time: string}
  const [availability, setAvailability] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);
  const [currentDate, setCurrentDate] = useState(null); // For calendar display

  console.log("packageData", packageData);

  useEffect(() => {
    if (!package_id) return;

    fetchAvailability(package_id)
      .then((data) => {
        // Transform API array into an object like { "2025-08-04": ["09:00", "09:30"], ... }
        const availabilityMap = {};
        if (Array.isArray(data.availability)) {
          data.availability.forEach((item) => {
            availabilityMap[item.date] = item.available_times;
          });
        }

        setAvailability(availabilityMap);
        setPackageData(data);

        // If there are available dates, set the first one as current
        const availableDates = Object.keys(availabilityMap);
        if (availableDates.length > 0) {
          setCurrentDate(new Date(availableDates[0]));
        }
      })
      .catch((err) => {
        console.error("Error fetching availability:", err);
        toast.error("Failed to load availability");
      });
  }, [package_id]);

  useEffect(() => {
    if (!currentDate) return;
    const key = currentDate.toISOString().slice(0, 10);
    setTimeSlots(availability[key] || []);
  }, [currentDate, availability]);

  const getActiveDays = (year, month) => {
    return Object.keys(availability).reduce((active, dateStr) => {
      const date = new Date(dateStr);
      if (date.getFullYear() === year && date.getMonth() === month) {
        active.push(date.getDate());
      }
      return active;
    }, []);
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
  };

  const handleTimeSelect = (time) => {
    if (!currentDate) return;

    const dateKey = currentDate.toISOString().slice(0, 10);

    // Check if this date is already selected
    const existingIndex = selectedDates.findIndex(
      item => item.date.toISOString().slice(0, 10) === dateKey
    );

    if (existingIndex >= 0) {
      // Update time for existing date
      const updatedDates = [...selectedDates];
      updatedDates[existingIndex].time = time;
      setSelectedDates(updatedDates);
    } else {
      // Add new date with time
      setSelectedDates([...selectedDates, { date: new Date(currentDate), time }]);
    }

    toast.success("Date and time added!");
  };

  const removeSelectedDate = (dateToRemove) => {
    setSelectedDates(selectedDates.filter(
      item => item.date.toISOString() !== dateToRemove.date.toISOString()
    ));
  };

  // const handleBookingSubmit = async () => {    
  //   if (selectedDates.length === 0) {
  //     toast.error("Please select at least one date and time");
  //     return;
  //   }

  //   const token = Cookies.get("token");
  //   if (!token) {
  //     router.push(`/login?redirect=/coach-detail/${packageData?.coach_profile?.coach_id}/package/${packageData?.coach_profile?.package_id}/booking`)
  //     sessionStorage.setItem('role', 2);
  //     return;
  //   }

  //   function calculateSlotEnd(startTime, durationMinutes) {
  //     const [hours, minutes] = startTime.split(":").map(Number);
  //     const date = new Date();
  //     date.setHours(hours);
  //     date.setMinutes(minutes);
  //     date.setSeconds(0);
  //     date.setMilliseconds(0);

  //     date.setMinutes(date.getMinutes() + durationMinutes); // Add duration

  //     const endHours = String(date.getHours()).padStart(2, "0");
  //     const endMinutes = String(date.getMinutes()).padStart(2, "0");

  //     return `${endHours}:${endMinutes}`;
  //   }

  //   // Prepare payload for multiple dates
  //   const payloads = selectedDates.map(selected => {
  //     const slot_time_end = calculateSlotEnd(selected.time, packageData?.coach_profile?.session_duration);

  //     return {
  //       "package_id": packageData?.coach_profile?.package_id,
  //       "coach_id": packageData?.coach_profile?.coach_id,
  //       "slot_time_start": selected.time,
  //       "slot_time_end": slot_time_end,
  //       "session_date": selected.date.toISOString().split('T')[0],
  //       "amount": packageData?.coach_profile?.session_price
  //     };
  //   });

  //   try {
  //     // Submit all selected dates (you might need to adjust your API to handle multiple bookings)
  //     const responses = await Promise.all(
  //       payloads.map(payload => PackageBookingAndStripePayment(payload, token))
  //     );

  //     const allSuccess = responses.every(response => response.data.status);

  //     if (allSuccess) {
  //       toast.success("All bookings confirmed!");
  //       setConfirmedBookingData({
  //         bookings: responses.map(r => r.data.data)
  //       });
  //       setShowConfirmation(true);
  //       setSelectedDates([]); // Clear selections after successful booking
  //     } else {
  //       toast.error("Some bookings failed. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error submitting package:", err);
  //     toast.error("Network or server error.");
  //   }
  // };


  const handleBookingSubmit = async () => {
    if (selectedDates.length === 0) {
      toast.error("Please select at least one date and time");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      router.push(`/login?redirect=/coach-detail/${packageData?.coach_profile?.coach_id}/package/${packageData?.coach_profile?.package_id}/booking`)
      sessionStorage.setItem('role', 2);
      return;
    }

    // Prepare payload according to API requirements
    const payload = {
      "package_id": packageData?.coach_profile?.package_id,
      "coach_id": packageData?.coach_profile?.coach_id,
      "slot_date_time": selectedDates.map(selected => [
        selected.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        selected.time
      ])
    };

    try {
      // Submit all selected dates in a single API call
      const response = await PackageBookingAndStripePayment(payload, token);

      if (response.data.success) {
        // toast.success("Booking confirmed!");

        // Redirect to Stripe checkout
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else {
          setConfirmedBookingData({
            bookings: response.data.data || []
          });
          setShowConfirmation(true);
          setSelectedDates([]); // Clear selections after successful booking
        }
      } else {
        toast.error(response.data.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting package:", err);
      toast.error("Network or server error.");
    }
  };
  return (
    <div className="booking-container mt-5 mb-5 p-0">
      <div className="booking-card d-flex">
        <div className="left-panel px-4 pt-4 pb-3">
          <div className="position-relative mb-3">
            <div className="top-divider-line"></div>
            <img
              src={packageData?.coach_profile?.profile_image ? packageData?.coach_profile?.profile_image : `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
              alt="Coach"
              className="rounded-circle top-0 translate-middle-x profile-img"
            />
          </div>

          <div className="fw-semibold mb-2 title">
            {packageData?.coach_profile?.first_name}{" "}
            {packageData?.coach_profile?.last_name}
          </div>
          <div className="fw-bold mb-1 package-name">
            {packageData?.coach_profile?.session_title}
          </div>
          <div className="small text-muted package-desc">
            {packageData?.coach_profile?.short_description}
          </div>

          <div className="session-info">
            <ul className="list-unstyled small text-muted">
              {packageData?.coach_profile?.session_price && <li className="d-flex align-items-start">
                <i className="bi bi-receipt me-2 pkg-icons"></i>
                <span>{packageData?.coach_profile?.session_price} {packageData?.coach_profile?.price_model} {packageData?.coach_profile?.currency}</span>
              </li>}
              {packageData?.coach_profile?.session_count && (
                <li className="d-flex align-items-start">
                  <i className="bi bi-people me-2 pkg-icons"></i>
                  <span>
                    {packageData?.coach_profile?.session_count} Session
                  </span>
                </li>
              )}

              {packageData?.coach_profile?.session_duration && (
                <li className="d-flex align-items-start">
                  <i className="bi bi-clock me-2 pkg-icons"></i>
                  <span>
                    {packageData?.coach_profile?.session_duration} min / Session
                  </span>
                </li>
              )}

              <li className="d-flex align-items-start">
                <i className="bi bi-camera-video me-2 pkg-icons"></i>
                <span>Zoom</span>
              </li>

              {packageData?.coach_profile?.cancellation_policy && <li className="d-flex align-items-start">
                <i className="bi bi-x-circle me-2 pkg-icons"></i>
                <span>
                  {" "}
                  {packageData?.coach_profile?.cancellation_policy}
                </span>
              </li>}
              <li className="d-flex align-items-start">
                <i className="bi bi-calendar-check me-2 pkg-icons"></i>
                <span>Use within 6 weeks from first session</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="calendar-panel p-4 flex-grow-1">
          {currentDate && (
            <Calendar
              currentDate={currentDate}
              onDateSelect={handleDateSelect}
              getActiveDays={getActiveDays}
              selectedDates={selectedDates.map(item => item.date)}
            />
          )}
        </div>

        <div className="time-panel p-4">
          <div className="inner-panel">
            <div className="fw-semibold mb-3">
              {currentDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="time-slot-scroll mb-3">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot, idx) => (
                  <div key={idx} className="mb-2">
                    <button
                      className="time-slot-btn w-100"
                      onClick={() => handleTimeSelect(slot)}
                    >
                      {slot}
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-muted small">No slots available</div>
              )}
            </div>

            {/* Selected dates section */}
            <div className="selected-dates-section">
              <h6 className="fw-semibold mb-2">Selected Dates & Times</h6>
              {selectedDates.length === 0 ? (
                <div className="text-muted small">No dates selected yet</div>
              ) : (
                <div className="selected-dates-list">
                  {selectedDates.map((selected, index) => (
                    <div key={index} className="selected-date-item d-flex align-items-center justify-content-between mb-2 p-2 bg-light rounded">
                      <div>
                        <span className="fw-medium">
                          {selected.date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="ms-2">{selected.time}</span>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeSelectedDate(selected)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Book button */}
            {selectedDates.length > 0 && (
              <div className="mt-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleBookingSubmit}
                >
                  Book Selected Dates ({selectedDates.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmation && !confirmedBookingData?.redirect_url && (
        <div className="modal d-block booking-confirm-modal">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 overflow-hidden">
              <div className="modal-header text-white flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <h5 className="modal-title mb-0">
                    <span className="me-2 fs-4">✅</span>
                    Booking Confirmed {packageData?.coach_profile?.session_title} with {packageData?.coach_profile?.first_name} {packageData?.coach_profile?.last_name}
                  </h5>
                </div>
              </div>

              <div className="modal-body">
                <p>
                  Hi {confirmedBookingData?.bookings?.[0]?.user_details?.first_name} {confirmedBookingData?.bookings?.[0]?.user_details?.last_name},
                  <br />
                  Thank you for booking the{" "}
                  <strong>
                    {packageData?.coach_profile?.session_title}
                  </strong>{" "}
                  with {packageData?.coach_profile?.first_name} {packageData?.coach_profile?.last_name}. Your journey toward
                  clarity and growth begins now!
                </p>

                <h6 className="fw-bold mt-4">
                  Booking Details:
                </h6>
                <ul className="list-unstyled small">
                  <li>
                    <strong>Coach:</strong> {packageData?.coach_profile?.first_name} {packageData?.coach_profile?.last_name}
                  </li>
                  <li>
                    <strong>Number of Sessions:</strong> {selectedDates.length}
                  </li>
                  <li>
                    <strong>Scheduled Dates:</strong>
                    <ul>
                      {confirmedBookingData?.bookings?.map((booking, index) => (
                        <li key={index}>
                          {booking.session_date} at {booking.slot_time_start}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <strong>Session Format:</strong> {packageData?.coach_profile?.delivery_mode}
                  </li>
                  <li>
                    <strong>Policy:</strong> {packageData?.coach_profile?.cancellation_policy}
                  </li>
                </ul>

                {packageData?.coach_profile?.delivery_mode_detail &&
                  <>
                    <h6 className="fw-bold mt-4">
                      Zoom Meeting/Video Link
                    </h6>
                    <p className="small">
                      Please join your sessions at the scheduled
                      time using the link below:
                      <br />
                      <Link href={packageData?.coach_profile?.delivery_mode_detail} className="link" target="blank">
                        Join Zoom/Video Meeting
                      </Link>
                      <br />
                      (The same link will remain for all
                      sessions unless otherwise updated by your
                      coach.)
                    </p>
                  </>}

                <h6 className="fw-bold mt-4">
                  What's Included
                </h6>
                <ul className="small">
                  {packageData?.coach_profile?.price_model &&
                    <li>{packageData?.coach_profile?.price_model}</li>}
                  {packageData?.coach_profile?.rescheduling_policy &&
                    <li>{packageData?.coach_profile?.rescheduling_policy}</li>}
                </ul>

                <h6 className="fw-bold mt-4">About Package</h6>
                <p className="small">
                  {packageData?.coach_profile?.short_description}
                </p>
              </div>

              <div className="modal-footer justify-content-start gap-3">
                <button
                  className="btn msg-btn"
                  onClick={() => {
                    setShowConfirmation(false);
                    router.push("/send-message");
                  }}
                >
                  Message {packageData?.coach_profile?.first_name}{" "}
                  <i className="bi bi-arrow-right"></i>
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowConfirmation(false);
                  }}>
                  Close{" "}
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}