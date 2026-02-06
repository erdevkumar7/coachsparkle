import { useState } from "react";
import AvailabilityModal from "./AvailabilityModal";

export default function AvailabilityModesField({ value, onChange, isProUser, sessionDurationMinutes }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState(value?.mode || "");

  const handleChange = (e) => {
    const mode = e.target.value;
    if (!mode) return;
    setSelectedMode(mode);
    setShowModal(true);
  };

  return (
    <>
      <label className="form-label">Availability Modes</label>
      <select
        className="form-control"
        disabled={!isProUser}
        value={selectedMode}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="specific">Specific Dates</option>
        <option value="range">Date Range(Recommended)</option>
        <option value="ondemand">On-Demand</option>
      </select>

      {showModal && (
        <AvailabilityModal
          show={showModal}
          initialMode={selectedMode}
          initialValue={value}
          sessionDurationMinutes={sessionDurationMinutes}
          onClose={() => setShowModal(false)}
          onSave={(payload) => {
            onChange(payload);
            setSelectedMode(payload.mode);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}