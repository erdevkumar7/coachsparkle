import "./booking_modes.css";
export default function DateRangeAvailability({ value = {}, onChange }) {
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
      <h6 className="mb-3">Weekly Availability</h6>

      {days.map(({ key, label }) => {
        const isEnabled = weekly?.[key]?.enabled || false;

        return (
          <div key={key} className="d-flex align-items-center gap-3 mb-2">
            {/* Pill toggle */}
            <label className={`pill-toggle ${isEnabled ? "active" : ""}`}>
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) =>
                  onChange({
                    ...value,
                    weeklyAvailability: {
                      ...weekly,
                      [key]: {
                        ...weekly?.[key],
                        enabled: e.target.checked,
                        start: weekly?.[key]?.start || "09:00",
                        end: weekly?.[key]?.end || "17:00",
                      },
                    },
                  })
                }
              />
              <span className="pill-indicator" />
            </label>

            {/* Day */}
            <span className="fw-medium" style={{ width: 90 }}>
              {label}
            </span>

            {/* Time inputs – show only when enabled */}
            {isEnabled && (
              <>
                <input
                  type="time"
                  className="form-control time-slot"
                  style={{ maxWidth: 120 }}
                  value={weekly?.[key]?.start || "09:00"}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      weeklyAvailability: {
                        ...weekly,
                        [key]: { ...weekly?.[key], start: e.target.value },
                      },
                    })
                  }
                />

                <span className="text-muted">to</span>

                <input
                  type="time"
                  className="form-control time-slot"
                  style={{ maxWidth: 120 }}
                  value={weekly?.[key]?.end || "17:00"}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      weeklyAvailability: {
                        ...weekly,
                        [key]: { ...weekly?.[key], end: e.target.value },
                      },
                    })
                  }
                />
              </>
            )}
          </div>
        );
      })}

      {/* Booking Notice */}
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
