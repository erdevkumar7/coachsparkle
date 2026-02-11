import { useState } from "react";
import "./booking_modes.css";

const SLA_OPTIONS = [
  { value: 4, label: "Within 4 hours" },
  { value: 12, label: "Within 12 hours" },
  { value: 24, label: "Within 24 hours" },
  { value: 48, label: "Within 48 hours" },
  { value: 72, label: "Within 72 hours" },
  { value: 0, label: "Other"}
];

export default function OnDemandAvailability({ value = {}, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = value.responseSLA || [];

  const toggleOption = (val) => {
    const updated = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];

    onChange({ ...value, responseSLA: updated });
  };

  const removeChip = (val) => {
    onChange({
      ...value,
      responseSLA: selected.filter((v) => v !== val),
    });
  };

  return (
    <div>
      <h6 className="mb-3">On-Demand Booking</h6>

      <label className="mb-1">Response Time</label>

      {/* Select Box */}
      <div className="multi-select" onClick={() => setOpen(!open)}>
        {selected.length === 0 ? (
          <span className="placeholder">Select response time</span>
        ) : (
          <div className="chip-container">
            {selected.map((val) => {
              const item = SLA_OPTIONS.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="chip"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item?.label}
                  <button onClick={() => removeChip(val)}>×</button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="dropdown-box">
          {SLA_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={`dropdown-item ${
                selected.includes(opt.value) ? "selected" : ""
              }`}
              onClick={() => toggleOption(opt.value)}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                readOnly
              />
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}

      <label className="mt-3">Instructions for Clients</label>
      <textarea
        className="form-control instructions-textarea"
        rows={6}
        value={value.instructions || ""}
        onChange={(e) =>
          onChange({ ...value, instructions: e.target.value })
        }
      />
    </div>
  );
}
