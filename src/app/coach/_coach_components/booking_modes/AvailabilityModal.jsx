import { useEffect, useState } from "react";
import SpecificDatesAvailability from "./SpecificDatesAvailability";
import DateRangeAvailability from "./DateRangeAvailability";
import OnDemandAvailability from "./OnDemandAvailability";
import "./booking_modes.css";

const MODE_LABEL = {
  31: "Fixed Dates (Set by Coach)",
  32: "Flexible Date Range (Clients Choose)",
  33: "On-Demand (Client Request Session)",
};

export default function AvailabilityModal({
  show,
  initialMode,
  initialValue,
  onClose,
  onSave,
  sessionDurationMinutes,
}) {
  const [mode, setMode] = useState(initialMode);
  const [draft, setDraft] = useState(initialValue?.data || {});

  useEffect(() => {
    setMode(initialMode);
 setDraft({});
  }, [initialMode]);

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-xl" style={{ maxWidth: "80%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Availability Mode</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="mb-4">
              <span className="badge bg-primary px-3 py-2">
                {MODE_LABEL[mode]}
              </span>
            </div>

            {mode === 31 && (
              <SpecificDatesAvailability
                value={draft}
                onChange={setDraft}
                sessionDurationMinutes={sessionDurationMinutes}
              />
            )}

            {mode === 32 && (
              <DateRangeAvailability
                value={draft}
                onChange={setDraft}
                sessionDurationMinutes={sessionDurationMinutes}
              />
            )}

            {mode === 33 && (
              <OnDemandAvailability
                value={draft}
                onChange={setDraft}
              />
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
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
