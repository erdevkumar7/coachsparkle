import "./booking_modes.css";
export default function OnDemandAvailability({ value = {}, onChange }) {
  return (
    <div>
      <h6 className="mb-3">On-Demand Booking</h6>

      <label>Response Time</label>
      <select
        className="form-control mb-2"
        value={value.responseSLA || 24}
        onChange={(e) => onChange({ ...value, responseSLA: Number(e.target.value) })}
      >
        <option value={4}>Within 4 hours</option>
        <option value={12}>Within 12 hours</option>
        <option value={24}>Within 24 hours</option>
        <option value={48}>Within 48 hours</option>
        <option value={72}>Within 72 hours</option>
      </select>

      <label>Instructions for Clients</label>
      <textarea
        className="form-control instructions-textarea"
        rows={6}
        value={value.instructions || ""}
        onChange={(e) => onChange({ ...value, instructions: e.target.value })}
      />
    </div>
  );
}
