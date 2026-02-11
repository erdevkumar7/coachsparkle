import { useEffect, useState } from "react";
import AvailabilityModal from "./AvailabilityModal";
import { getAvailabilityModes } from "@/services/availabilityModes.api";

export default function AvailabilityModesField({
  value,
  onChange,
  isProUser,
  sessionDurationMinutes,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState(value?.mode || "");
  const [isModeSelected, setIsModeSelected] = useState(false);
  const [modes, setModes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModes = async () => {
      try {
        setLoading(true);
        const res = await getAvailabilityModes();
        // ⚠️ adjust according to backend response
        setModes(res?.availabilitymodes || []);
      } catch (err) {
        console.error("API ERROR 👉", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModes();
  }, [modes]);

const handleChange = (e) => {
  const availabilityId = Number(e.target.value);
  if (!availabilityId) return;

  setSelectedMode(availabilityId);
  setShowModal(true);
  setIsModeSelected(true);

  // 🔥 Parent ko id yahin se bhejo
  onChange?.({
    availability_id: availabilityId,
    isModeSelected: true,
  });
};
const handleSaveAvailability = (payload) => {
  /*
    payload = {
      mode: 31,
      data: {...}
    }
  */

  // 👇 yahi se parent ko data bhejna hai
  onChange({
    availability_id: payload.mode, // 🔥 backend ke liye
    data: payload.data,
  });

  setSelectedMode(payload.mode);
  setShowModal(false);
};

  return (
    <>
      <label className="form-label">Client Booking Availability</label>

      <select
        className="form-control"
        disabled={!isProUser}
        value={selectedMode}
        onChange={handleChange}
      >
        <option value="">Select</option>

        {modes.map((mode) => (
          <option key={mode.availablity_mode} value={mode.id}>
            {mode.availability_mode_name}
          </option>
        ))}
      </select>

      {showModal && (
      <AvailabilityModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveAvailability}
        initialMode={Number(selectedMode)}
        availabilityId={Number(selectedMode)}
        sessionDurationMinutes={sessionDurationMinutes}
      />
      )}
    </>
  );
}
