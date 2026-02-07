"use client";
import "./booking_modes.css";
import dayjs from "dayjs";

const generateSlots = (start = "00:00", end = "23:59", duration = 60) => {
  const slots = [];
  const safeDuration = Math.max(1, Number(duration) || 60);

  let current = dayjs(`2024-01-01 ${start}`);
  const endTime = dayjs(`2024-01-01 ${end}`);

  if (!current.isValid() || !endTime.isValid() || current.isAfter(endTime)) {
    return slots;
  }

  while (current.valueOf() + safeDuration * 60 * 1000 <= endTime.valueOf()) {
    slots.push(current.format("HH:mm"));
    current = current.add(safeDuration, "minute");
  }

  return slots;
};

export default function DateRangeAvailability({
  value = {},
  onChange,
  sessionDurationMinutes = 60,
}) {
  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  const weekly = value.weeklyAvailability || {};

  return (
    <div>
      <h6 className="mb-3">Date Range</h6>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={value.startDate || ""}
            onChange={(e) =>
              onChange({ ...value, startDate: e.target.value })
            }
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={value.endDate || ""}
            min={value.startDate || undefined}
            onChange={(e) =>
              onChange({ ...value, endDate: e.target.value })
            }
          />
        </div>
      </div>

      <h6 className="mb-3">Weekly Availability</h6>

      {days.map(({ key, label }) => {
        const isEnabled = weekly?.[key]?.enabled || false;

        return (
          <div key={key} className="d-flex align-items-center gap-3 mb-2">
            <label className={`pill-toggle ${isEnabled ? "active" : ""}`}>
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => {
                  const enabled = e.target.checked;

                  onChange({
                    ...value,
                    weeklyAvailability: {
                      ...weekly,
                      [key]: enabled
                        ? {
                            enabled: true,
                            start: weekly?.[key]?.start || "00:00",
                            end: weekly?.[key]?.end || "23:59",
                            slots: generateSlots(
                              weekly?.[key]?.start || "00:00",
                              weekly?.[key]?.end || "23:59",
                              sessionDurationMinutes
                            ),
                          }
                        : { enabled: false },
                    },
                  });
                }}
              />
              <span className="pill-indicator" />
            </label>

            <span className="fw-medium" style={{ width: 90 }}>
              {label}
            </span>

            {isEnabled && (
              <>
                <input
                  type="time"
                  className="form-control time-slot"
                  style={{ maxWidth: 120 }}
                  value={weekly?.[key]?.start || "00:00"}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      weeklyAvailability: {
                        ...weekly,
                        [key]: {
                          ...weekly?.[key],
                          start: e.target.value,
                          slots: generateSlots(
                            e.target.value,
                            weekly?.[key]?.end || "23:59",
                            sessionDurationMinutes
                          ),
                        },
                      },
                    })
                  }
                />

                <span className="text-muted">to</span>

                <input
                  type="time"
                  className="form-control time-slot"
                  style={{ maxWidth: 120 }}
                  value={weekly?.[key]?.end || "23:59"}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      weeklyAvailability: {
                        ...weekly,
                        [key]: {
                          ...weekly?.[key],
                          end: e.target.value,
                          slots: generateSlots(
                            weekly?.[key]?.start || "00:00",
                            e.target.value,
                            sessionDurationMinutes
                          ),
                        },
                      },
                    })
                  }
                />
              </>
            )}
          </div>
        );
      })}

      <div className="mt-3">
        <label className="form-label">Booking Notice</label>
        <select
          className="form-control"
          value={value.bufferTime ?? 24}
          onChange={(e) =>
            onChange({ ...value, bufferTime: Number(e.target.value) })
          }
        >
          <option value={0}>No minimum notice</option>
          <option value={1}>At least 1 hour in advance</option>
          <option value={4}>At least 4 hours in advance</option>
          <option value={24}>At least 24 hours in advance</option>
          <option value={48}>At least 48 hours in advance</option>
          <option value={72}>At least 72 hours in advance</option>
        </select>
      </div>
    </div>
  );
}
