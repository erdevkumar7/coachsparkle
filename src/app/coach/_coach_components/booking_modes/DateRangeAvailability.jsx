"use client";
import "./booking_modes.css";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

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
  dynamicValue
}) {

  const initialized = useRef(false);

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  useEffect(() => {

    if (!dynamicValue?.weekly_availability) return;

    // ek baar hi initialize hoga
    if (initialized.current) return;

    const availability = dynamicValue.weekly_availability;
    const formatted = {};

    if (Array.isArray(availability)) {

      availability.forEach((item) => {

        const dayKey = (item?.days || item?.day)?.toLowerCase?.();
        if (!dayKey) return;

        const start = item.start_time?.slice(0,5) || "00:00";
        const end = item.end_time?.slice(0,5) || "23:59";

        formatted[dayKey] = {
          enabled: true,
          start,
          end,
          slots: generateSlots(start, end, sessionDurationMinutes)
        };

      });

    } else {

      Object.entries(availability).forEach(([day, item]) => {

        const dayKey = day.toLowerCase();

        const start = item.start_time?.slice(0,5) || "00:00";
        const end = item.end_time?.slice(0,5) || "23:59";

        formatted[dayKey] = {
          enabled: true,
          start,
          end,
          slots: generateSlots(start, end, sessionDurationMinutes)
        };

      });

    }

    initialized.current = true;

    onChange({
      ...value,
      startDate: value?.startDate || dynamicValue?.start_date || "",
      endDate: value?.endDate || dynamicValue?.end_date || "",
      weeklyAvailability: formatted
    });

  }, [dynamicValue, sessionDurationMinutes]);

  const weekly = value?.weeklyAvailability || {};

  useEffect(() => {
  if (!value?.bufferTime && dynamicValue?.booking_notice) {
    onChange({
      ...value,
      bufferTime: dynamicValue.booking_notice,
    });
  }
}, [dynamicValue]);

  return (
    <div>
      <h6 className="mb-3">Date Range</h6>

      <div className="row mb-3">

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={value.startDate ?? dynamicValue?.start_date ?? ""}
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
            value={value.endDate ?? dynamicValue?.end_date ?? ""}
            min={value.startDate ?? dynamicValue?.start_date ?? undefined}
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
  <label className="form-label">Booking Conditions</label>
  <input
    type="text"
    className="form-control"
    placeholder="e.g. At least 24 hours in advance"
    value={value?.bufferTime ?? dynamicValue?.booking_notice ?? ""}
    onChange={(e) =>
      onChange({
        ...value,
        bufferTime: e.target.value,
      })
    }
  />
</div>

    </div>
  );
}