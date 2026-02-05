"use client";
import { useEffect, useMemo, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import "./booking_modes.css";

const makeSlot = (time = "09:00 AM") => ({
  id: crypto.randomUUID(),
  time,
});

export default function SpecificDatesAvailability({ value = {}, onChange }) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState(() => {
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

  const selectedSet = useMemo(
    () => new Set(selectedDates.map((d) => d.date)),
    [selectedDates]
  );

  useEffect(() => {
    const payload = selectedDates.map((d) => ({
      date: d.date,
      maxParticipants: d.maxParticipants,
      slots: d.slots.map((s) => s.time),
    }));
    onChange({ specificDates: payload });
  }, [selectedDates, onChange]);

  const toggleDate = (date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");
    const exists = selectedDates.some((d) => d.date === formatted);

    setSelectedDates((prev) => {
      if (exists) return prev.filter((d) => d.date !== formatted);
      return [
        ...prev,
        {
          date: formatted,
          maxParticipants: 10,
          slots: [makeSlot("09:00 AM")],
        },
      ];
    });

    setOpenCalendar(false);
  };

  const addTime = (dateIndex) => {
    setSelectedDates((prev) =>
      prev.map((d, i) =>
        i === dateIndex
          ? { ...d, slots: [...d.slots, makeSlot("10:00 AM")] }
          : d
      )
    );
  };

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

  const removeTime = (dateIndex, slotId) => {
    setSelectedDates((prev) =>
      prev.map((d, i) =>
        i === dateIndex
          ? { ...d, slots: d.slots.filter((s) => s.id !== slotId) }
          : d
      )
    );
  };

  const updateMax = (dateIndex, value) => {
    const max = Math.max(1, Number(value) || 1);
    setSelectedDates((prev) =>
      prev.map((d, i) =>
        i === dateIndex ? { ...d, maxParticipants: max } : d
      )
    );
  };

  return (
    <div>
      <label className="form-label fw-semibold">Session Dates</label>

      {/* Header */}
      <div
        className="form-control d-flex align-items-center gap-2"
        style={{ cursor: "pointer" }}
        onClick={() => setOpenCalendar((v) => !v)}
      >
        <i className="bi bi-calendar3"></i>
        <span>{selectedDates.length} date(s) selected</span>
      </div>

      {/* Calendar */}
      {openCalendar && (
        <div className="border rounded p-2 mt-2 bg-white">
          <DateCalendar
            disablePast
            views={["day"]}
            onChange={toggleDate}
            slotProps={{
              day: (ownerState) => {
                const dateStr = ownerState.day.format("YYYY-MM-DD");
                return {
                  className: selectedSet.has(dateStr)
                    ? "mui-multi-selected-day"
                    : "",
                };
              },
            }}
          />
        </div>
      )}

      {/* Dates */}
      <div className="mt-4">
        {selectedDates.map((item, dateIndex) => (
          <div key={item.date} className="border rounded p-3 mb-3">
            {/* Header row with Max */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-semibold mb-0">
                {dayjs(item.date).format("dddd, MMMM D, YYYY")}
              </h6>

              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small">Max</span>
                <input
                  type="number"
                  min={1}
                  className="form-control form-control-sm max-input-compact"
                  style={{ width: 80 }}
                  value={item.maxParticipants}
                  onChange={(e) => updateMax(dateIndex, e.target.value)}
                />
              </div>
            </div>

            <div className="text-muted small mb-2">
              <i className="bi bi-clock me-1"></i> Time Slots
            </div>

            <div className="d-flex flex-wrap gap-2 align-items-center">
              {item.slots.map((slot) => (
                <div key={slot.id} className="d-flex align-items-center gap-2">
                  <input
                    type="time"
                    className="form-control form-control-sm time-input-compact"
                    style={{ width: 130 }}
                    value={dayjs(slot.time, "hh:mm A").format("HH:mm")}
                    onChange={(e) =>
                      updateTime(
                        dateIndex,
                        slot.id,
                        dayjs(e.target.value, "HH:mm").format("hh:mm A")
                      )
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-light border text-danger p-0 delete-btn-compact"
                    onClick={() => removeTime(dateIndex, slot.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
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
