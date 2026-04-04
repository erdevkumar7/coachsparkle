import React, { useState, useEffect } from "react";

const OnDemondCalendar = ({ onDateSelect, currentDate, disabledDates = [] }) => {
  const today = new Date();

  // ✅ Local date formatter (NO timezone issue)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ✅ Month state (sync with currentDate)
  const [currentMonth, setCurrentMonth] = useState(
    currentDate
      ? new Date(
          new Date(currentDate).getFullYear(),
          new Date(currentDate).getMonth(),
          1
        )
      : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // ✅ Selected date state
  const [selectedDate, setSelectedDate] = useState(
    currentDate ? formatDate(new Date(currentDate)) : formatDate(today)
  );

  // ✅ Sync when parent changes currentDate
  useEffect(() => {
    if (currentDate) {
      const newDate = new Date(currentDate);

      setSelectedDate(formatDate(newDate));

      setCurrentMonth(
        new Date(newDate.getFullYear(), newDate.getMonth(), 1)
      );
    }
  }, [currentDate]);

  // 📅 Get days of month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  // ❌ Disable past dates
  const isPast = (date) => {

    if (!date) return true;

    const t = new Date();
    t.setHours(0, 0, 0, 0);

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    return d < t;
  };

  const isBooked = (date) => {
  if (!date) return false;
  const formatted = formatDate(date);
  return disabledDates.includes(formatted);
};

  // ✅ Handle click
  const handleClick = (date) => {
    if (!date || isPast(date) || isBooked(date)) return;

    const formatted = formatDate(date);

    setSelectedDate(formatted);
    onDateSelect?.(formatted);
  };

  return (
    <div style={{ width: 300, padding: 10, border: "1px solid #ccc" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
              )
            )
          }
        >
          ◀
        </button>

        <h4>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h4>

        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
              )
            )
          }
        >
          ▶
        </button>
      </div>

      {/* Days */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 5,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <b key={d}>{d}</b>
        ))}

        {days.map((date, i) => {
          const formatted = date ? formatDate(date) : null;

          return (
            <div
              key={i}
              onClick={() => handleClick(date)}
              style={{
                padding: 8,
                textAlign: "center",
                cursor:
                  date && !isPast(date) && !isBooked(date)
                    ? "pointer"
                    : "not-allowed",

                background: isBooked(date)
                  ? "#ff4d4f" // 🔴 booked
                  : formatted === selectedDate
                  ? "#007bff" // 🔵 selected
                  : "#f0f0f0",

                color: isPast(date) || isBooked(date) ? "#fff" : "#000",
                borderRadius: 4,
              }}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnDemondCalendar;