"use client";
import { useEffect, useMemo, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import "./booking_modes.css";

const makeSlot = (time = "00:00") => ({
  id: crypto.randomUUID(),
  time,
});

const getNextSlot = (lastTime = "00:00", duration = 0) => {
  // const safeDuration = Math.max(1, Number(duration) || 0);

  const next = dayjs(`2024-01-01 ${lastTime}`, "YYYY-MM-DD HH:mm").add(
    duration,
    "minute"
  );

  if (!next.isValid()) return null;

  return next.format("HH:mm");
};

export default function SpecificDatesAvailability({
  value = {},
  onChange,
  sessionDurationMinutes = 0,
  dynamicValue,
}) {
  const [openCalendar, setOpenCalendar] = useState(false);

  /**
   * INITIAL STATE
   * Edit mode (DB data) OR Add mode
   */
  const [selectedDates, setSelectedDates] = useState(() => {
    // EDIT MODE (DB records)
    if (Array.isArray(dynamicValue) && dynamicValue.length > 0) {
      return dynamicValue.map((item) => ({
        date: item.session_dates,
        maxParticipants: item.max_participants ?? 10,
        slots: JSON.parse(item.time_slots || "[]").map((t) => makeSlot(t)),
      }));
    }

    // ADD MODE (existing logic)
    if (Array.isArray(value?.specificDates)) {
      return value.specificDates.map((d) => ({
        date: d.date,
        maxParticipants: d.maxParticipants ?? 10,
        slots: (d.slots || []).map((s) =>
          typeof s === "string" ? makeSlot(s) : s
        ),
      }));
    }

    return [];
  });

  /**
   * Calendar auto open in edit mode
   */
  useEffect(() => {
    if (Array.isArray(dynamicValue) && dynamicValue.length > 0) {
      setOpenCalendar(true);
    }
  }, [dynamicValue]);

  /**
   * Selected dates set
   */
  const selectedSet = useMemo(
    () => new Set(selectedDates.map((d) => d.date)),
    [selectedDates]
  );

  /**
   * Send data to parent
   */
  useEffect(() => {
    onChange({
      specificDates: selectedDates.map((d) => ({
        date: d.date,
        maxParticipants: d.maxParticipants,
        slots: d.slots.map((s) => s.time),
      })),
    });
  }, [selectedDates, onChange]);

  /**
   * Toggle date
   */
  const toggleDate = (date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");

    setSelectedDates((prev) => {
      const exists = prev.some((d) => d.date === formatted);
      if (exists) return prev.filter((d) => d.date !== formatted);

      return [
        ...prev,
        {
          date: formatted,
          maxParticipants: 10,
          slots: [makeSlot("00:00")],
        },
      ];
    });

    setOpenCalendar(false);
  };

  /**
   * Add new slot
   */
  const addTime = (dateIndex) => {
    setSelectedDates((prev) =>
      prev.map((d, i) => {
        if (i !== dateIndex) return d;

        const lastTime = d.slots[d.slots.length - 1]?.time || "00:00";
        const nextTime = getNextSlot(lastTime, sessionDurationMinutes);

        if (!nextTime) return d;

        return {
          ...d,
          slots: [...d.slots, makeSlot(nextTime)],
        };
      })
    );
  };

  /**
   * Update slot time
   */
  const updateTime = (dateIndex, slotId, value) => {
    setSelectedDates((prev) =>
      prev.map((d, i) =>
        i === dateIndex
          ? {
              ...d,
              slots: d.slots.map((s) =>
                s.id === slotId ? { ...s, time: value } : s
              ),
            }
          : d
      )
    );
  };

  /**
   * Remove slot
   */
  const removeTime = (dateIndex, slotId) => {
    setSelectedDates((prev) =>
      prev.map((d, i) =>
        i === dateIndex
          ? { ...d, slots: d.slots.filter((s) => s.id !== slotId) }
          : d
      )
    );
  };

  /**
   * Update max participants
   */
  const updateMax = (dateIndex, value) => {
    const max = Math.max(1, Number(value) || 1);
    setSelectedDates((prev) =>
      prev.map((d, i) =>
        i === dateIndex ? { ...d, maxParticipants: max } : d
      )
    );
  };

  /**
   * Date count
   */
  const dateCount =
    dynamicValue?.length > 0 ? dynamicValue.length : selectedDates.length;

  return (
    <div>
      <label className="form-label fw-semibold">Session Dates</label>

      {/* Calendar toggle */}
      <div
        className="form-control d-flex align-items-center gap-2"
        style={{ cursor: "pointer" }}
        onClick={() => setOpenCalendar((v) => !v)}
      >
        <i className="bi bi-calendar3"></i>
        <span>{dateCount} date(s) selected</span>
      </div>

      {/* Calendar */}
      {openCalendar && (
        <div className="border rounded p-2 mt-2 bg-white calendara-class">
          <DateCalendar
            disablePast
            onChange={toggleDate}
            slotProps={{
              day: (ownerState) => ({
                className: selectedSet.has(
                  ownerState.day.format("YYYY-MM-DD")
                )
                  ? "mui-multi-selected-day"
                  : "",
              }),
            }}
          />
        </div>
      )}

      {/* Dates list */}
      <div className="mt-4">
        {selectedDates.map((item, dateIndex) => (
          <div key={item.date} className="border rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-semibold mb-0">
                {dayjs(item.date).format("dddd, MMMM D, YYYY")}
              </h6>

              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small">Max Participants</span>
                <input
                  type="number"
                  min={1}
                  className="form-control form-control-sm"
                  style={{ width: 80 }}
                  value={item.maxParticipants}
                  onChange={(e) => updateMax(dateIndex, e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 align-items-center">
              {item.slots.map((slot) => (
                <div key={slot.id} className="d-flex align-items-center gap-2">
                  <input
                    type="time"
                    className="form-control form-control-sm"
                    value={slot.time}
                    onChange={(e) =>
                      updateTime(dateIndex, slot.id, e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="btn btn-light border text-danger p-0"
                    onClick={() => removeTime(dateIndex, slot.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => addTime(dateIndex)}
              >
                <AddIcon fontSize="small" /> Add Time
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}