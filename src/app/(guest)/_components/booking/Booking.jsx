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
  const [currentDate, setCurrentDate] = useState(null); // For calendar display

  // console.log("packageData", packageData);

  // useEffect(() => {
  //   if (!package_id) return;

  //   fetchAvailability(package_id)
  //     .then((data) => {
  //       // Transform API array into an object like { "2025-08-04": ["09:00", "09:30"], ... }
  //       const availabilityMap = {};
  //       if (Array.isArray(data.availability)) {
  //         data.availability.forEach((item) => {
  //           availabilityMap[item.date] = item.available_times;
  //         });
  //       }

  //       setAvailability(availabilityMap);
  //       setPackageData(data);

  //       // If there are available dates, set the first one as current
  //       const availableDates = Object.keys(availabilityMap);
  //       if (availableDates.length > 0) {
  //         setCurrentDate(new Date(availableDates[0]));
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching availability:", err);
  //       toast.error("Failed to load availability");
  //     });
  // }, [package_id]);

  // useEffect(() => {
  //   if (!currentDate) return;
  //   const key = currentDate.toISOString().slice(0, 10);
  //   setTimeSlots(availability[key] || []);
  // }, [currentDate, availability]);

  // const getActiveDays = (year, month) => {
  //   return Object.keys(availability).reduce((active, dateStr) => {
  //     const date = new Date(dateStr);
  //     if (date.getFullYear() === year && date.getMonth() === month) {
  //       active.push(date.getDate());
  //     }
  //     return active;
  //   }, []);
  // };

  // const handleDateSelect = (date) => {
  //   setCurrentDate(date);
  // };

  // const handleTimeSelect = (time) => {
  //   if (!currentDate) return;

  //   const dateKey = currentDate.toISOString().slice(0, 10);

  //   // Check if this date is already selected
  //   const existingIndex = selectedDates.findIndex(
  //     item => item.date.toISOString().slice(0, 10) === dateKey
  //   );

  //   if (existingIndex >= 0) {
  //     // Update time for existing date
  //     const updatedDates = [...selectedDates];
  //     updatedDates[existingIndex].time = time;
  //     setSelectedDates(updatedDates);
  //   } else {
  //     // Add new date with time
  //     setSelectedDates([...selectedDates, { date: new Date(currentDate), time }]);
  //   }

  //   toast.success("Date and time added!");
  // };

  // const removeSelectedDate = (dateToRemove) => {
  //   setSelectedDates(selectedDates.filter(
  //     item => item.date.toISOString() !== dateToRemove.date.toISOString()
  //   ));
  // };


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

  //   // Prepare payload according to API requirements
  //   const payload = {
  //     "package_id": packageData?.coach_profile?.package_id,
  //     "coach_id": packageData?.coach_profile?.coach_id,
  //     "slot_date_time": selectedDates.map(selected => [
  //       selected.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
  //       selected.time
  //     ])
  //   };

  //   try {
  //     // Submit all selected dates in a single API call
  //     const response = await PackageBookingAndStripePayment(payload, token);

  //     if (response.data.success) {
  //       // toast.success("Booking confirmed!");

  //       // Redirect to Stripe checkout
  //       if (response.data.redirect_url) {
  //         window.location.href = response.data.redirect_url;
  //       } else {        
  //         setSelectedDates([]); // Clear selections after successful booking
  //       }
  //     } else {
  //       toast.error(response.data.message || "Booking failed. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error submitting package:", err);
  //     toast.error("Network or server error.");
  //   }
  // };



  // Load selected dates from sessionStorage on component mount
  useEffect(() => {
    const savedSelections = sessionStorage.getItem(`booking_selections_${package_id}`);
    if (savedSelections) {
      try {
        const parsedSelections = JSON.parse(savedSelections);

        // Filter out expired dates (older than today)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const validSelections = parsedSelections.filter(item => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= currentDate;
        });

        // Convert date strings back to Date objects
        const selectionsWithDates = validSelections.map(item => ({
          ...item,
          date: new Date(item.date)
        }));

        setSelectedDates(selectionsWithDates);

        // Update storage with only valid selections
        if (validSelections.length !== parsedSelections.length) {
          sessionStorage.setItem(
            `booking_selections_${package_id}`,
            JSON.stringify(validSelections)
          );
        }
      } catch (error) {
        console.error("Error parsing saved selections:", error);
      }
    }
  }, [package_id]);

  // Save selected dates to sessionStorage whenever they change
  useEffect(() => {
    if (selectedDates.length > 0) {
      // Convert Date objects to strings for storage
      const selectionsForStorage = selectedDates.map(item => ({
        ...item,
        date: item.date.toISOString()
      }));
      sessionStorage.setItem(
        `booking_selections_${package_id}`,
        JSON.stringify(selectionsForStorage)
      );
    } else {
      sessionStorage.removeItem(`booking_selections_${package_id}`);
    }
  }, [selectedDates, package_id]);

  // Clean up on component unmount if needed
  useEffect(() => {
    return () => {
      // Optional: Only remove if you want to clear on page navigation
      // sessionStorage.removeItem(`booking_selections_${package_id}`);
    };
  }, [package_id]);

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
    const updatedDates = selectedDates.filter(
      item => item.date.toISOString() !== dateToRemove.date.toISOString()
    );
    setSelectedDates(updatedDates);
  };

  const handleBookingSubmit = async () => {
    if (selectedDates.length === 0) {
      toast.error("Please select at least one date and time");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      // Save selections before redirecting to login
      const selectionsForStorage = selectedDates.map(item => ({
        ...item,
        date: item.date.toISOString()
      }));
      sessionStorage.setItem(
        `booking_selections_${package_id}`,
        JSON.stringify(selectionsForStorage)
      );

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
        // Clear saved selections after successful booking
        sessionStorage.removeItem(`booking_selections_${package_id}`);

        // Redirect to Stripe checkout
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else {
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
            <h6 className="fw-semibold mb-2">Selected Dates & Times</h6>
            <div className="selected-dates add-selected-date">
              <div className="selected-dates-section add-selected-date-inner">
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
                    className="btn btn-primary w-100 book-selected-date"
                    onClick={handleBookingSubmit}
                  >
                    Book Selected Dates ({selectedDates.length})
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}