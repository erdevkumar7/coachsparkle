import "./booking_modes.css";

const SLA_OPTIONS = [
  { value: 4, label: "Within 4 hours" },
  { value: 12, label: "Within 12 hours" },
  { value: 24, label: "Within 24 hours" },
  { value: 48, label: "Within 48 hours" },
  { value: 72, label: "Within 72 hours" },
  { value: 0, label: "Other" },
];

export default function OnDemandAvailability({ value = {}, onChange }) {
  return (
    <div>
      <h6 className="mb-3">On-Demand Booking</h6>

      {/* ✅ Simple Select */}
      <label className="mb-1">Response Time</label>
      <select
        className="form-control"
        value={value.responseSLA || ""}
        onChange={(e) =>
          onChange({
            ...value,
            responseSLA: Number(e.target.value),
          })
        }
      >
        <option value="">Select response time</option>
        {SLA_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Instructions */}
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
