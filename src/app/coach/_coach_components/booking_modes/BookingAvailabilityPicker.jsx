import { useEffect, useState } from "react";
import AvailabilityModal from "./AvailabilityModal";
import { getAvailabilityModes } from "@/services/availabilityModes.api";
import dayjs from "dayjs";

export default function AvailabilityModesField({
  value,
  onChange,
  isProUser,
  sessionDurationMinutes,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");
  const [modes, setModes] = useState([]);

  useEffect(() => {
    const fetchModes = async () => {
      const res = await getAvailabilityModes();
      setModes(res?.availabilitymodes || []);
    };
    fetchModes();
  }, []);

  const handleChange = (e) => {
  const availabilityId = e.target.value;
  if (!availabilityId) return;

  setSelectedMode(availabilityId);

  // 👇 clear previous saved data when switching mode
  onChange({
    availability_id: Number(availabilityId),
    data: {},
  });

  setShowModal(true);
};


  const handleSaveAvailability = (payload) => {
    onChange({
      availability_id: payload.mode,
      data: payload.data,
    });

    // ✅ Clear dropdown after save
    setSelectedMode("");
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setSelectedMode(""); // clear dropdown
    setShowModal(false);
  };

return (
  <>
    <label className="form-label">Client Booking Availability</label>

    <select
      className="form-control"
      disabled={!isProUser}
      value={showModal ? selectedMode : ""}   // 👈 dropdown clears after save
      onChange={handleChange}
    >
      <option value="">Select</option>
      {modes.map((mode) => (
        <option key={mode.id} value={String(mode.id)}>
          {mode.availability_mode_name}
        </option>
      ))}
    </select>

    {/* ✅ FULL WIDTH SAVED PREVIEW */}
    {value?.availability_id && (
      <div className="mt-3 p-3 border rounded bg-light w-100">
        <div className="fw-semibold text-success mb-2">
          ✓ Saved Availability Mode:{" "}
          {
            modes.find((m) => String(m.id) === String(value.availability_id))
              ?.availability_mode_name
          }
        </div>

        {/* 🔹 Specific Dates */}
        {value.availability_id === 31 &&
          Array.isArray(value?.data?.specificDates) &&
          value.data.specificDates.map((d, i) => (
            <div key={i} className="mb-2">
              <strong>{d.date}</strong>
              <div className="small text-muted">
                Slots: {Array.isArray(d.slots) ? d.slots.join(", ") : "-"}
              </div>
              <div className="small text-muted">
                Max Participants: {d.maxParticipants}
              </div>
            </div>
          ))}

        {/* 🔹 Date Range */}
        {value.availability_id === 32 && value?.data && (
          <div>
            <div>
              <strong>
                {value.data.startDate} → {value.data.endDate}
              </strong>
            </div>

            {Object.entries(value.data.weeklyAvailability || {}).map(
              ([day, info]) =>
                info?.enabled && (
                  <div key={day} className="small text-muted">
                    {day}: {info.start} – {info.end}
                  </div>
                )
            )}
          </div>
        )}

        {/* 🔹 On Demand */}
        {value.availability_id === 33 && value?.data && (
          <div>
            <div className="small">
              Response SLA:{" "}
              {Array.isArray(value.data.responseSLA)
                ? value.data.responseSLA.join(", ")
                : "-"}
            </div>
            <div className="small">
              Instructions: {value.data.instructions || "-"}
            </div>
          </div>
        )}
      </div>
    )}

    {showModal && (
      <AvailabilityModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveAvailability}
        initialMode={Number(selectedMode)}
        initialValue={null}
        sessionDurationMinutes={sessionDurationMinutes}
      />
    )}
  </>
);

}
