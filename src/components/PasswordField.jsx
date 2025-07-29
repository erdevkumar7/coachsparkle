import { useState } from "react";
import "./_styles/password_field.css";

export default function PasswordField({ label, name, register, error }) {
  const [visible, setVisible] = useState(false);


  return (
    <div className="password-field">
      <label className="form-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={visible ? "text" : "password"}
          className={`form-control`}
          placeholder={label}
           {...register(name)}
        />
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setVisible(!visible)}
        >
          <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
      </div>
       {error && <div className="invalid-feedback d-block">{error.message}</div>}
    </div>
  );
}
