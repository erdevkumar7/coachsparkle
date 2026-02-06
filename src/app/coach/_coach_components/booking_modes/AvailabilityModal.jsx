import { useEffect, useState } from "react";
import SpecificDatesAvailability from "./SpecificDatesAvailability";
import DateRangeAvailability from "./DateRangeAvailability";
import OnDemandAvailability from "./OnDemandAvailability";
import "./booking_modes.css";

export default function AvailabilityModal({
  show,
  initialMode,
  initialValue,
  onClose,
  onSave,
  sessionDurationMinutes
}) {
  const [mode, setMode] = useState(initialMode || "range");
  const [draft, setDraft] = useState(initialValue?.data || {});

  useEffect(() => {
    setMode(initialMode || "range");
    setDraft(initialValue?.data || {});
  }, [initialMode, initialValue]);

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-xl" style={{ maxWidth: "80%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Availability Modes</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2 mb-4">
              {[
                { id: "specific", label: "Specific Dates" },
                { id: "range", label: "Date Range" },
                { id: "ondemand", label: "On-Demand" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`btn ${mode === m.id ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {mode === "specific" && (
              <SpecificDatesAvailability value={draft} onChange={setDraft} sessionDurationMinutes={sessionDurationMinutes} />
            )}
            {mode === "range" && (
              <DateRangeAvailability value={draft} onChange={setDraft} sessionDurationMinutes={sessionDurationMinutes} />
            )}
            {mode === "ondemand" && (
              <OnDemandAvailability value={draft} onChange={setDraft} />
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary save-btn"
              onClick={() => onSave({ mode, data: draft })}
            >
              Save Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}