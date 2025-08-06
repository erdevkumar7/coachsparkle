"use client";
import React, { useState, useEffect } from "react";

export default function Calendar({ selectedDate, onValidatedDateChange, getActiveDays, sessionDates = [] }) {
  const [displayedMonth, setDisplayedMonth] = useState(selectedDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(selectedDate.getFullYear());
  const [activeDays, setActiveDays] = useState([]);

  useEffect(() => {
    const days = getActiveDays(displayedYear, displayedMonth);
    setActiveDays(days || []);
  }, [displayedMonth, displayedYear, getActiveDays]);

  useEffect(() => {
  setDisplayedMonth(selectedDate.getMonth());
  setDisplayedYear(selectedDate.getFullYear());
}, [selectedDate]);


  const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
  const startDay = new Date(displayedYear, displayedMonth, 1).getDay();

  const handleDateClick = (day) => {
    if (!activeDays.includes(day)) return;
    const newDate = new Date(displayedYear, displayedMonth, day, 12);
    onValidatedDateChange(newDate);
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

    const sessionDayMap = sessionDates
    .filter(date =>
      date.getFullYear() === displayedYear &&
      date.getMonth() === displayedMonth
    )
    .map(date => date.getDate());


  return (
    <div className="calendar-wrapper-custom">
      <h5 className="fw-semibold mb-3">Select a Date & Time</h5>

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

      <div className="calendar-grid-custom text-center">
        {[...Array(startDay)].map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}
{[...Array(daysInMonth)].map((_, i) => {
  const day = i + 1;
  const isActive = activeDays.includes(day);
  const isSelected =
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === displayedMonth &&
    selectedDate.getFullYear() === displayedYear;

  const isSessionDay = sessionDayMap.includes(day);

  let className = "calendar-day-custom";
  if (isSelected) className += " selected";
  else if (isSessionDay) className += " multi-selected";
  else if (isActive) className += " active";
  else className += " inactive";

  return (
    <div
      key={day}
      className={className}
      onClick={() => handleDateClick(day)}
    >
      {day}
    </div>
  );
})}

      </div>
    </div>
  );
}
