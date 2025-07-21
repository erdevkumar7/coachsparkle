import { useState } from "react";
import "./_styles/password_field.css";

export default function PasswordField({ label, name }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <label className="form-label fw-bold">{label}</label>
      <div className="input-wrapper">
        <input
          type={visible ? "text" : "password"}
          name={name}
          placeholder="Password"
          className="form-control"
        />
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setVisible(!visible)}
        >
          <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
      </div>
    </div>
  );
}
