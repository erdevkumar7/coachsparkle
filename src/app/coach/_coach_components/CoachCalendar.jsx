"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../_styles/coach_calendar.css";
import { format } from "date-fns";
import EastIcon from '@mui/icons-material/East';
import { useRouter } from "next/navigation";

export default function CoachCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);

  const available = [
    "2025-07-06",
    "2025-07-07",
    "2025-07-08",
    "2025-07-13",
    "2025-07-14",
    "2025-07-15",
    "2025-07-20",
    "2025-07-21",
    "2025-07-22",
    "2025-07-27",
    "2025-07-28",
    "2025-07-29",
  ];

  const unavailable = [
    "2025-07-02",
    "2025-07-03",
    "2025-07-09",
    "2025-07-10",
    "2025-07-11",
    "2025-07-16",
    "2025-07-17",
    "2025-07-18",
    "2025-07-23",
    "2025-07-24",
    "2025-07-30",
  ];

  const bookedSession = [
    "2025-07-01",
    "2025-07-04",
    "2025-07-05",
    "2025-07-25",
    "2025-07-26",
  ];

  const getDayClassName = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (available.includes(dateStr)) return "day-green";
    if (unavailable.includes(dateStr)) return "day-red";
    if (bookedSession.includes(dateStr)) return "day-blue";
    return "";
  };

  return (
    <div className="calendarDiv">
      <div className="calendar-container">
        <h3 className="text-lg font-semibold mb-4 quick-text">
          Master Calendar
        </h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          dayClassName={(date) => getDayClassName(date)}
          calendarClassName="custom-calendar"
        />

        <div className="manage" onClick={() => router.push('/coach/booking')}>
          <button className="manage-buttons">
            {/* Manage Calendar <i className="bi bi-arrow-right"></i> */}
            Manage Calendar <EastIcon className="mui-icons" />
          </button>
        </div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="color-circle green"></span> Available
        </div>
        <div className="legend-item">
          <span className="color-circle red"></span> Unavailable
        </div>
        <div className="legend-item">
          <span className="color-circle blue"></span> Booked Sessions
        </div>
      </div>
    </div>
  );
}
