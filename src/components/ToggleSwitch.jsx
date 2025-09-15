import { useState } from "react";
import "./_styles/toggle_switch.css";

export default function ToggleSwitch({
  label = "",
  value = false,
  onChange = () => {},
  onLabel = "ON",
  offLabel = "OFF",
}) {
  return (
    <div className="d-flex align-items-center gap-2 mb-3 mobile-view-toggle-add">
      <span className="title">{label}</span>
      <div
        className={`toggle-switch ${value ? "active" : ""}`}
        onClick={() => onChange(!value)}
        role="button"
        style={{ userSelect: "none" }}
      >
        <div className="switch-knob" />
        <span className="switch-label">{value ? onLabel : offLabel}</span>
      </div>
    </div>
  );
}