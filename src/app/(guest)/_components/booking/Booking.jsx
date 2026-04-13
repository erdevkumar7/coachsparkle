"use client";
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAvailability } from "@/app/api/guest";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { PackageBookingAndStripePayment } from "@/app/api/packages";
import { FRONTEND_BASE_URL } from "@/utiles/config";

export default function Booking({
  userData,
  coach_id,
  package_id,
  packageData: initialPackageData,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReschedule = searchParams.get("reschedule") === "true";
  const originalBookingId = searchParams.get("booking_id");
  const packageBookedUserId = searchParams.get("user_id");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [packageData, setPackageData] = useState(initialPackageData);
  const [selectedDates, setSelectedDates] = useState([]);
  const [availability, setAvailability] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});
//   const availabilityMode =
//     packageData?.coach_profile?.availability?.length > 0
//       ? "range" // or "specific" depending on your business logic
//       : "ondemand";
const [availabilityMode, setAvailabilityMode] = useState(null);

  // onDemand
  const [errors, setErrors] = useState({
    username: "",
    useremail: "",
    prefered_dt: "",
  });
  const [onDemandForm, setOnDemandForm] = useState({
    username: "",
    useremail: "",
    prefered_dt: "",
  });

  const handleOnDemandChange = (e) => {
    const { name, value } = e.target;

    setOnDemandForm((prev) => ({
      ...prev,
      [name]: value,
    }));

     // remove error instantly when user types
  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
  };

  const validateOnDemandForm = () => {
    const newErrors = {};

    if (!onDemandForm.username.trim()) {
      newErrors.username = "Name is required";
    }

    if (!onDemandForm.useremail.trim()) {
      newErrors.useremail = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(onDemandForm.useremail)
    ) {
      newErrors.useremail = "Enter a valid email";
    }

    if (!onDemandForm.prefered_dt.trim()) {
      newErrors.prefered_dt = "Preferred date & time is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

//   ======


  const handleOnDemandSubmit = async (e) => {
    e.preventDefault(); // ✅ stops page refresh
    if (!validateOnDemandForm()) return;

      // ✅ get token (change key if your cookie name differs)
  const token = Cookies.get("token");

  // ✅ check user logged in or not
  if (!token) {
    toast.error("Please login first");
    return;
  }

    try {
      setIsProcessing(true);

      const coachid = parseInt(coach_id);
      const payload = {
         userid: userData.id, // ✅ FIXED (IMPORTANT)
      coachname: `${packageData?.coach_profile?.first_name || ""} ${
        packageData?.coach_profile?.last_name || ""
      }`.trim(),
      coach_id: coachid,
      package_id: packageData?.coach_profile?.package_id || null,
        // userid: onDemandForm.userid,
        //    user_id: userData.id,
        // userid: userData.id,
        username: onDemandForm.username,
        useremail: onDemandForm.useremail,
        prefered_dt: onDemandForm.prefered_dt,
      };


      // if (!onDemandForm.username || !onDemandForm.useremail) {
      //   toast.error("Please fill all fields");
      //   return;
      // }

      const response = await fetch(
        `${apiUrl}/on-demond-enquiry-process`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
               // ✅ send auth token
          Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Request submitted successfully ✅");

        // reset form
        setOnDemandForm({
          username: "",
          useremail: "",
          prefered_dt: "",
        });
        setErrors({});

        // Redirect to user message page
        router.push(`/user/user-message/2?coach_id=${payload.coach_id}`);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setIsProcessing(false);
    }
  };

if (!userData || !userData.id) {
  router.push("/login");
}

  if (!userData?.id) return null;

  useEffect(() => {
  if (!userData) return;

  setOnDemandForm((prev) => ({
    ...prev,
    username:
      `${userData?.first_name || ""} ${userData?.last_name || ""}`.trim(),
    useremail: userData?.email || "",
  }));
}, [userData]);

  //   useEffect(() => {
  //   if (!userData || !packageData?.coach_profile) return;

  //   setOnDemandForm((prev) => ({
  //     ...prev,
  //     userid: userData?.id || "",
  //     username:
  //       `${userData?.first_name || ""} ${userData?.last_name || ""}`.trim(),
  //     useremail: userData?.email || "",
  //     coachname:
  //       `${packageData?.coach_profile?.first_name || ""} ${
  //         packageData?.coach_profile?.last_name || ""
  //       }`.trim(),
  //   }));
  // }, [userData, packageData]);

  // =========

  // Load selected dates from sessionStorage on component mount
  useEffect(() => {
    const savedSelections = sessionStorage.getItem(
      `booking_selections_${package_id}`,
    );
    if (savedSelections) {
      try {
        const parsedSelections = JSON.parse(savedSelections);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const validSelections = parsedSelections.filter((item) => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= currentDate;
        });

        const selectionsWithDates = validSelections.map((item) => ({
          ...item,
          date: new Date(item.date),
        }));

        setSelectedDates(selectionsWithDates);

        if (validSelections.length !== parsedSelections.length) {
          sessionStorage.setItem(
            `booking_selections_${package_id}`,
            JSON.stringify(validSelections),
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
      const selectionsForStorage = selectedDates.map((item) => ({
        ...item,
        date: item.date.toISOString(),
      }));
      sessionStorage.setItem(
        `booking_selections_${package_id}`,
        JSON.stringify(selectionsForStorage),
      );
    } else {
      sessionStorage.removeItem(`booking_selections_${package_id}`);
    }
  }, [selectedDates, package_id]);

  // For reschedule mode: Limit to single session selection
  useEffect(() => {
    if (isReschedule && selectedDates.length > 1) {
      // Keep only the most recent selection
      setSelectedDates([selectedDates[selectedDates.length - 1]]);
      toast.info("Reschedule mode: Only one session can be selected");
    }
  }, [selectedDates, isReschedule]);

  // useEffect(() => {
  //   if (!package_id || availabilityMode === "ondemand") return;

  //   fetchAvailability(package_id)
  //     .then((data) => {
  //       const availabilityMap = {};
  //       if (Array.isArray(data.availability)) {
  //         data.availability.forEach((item) => {
  //           availabilityMap[item.date] = item.available_times;
  //         });
  //       }

  //       setAvailability(availabilityMap);
  //       setPackageData(data);

  //       const availableDates = Object.keys(availabilityMap);
  //       if (availableDates.length > 0) {
  //         setCurrentDate(new Date(availableDates[0]));
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching availability:", err);
  //       toast.error("Failed to load availability");
  //     });
  // }, [package_id, availabilityMode]);
 useEffect(() => {
  if (!package_id) return;

  fetchAvailability(package_id)
    .then((data) => {
      setPackageData(data);

      const availabilityMap = {};

      const ranges = data?.coach_profile?.["Date Range"] || [];
      const specificDates = data?.coach_profile?.["Specific Date"] || [];
      const slots = data?.coach_profile?.booked_slots || {};
      setBookedSlots(slots);
// =======================
// SPECIFIC DATE MODE
// =======================

if (specificDates.length > 0) {
  setAvailabilityMode("specificDate");

  specificDates.forEach((item) => {
    const dateKey = new Date(item.session_dates)
      .toISOString()
      .slice(0, 10);

    let slots = [];

    try {
      slots =
        typeof item.time_slots === "string"
          ? JSON.parse(item.time_slots)
          : item.time_slots;
    } catch {
      slots = [];
    }

    if (slots.length > 0) {
      availabilityMap[dateKey] = slots;
    }
  });

  setAvailability(availabilityMap);

  const availableDates = Object.keys(availabilityMap);

  if (availableDates.length > 0) {
    setCurrentDate(new Date(availableDates[0]));
  }

  return;
}
      // ✅ If no availability returned → ON DEMAND
      if (!ranges.length) {
        setAvailabilityMode("ondemand");
        return;
      }

      // otherwise calendar-based booking
      setAvailabilityMode("range");

      ranges.forEach((range) => {
        const start = new Date(range.start_date);
        const end = new Date(range.end_date);

        const weeklyRules = range.weekly_availability || [];

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const weekday = d
            .toLocaleDateString("en-US", { weekday: "long" })
            .toLowerCase();

          weeklyRules.forEach((rule) => {
            if (rule.days === weekday) {
              const dateKey = d.toISOString().slice(0, 10);

              const slots = JSON.parse(rule.time_slots || "[]");

              if (slots.length > 0) {
                availabilityMap[dateKey] = slots;
              }
            }
          });
        }
      });

      // ✅ If slots empty → fallback to ondemand
      if (Object.keys(availabilityMap).length === 0) {
        setAvailabilityMode("ondemand");
        return;
      }

      setAvailability(availabilityMap);

      const availableDates = Object.keys(availabilityMap);
      if (availableDates.length > 0) {
        setCurrentDate(new Date(availableDates[0]));
      }
    })
    .catch((err) => {
      console.error("Error fetching availability:", err);
      toast.error("Failed to load availability");

      // fallback safety
      setAvailabilityMode("ondemand");
    });
}, [package_id]);

  useEffect(() => {
    if (!currentDate) return;

    const key = currentDate.toISOString().slice(0, 10);
    const slots = availability[key] || [];

    slots.sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

    setTimeSlots(slots);
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
    // 🔥 1. Check if slot already booked (extra safety)
  if (isSlotBooked(currentDate, time)) {
    toast.error("This slot is already booked ❌");
    return;
  }

  // 🔥 2. Check package booking_slots limit
  if(packageData?.coach_profile?.availability?.id == 32){
    const maxSlots = packageData?.coach_profile?.booking_slots || 0;
    const totalbooking = packageData?.coach_profile?.total_booking || 0;
    if (totalbooking >= maxSlots) {
      toast.error("Slot booking limit reached for this package ❌");
      return;
    }
  }else if(packageData?.coach_profile?.availability?.id == 31){
    const totalBookingObj = packageData?.coach_profile?.total_booking || {};
    const bookingSlotsObj = packageData?.coach_profile?.booking_slots || {};

    const totalbooking = totalBookingObj[selectedDate] || 0;
    const maxSlots = bookingSlotsObj[selectedDate] || 0;
    if (totalbooking >= maxSlots) {
      toast.error("Slot booking limit reached for this date ❌");
      return;
    }
  }

    if (isReschedule) {
      // For reschedule: Only allow one session
      setSelectedDates([{ date: new Date(currentDate), time }]);
      toast.success("Reschedule date and time selected!");
    } else {
      // For normal booking: Allow multiple sessions
      const existingIndex = selectedDates.findIndex(
        (item) => item.date.toISOString().slice(0, 10) === dateKey,
      );

      if (existingIndex >= 0) {
        const updatedDates = [...selectedDates];
        updatedDates[existingIndex].time = time;
        setSelectedDates(updatedDates);
      } else {
        setSelectedDates([
          ...selectedDates,
          { date: new Date(currentDate), time },
        ]);
      }
      toast.success("Date and time added!");
    }
  };

  const removeSelectedDate = (dateToRemove) => {
    const updatedDates = selectedDates.filter(
      (item) => item.date.toISOString() !== dateToRemove.date.toISOString(),
    );
    setSelectedDates(updatedDates);
  };

  // Handle reschedule without payment using the existing API
  const handleReschedule = async () => {
    if (selectedDates.length === 0) {
      toast.error("Please select a date and time for rescheduling");
      return;
    }

    if (selectedDates.length > 1) {
      toast.error("Reschedule mode: Please select only one session");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      const selectionsForStorage = selectedDates.map((item) => ({
        ...item,
        date: item.date.toISOString(),
      }));
      sessionStorage.setItem(
        `booking_selections_${package_id}`,
        JSON.stringify(selectionsForStorage),
      );

      router.push(
        `/login?redirect=/coach-detail/${packageData?.coach_profile?.coach_id}/package/${packageData?.coach_profile?.package_id}/booking?reschedule=true&booking_id=${originalBookingId}`,
      );
      sessionStorage.setItem("role", 2);
      return;
    }

    setIsProcessing(true);

    // Prepare reschedule payload according to your specification

const formattedSessions = selectedDates.reduce((acc, item) => {
  const dateObj = new Date(item.date);

  const formattedDate = dateObj.toISOString().split('T')[0]; // "2026-03-18"

  acc[formattedDate] = item.time;
  return acc;
}, {});

    const payload = {
      user_id: packageBookedUserId,
      booking_id: originalBookingId,
      status: 0,
      slots: formattedSessions
      // session_date_start: selectedSession.date.toISOString().split("T")[0], // YYYY-MM-DD
      // slot_time_start: selectedSession.time,
    };

    try {
      // Use the same API endpoint but with different payload for reschedule
      // const response = await PackageBookingSubmit(payload, token);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookingRescheduleByUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const response = await res.json();

      if (response.success) {
        // Clear saved selections after successful reschedule
        sessionStorage.removeItem(`booking_selections_${package_id}`);

        toast.success("Session rescheduled successfully!");

        // Redirect back to calendar or booking page
        if (packageBookedUserId) {
          setTimeout(() => {
            router.push("/coach/coaching-activities");
          }, 500);
        } else {
          setTimeout(() => {
            router.push("/user/coaching-activities");
          }, 500);
        }
      } else {
        toast.error(response.message || "Reschedule failed. Please try again.");
      }
    } catch (err) {
      console.error("Error rescheduling:", err);
      toast.error("Network or server error.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Original booking function (for new bookings with payment)
  const handleBookingSubmit = async () => {
    if (selectedDates.length === 0) {
      toast.error("Please select at least one date and time");
      return;
    }

    if (userData.user_type == 3) {
      toast.error("You are not valid user");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      const selectionsForStorage = selectedDates.map((item) => ({
        ...item,
        date: item.date.toISOString(),
      }));
      sessionStorage.setItem(
        `booking_selections_${package_id}`,
        JSON.stringify(selectionsForStorage),
      );

      router.push(
        `/login?redirect=/coach-detail/${packageData?.coach_profile?.coach_id}/package/${packageData?.coach_profile?.package_id}/booking`,
      );
      sessionStorage.setItem("role", 2);
      return;
    }

    setIsProcessing(true);

    const payload = {
      package_id: packageData?.coach_profile?.package_id,
      coach_id: packageData?.coach_profile?.coach_id,
      slot_date_time: selectedDates.map((selected) => [
        selected.date.toISOString().split("T")[0],
        selected.time,
      ]),
    };

    try {
      const response = await PackageBookingAndStripePayment(payload, token);

      if (response.data.success) {
        sessionStorage.removeItem(`booking_selections_${package_id}`);
        console.log(response.data);
        if (response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        } else {
          setSelectedDates([]);
        }
      } else {
        toast.error(
          response.data.message || "Booking failed. Please try again.",
        );
      }
    } catch (err) {
      console.error("Error submitting package:", err);
      toast.error("Network or server error.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Determine which function to call based on reschedule mode
  const handleSubmit = () => {
    if (isReschedule) {
      handleReschedule();
    } else {
      handleBookingSubmit();
    }
  };


// ✅ SLOT BOOK CHECK FUNCTION (FINAL)
const isSlotBooked = (date, time) => {
  if (!bookedSlots || Object.keys(bookedSlots).length === 0) return false;

  const dt = new Date(date);

  const formattedDate =
    dt.getFullYear() +
    "-" +
    String(dt.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dt.getDate()).padStart(2, "0");

  const bookedTimes = bookedSlots[formattedDate] || [];

  // 🔥 normalize time (handles HH:mm, HH:mm:ss, AM/PM)
  const toMinutes = (t) => {
    if (!t) return -1;

    t = t.toString().trim();

    // 👉 handle AM/PM
    if (t.toLowerCase().includes("am") || t.toLowerCase().includes("pm")) {
      const [timePart, modifier] = t.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);

      if (modifier.toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
      }
      if (modifier.toLowerCase() === "am" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes;
    }

    // 👉 handle HH:mm:ss or HH:mm
    const parts = t.split(":");
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);

    return h * 60 + m;
  };

  const current = toMinutes(time);

  // 🧪 DEBUG (optional - remove later)
  console.log("DATE:", formattedDate);
  console.log("UI SLOT:", time);
  console.log("BOOKED SLOTS:", bookedTimes);

  return bookedTimes.some((bt) => {
  const booked = toMinutes(bt);
  const current = toMinutes(time);

  // 👉 30 min window block
  return current >= booked && current < booked + 30;
});
};
  return (
    <div className="booking-container mt-5 mb-5 p-0">
      {/* Reschedule Banner */}
      {isReschedule && (
        <div className="alert alert-info mb-4">
          <i className="bi bi-arrow-repeat me-2"></i>
          <strong>Reschedule Mode:</strong> You are rescheduling a canceled
          session.
          {selectedDates.length > 0 && (
            <span className="ms-2">
              Selected: {selectedDates[0].date.toLocaleDateString()} at{" "}
              {selectedDates[0].time}
            </span>
          )}
        </div>
      )}

      <div className="booking-card d-flex">
        <div className="left-panel px-4 pt-4 pb-3">
          <div className="position-relative mb-3">
            <div className="top-divider-line"></div>
            <img
              src={
                packageData?.coach_profile?.profile_image
                  ? packageData?.coach_profile?.profile_image
                  : `${FRONTEND_BASE_URL}/images/default_profile.jpg`
              }
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
              {packageData?.coach_profile?.session_price && !isReschedule && (
                <li className="d-flex align-items-start">
                  <i className="bi bi-receipt me-2 pkg-icons"></i>
                  <span>
                    {packageData?.coach_profile?.session_price}{" "}
                    {packageData?.coach_profile?.price_model}{" "}
                    {packageData?.coach_profile?.currency}
                  </span>
                </li>
              )}
              {/* {isReschedule && (
                <li className="d-flex align-items-start">
                  <i className="bi bi-arrow-repeat me-2 pkg-icons"></i>
                  <span className="text-success">No Payment Required - Reschedule</span>
                </li>
              )} */}

              {packageData?.coach_profile?.session_count && !isReschedule && (
                <li className="d-flex align-items-start">
                  <i className="bi bi-people me-2 pkg-icons"></i>
                  <span>
                    {packageData?.coach_profile?.session_count} Session
                    {packageData?.coach_profile?.session_count > 1 ? "s" : ""}
                  </span>
                </li>
              )}

              {isReschedule && (
                <li className="d-flex align-items-start">
                  <i className="bi bi-calendar2-event me-2 pkg-icons"></i>
                  <span>Rescheduling 1 Session</span>
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

              {packageData?.coach_profile?.cancellation_policy && (
                <li className="d-flex align-items-start">
                  <i className="bi bi-x-circle me-2 pkg-icons"></i>
                  <span>{packageData?.coach_profile?.cancellation_policy}</span>
                </li>
              )}

              <li className="d-flex align-items-start">
                <i className="bi bi-calendar-check me-2 pkg-icons"></i>
                <span>Use within 6 weeks from first session</span>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="calendar-panel p-4 flex-grow-1">
          {currentDate && (
            <Calendar
              currentDate={currentDate}
              onDateSelect={handleDateSelect}
              getActiveDays={getActiveDays}
              selectedDates={selectedDates.map(item => item.date)}
            />
          )}
        </div> */}

       {(availabilityMode === "range" || availabilityMode === "specificDate") && (
          <>
            <div className="calendar-panel p-4 flex-grow-1">
              {currentDate && (
                <Calendar
                  currentDate={currentDate}
                  onDateSelect={handleDateSelect}
                  getActiveDays={getActiveDays}
                  selectedDates={selectedDates.map((item) => item.date)}
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
                timeSlots.map((slot, idx) => {
                  const isBooked = isSlotBooked(currentDate, slot);
                    console.log("👉 isBooked:", isBooked);
                  return (
                    <div key={idx} className="mb-2">
                      <button
                        className={`time-slot-btn w-100 ${
                          isReschedule &&
                          selectedDates.length > 0 &&
                          selectedDates[0].time === slot
                            ? "active"
                            : ""
                        }`}
                        disabled={isBooked}
                          onClick={() => {
                            if (isBooked) return;   // ✅ extra safety
                            handleTimeSelect(slot);
                          }}
                        style={{
                          cursor: isBooked ? "not-allowed" : "pointer",
                          opacity: isBooked ? 0.5 : 1,
                          backgroundColor: isBooked ? "#ccc" : "",
                        }}
                      >
                        {slot}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="text-muted small">No slots available</div>
              )}
            </div>

                <h6 className="fw-semibold mb-2">
                  {isReschedule ? "Reschedule To" : "Selected Dates & Times"}
                </h6>
                <div className="selected-dates add-selected-date">
                  <div className="selected-dates-section add-selected-date-inner">
                    {selectedDates.length === 0 ? (
                      <div className="text-muted small">
                        {isReschedule
                          ? "No reschedule date selected yet"
                          : "No dates selected yet"}
                      </div>
                    ) : (
                      <div className="selected-dates-list">
                        {selectedDates.map((selected, index) => (
                          <div
                            key={index}
                            className="selected-date-item d-flex align-items-center justify-content-between mb-2 p-2 bg-light rounded"
                          >
                            <div>
                              <span className="fw-medium">
                                {selected.date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
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
                        {/* {isReschedule && selectedDates.length > 0 && (
                      <div className="text-info small mt-1">
                        <i className="bi bi-info-circle me-1"></i>
                        Reschedule mode: Only one session can be selected
                      </div>
                    )} */}
                      </div>
                    )}
                  </div>

                  {selectedDates.length > 0 && (
                    <div className="mt-3">
                      <button
                        className={`btn w-100 book-selected-date ${
                          isReschedule ? "btn-warning" : "btn-primary"
                        }`}
                        onClick={handleSubmit}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            {isReschedule ? "Rescheduling..." : "Processing..."}
                          </>
                        ) : isReschedule ? (
                          `Reschedule Session`
                        ) : (
                          `Book Selected Dates (${selectedDates.length})`
                        )}
                      </button>

                      {/* {isReschedule && (
                    <div className="text-center mt-2">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        No payment required for rescheduling
                      </small>
                    </div>
                  )} */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {availabilityMode === "ondemand" && (
          <div className="calendar-panel px-4 pt-4 pb-3 flex-grow-1">
            <div className="card border-0">
              {/* How it works */}
              <div className="alert alert-light border d-flex align-items-start gap-2 mb-4">
                <i className="bi bi-chat-left-text text-primary mt-1"></i>
                <div>
                  <div className="fw-semibold">How it works</div>
                  <div className="small text-muted">
                    Submit your preferred dates and times. The coach will
                    confirm within 24 hours.
                  </div>
                </div>
              </div>

              {/* Name + Email */}
              <form onSubmit={handleOnDemandSubmit}
              >
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                    //   className="form-control"
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                      placeholder="John Doe"
                      name="username"
                    //   defaultValue={userData?.user_name || ""}
                      value={onDemandForm.username}
                      onChange={handleOnDemandChange}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                    //   className="form-control"
                       className={`form-control ${errors.useremail ? "is-invalid" : ""}`}
                      placeholder="john@example.com"
                      name="useremail"
                      value={onDemandForm.useremail}
                      onChange={handleOnDemandChange}
                    //   defaultValue={userData?.email || ""}
                    />
                    {errors.useremail && (
                      <div className="invalid-feedback">{errors.useremail}</div>
                    )}
                  </div>
                </div>

                {/* Preferred Dates */}
                <div className="mb-4">
                  <label className="form-label">Preferred Dates & Times</label>
                  <textarea
                    rows={4}
                    // className="form-control"
                      className={`form-control ${errors.prefered_dt ? "is-invalid" : ""}`}
                    name="prefered_dt"
                    placeholder="Please share 2-3 preferred time slots."
                    value={onDemandForm.prefered_dt}
                    onChange={handleOnDemandChange}
                  />
                  {errors.prefered_dt && (
                    <div className="invalid-feedback">{errors.prefered_dt}</div>
                  )}
                </div>

                {/* Submit */}
                {/* <button
                className="btn d-flex align-items-center justify-content-center mt-3 text-white border-0"
                style={{
                  backgroundColor: "#009bfa",
                  borderRadius: "12px",
                  gap: "5px",
                  fontSize: "15px",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onClick={() => toast.success("Request submitted (UI only)")}
              >
                Submit Request <i className="bi bi-arrow-right ms-2"></i>
              </button> */}
                <button
                  className="btn d-flex align-items-center justify-content-center mt-3 text-white border-0"
                  style={{
                    backgroundColor: "#009bfa",
                    borderRadius: "12px",
                    gap: "5px",
                    fontSize: "15px",
                    padding: "10px 20px",
                  }}
                  // onClick={handleOnDemandSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Submitting..." : "Submit Request"}
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}