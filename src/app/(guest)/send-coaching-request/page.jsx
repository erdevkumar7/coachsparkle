"use client";
import { useRef, useState } from 'react';
import '../_styles/coach_request_form.css';

export default function SendCoachingRequest(){
    const languageOptions = ["German", "English", "French", "Hindi"];

    const [selected, setSelected] = useState([false]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    dropdownRef.current.classList.toggle("show");
  };

  const handleSelect = (language) => {
    if (!selected.includes(language)) {
      setSelected([...selected, language]);
    }
  };

  const removeTag = (lang) => {
    setSelected(selected.filter((item) => item !== lang));
  };

    return(
        <div className="container send-request py-5">
        <p className="text-center request-heading mb-4">
          Tell us what you need, set your preferences, and we’ll do the rest. Simply select your coaching category, describe your goal, and choose your preferred delivery mode, language, availability, and communication method. We’ll notify all qualified coaches who match your request, and they’ll reach out to you directly with offers or next steps.
        </p>
      <div className="request-form mx-auto shadow-sm">

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">I am looking for*</label>
            <input type="text" className="form-input" placeholder="Wellness & Health Coaches" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Coaching Category*</label>
            <select className="form-selectbox">
              <option>Fitness Coach</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Preferred Mode of Delivery*</label>
            <select className="form-selectbox">
              <option>Online</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Location*</label>
            <select className="form-selectbox">
              <option>Singapore</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Goal Or Objective Of Coaching/Learning*</label>
            <textarea className="form-textarea" placeholder="e.g. Improve confidence, Career advancement..." rows="5"></textarea>
          </div>
          <div className="col-md-6">
            <div className="mb-3 position-relative">
      <label className="form-label">Language Preference*</label>
      <div className="form-select-multi" onClick={toggleDropdown}>
        {selected.length === 0 && <span className="placeholder">Select language</span>}
        {selected.map((lang) => (
          <span className="pill-tag" key={lang}>
            {lang}
            <button type="button" onClick={() => removeTag(lang)}>&times;</button>
          </span>
        ))}
        <span className="dropdown-icon">&#9662;</span>
      </div>

      {/* Dropdown */}
      <ul className="dropdown-menu w-100" ref={dropdownRef}>
        {languageOptions.map((lang) => (
          <li key={lang}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleSelect(lang)}
              disabled={selected.includes(lang)}
            >
              {lang}
            </button>
          </li>
        ))}
      </ul>
    </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Preferred Communication Channel*</label>
            <select className="form-selectbox">
              <option>Video Call</option>
            </select>
          </div>
        </div>

        <div className="sub-form-section p-4 mt-4">
          <h3 className="mb-3 quick-text">Additional Fields</h3>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Learner's Age Group Or Demographic</label>
              <select className="form-selectbox">
                <option>Adults</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Preferred Coaching/Teaching Style</label>
              <select className="form-selectbox">
                <option>Free-Flow</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Budget Range</label>
              <input type="text" className="form-input" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Preferred Schedule</label>
              <input type="text" className="form-input" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Coach Gender</label>
              <select className="form-selectbox">
                <option>Female</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Coach Experience Level*</label>
              <select className="form-selectbox">
                <option>Highly Experienced</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Only Certified Coach</label>
              <select className="form-selectbox">
                <option>Yes</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Urgency Or Preferred Start Date</label>
              <select className="form-selectbox">
                <option>Flexible</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Special Requirements Or Notes</label>
              <textarea className="form-input" rows="2"></textarea>
            </div>
          </div>
        </div>

        <div className="form-check mt-4">
          <input className="form-check-input" type="checkbox" id="consentCheckbox" />
          <label className="form-check-label" htmlFor="consentCheckbox">
            Yes, please share my request with suitable coaches who can help me reach my goals.
          </label>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn submit-btn">
            Submit <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
    );
}