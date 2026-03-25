"use client";
import React, { useState, useEffect } from "react";

export default function Calendar({ currentDate, onDateSelect, getActiveDays, selectedDates = [] }) {
  const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
  const [activeDays, setActiveDays] = useState([]);

  useEffect(() => {
    const days = getActiveDays(displayedYear, displayedMonth);
    setActiveDays(days || []);
  }, [displayedMonth, displayedYear, getActiveDays]);

  useEffect(() => {
    setDisplayedMonth(currentDate.getMonth());
    setDisplayedYear(currentDate.getFullYear());
  }, [currentDate]);

  const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
  const startDay = new Date(displayedYear, displayedMonth, 1).getDay();

  const handleDateClick = (day) => {
    if (!activeDays.includes(day)) return;
    const newDate = new Date(displayedYear, displayedMonth, day, 12);
    onDateSelect(newDate);
  };

  const goToPreviousMonth = () => {
    if (displayedMonth === 0) {
      setDisplayedMonth(11);
      setDisplayedYear((prev) => prev - 1);
    } else {
      setDisplayedMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (displayedMonth === 11) {
      setDisplayedMonth(0);
      setDisplayedYear((prev) => prev + 1);
    } else {
      setDisplayedMonth((prev) => prev + 1);
    }
  };

  const monthName = new Date(displayedYear, displayedMonth).toLocaleString("default", {
    month: "long",
  });

  // Create a map of selected days in the current month
  const selectedDayMap = selectedDates
    .filter(date =>
      date.getFullYear() === displayedYear &&
      date.getMonth() === displayedMonth
    )
    .map(date => date.getDate());

  return (
    <div className="calendar-wrapper-custom">
      <h5 className="fw-semibold mb-3">Select Dates & Times</h5>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <i className="bi bi-chevron-left text-muted cursor-pointer" onClick={goToPreviousMonth}></i>
        <span className="fw-semibold fs-6">{monthName} {displayedYear}</span>
        <i className="bi bi-chevron-right text-primary cursor-pointer" onClick={goToNextMonth}></i>
      </div>

      <div className="calendar-grid-custom text-center mb-2 text-uppercase fw-light small">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* <div className="calendar-grid-custom text-center">
        {[...Array(startDay)].map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
            const currentCellDate = new Date(displayedYear, displayedMonth, day);
            const isPast = currentCellDate < today; // 👈 only new logic
          const isActive = activeDays.includes(day);
          const isCurrent =
            currentDate.getDate() === day &&
            currentDate.getMonth() === displayedMonth &&
            currentDate.getFullYear() === displayedYear;
          
          const isSelected = selectedDayMap.includes(day);

          let className = "calendar-day-custom";
          if (isCurrent) className += " current";
          else if (isSelected) className += " selected";
          else if (isActive) className += " active";
          else className += " inactive";

          if (isPast) className += " disabled";

          return (
            <div
              key={day}
              className={className}
                    onClick={() => {
        if (!isPast) handleDateClick(day); // 👈 only safety check
      }}
            >
              {day}
            </div>
          );
        })}
      </div> */}
      <div className="calendar-grid-custom text-center">
  {[...Array(startDay)].map((_, i) => (
    <div key={"empty-" + i}></div>
  ))}

  {[...Array(daysInMonth)].map((_, i) => {
    const day = i + 1;

    // 🔹 Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 🔹 Current cell date
    const currentCellDate = new Date(displayedYear, displayedMonth, day);
    currentCellDate.setHours(0, 0, 0, 0);

    // 🔹 Past date check
    const isPast = currentCellDate < today;

    const isActive = activeDays.includes(day);
    const isCurrent =
      currentDate.getDate() === day &&
      currentDate.getMonth() === displayedMonth &&
      currentDate.getFullYear() === displayedYear;

    const isSelected = selectedDayMap.includes(day);

    let className = "calendar-day-custom";

    if (isCurrent && !isPast) className += " current";
    else if (isSelected && !isPast) className += " selected";
    else if (isActive && !isPast) className += " active";
    else className += " inactive";

    // 🔹 Inline style for past dates (safe, won't affect other CSS)
    const style = isPast
      ? { opacity: 0.4, pointerEvents: "none", cursor: "not-allowed" }
      : {};

    return (
      <div
        key={day}
        className={className}
        style={style} // 👈 inline style applied
        onClick={() => {
          if (!isPast) handleDateClick(day);
        }}
      >
        {day}
      </div>
    );
  })}
</div>
    </div>
  );
}