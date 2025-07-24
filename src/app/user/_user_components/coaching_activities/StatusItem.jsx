// components/StatusItem.jsx
import React from "react";

export default function StatusItem({ icon, title, count }) {
  return (
    <div className="status-bar d-flex align-items-center gap-1">
      <div>
        <img src={icon} alt={title} />
      </div>
      <div>
        <h4 className="coaching-tittle-text">{title}</h4>
        <span>
          <strong>{count}</strong>
        </span>
      </div>
    </div>
  );
}
