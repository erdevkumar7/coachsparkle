import { useEffect, useState } from "react";
import SpecificDatesAvailability from "./SpecificDatesAvailability";
import DateRangeAvailability from "./DateRangeAvailability";
import OnDemandAvailability from "./OnDemandAvailability";
import { addSpecificDate } from "@/services/availabilityModes.api";
import "./booking_modes.css";

export default function AvailabilityModal({
  show,
  initialMode,
  initialValue,
  onClose,
  onSave,
  sessionDurationMinutes,
  availabilityId,
}) {
  const [mode, setMode] = useState(initialMode || "range");
  const [draft, setDraft] = useState(initialValue?.data || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setDraft(initialValue?.data || {});
  }, [initialMode, initialValue]);

  if (!show) return null;

const handleSave = async () => {
  if (!availabilityId) {
    console.error("availabilityId missing");
    alert("Availability mode not selected");
    return;
  }

  try {
    if (mode === 31 && draft?.specificDates?.length) {
      for (const item of draft.specificDates) {
        await addSpecificDate({
          availabilityId,
          session_date: item.date,
          time_slot: item.slots,
          max_participants: item.maxParticipants,
        });
      }
    }

    onSave({ mode, data: draft });
    onClose();
  } catch (err) {
    console.error("Save failed", err);
  }
};


  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        style={{ maxWidth: "80%" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Availability Modes</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2 mb-4">
              {[
                { id: 31, label: "Specific Dates" },
                { id: 32, label: "Date Range" },
                { id: 33, label: "On-Demand" },
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

            {mode === 31 && (
              <SpecificDatesAvailability
                value={draft}
                modeId={31}
                onChange={setDraft}
                sessionDurationMinutes={sessionDurationMinutes}
              />
            )}

            {mode === 32 && (
              <DateRangeAvailability
                value={draft}
                modeId={32}
                onChange={setDraft}
                sessionDurationMinutes={sessionDurationMinutes}
              />
            )}

            {mode === 33 && (
              <OnDemandAvailability
                value={draft}
                modeId={33}
                onChange={setDraft}
              />
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary save-btn"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Availability"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
