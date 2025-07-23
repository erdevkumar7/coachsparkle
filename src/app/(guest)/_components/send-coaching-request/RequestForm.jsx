"use client";
import { useRef, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb";
import { getSubCoachType } from "@/app/api/guest";
import Cookies from "js-cookie";

export default function RequestForm({
  coachType,
  ageGroup,
  deliveryMode,
  countries,
  languages,
  coachingCategory,
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    { label: "Send Coaching Request", href: "/send-coaching-request" },
  ];

  const [coachId, setCoachId] = useState();
  const [coachSubTypes, setSubCoachTypes] = useState([]);
  const dropdownRef = useRef(null);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));

    if (name === "looking_for") {
      setCoachId(value);
      getSubCoachType(value).then((subTypeRes) => {
        setSubCoachTypes(subTypeRes || []);
      });
    }
  };

  const toggleDropdown = () => {
    dropdownRef.current.classList.toggle("show");
  };

  const handleLanguageSelect = (id) => {
    if (!formData.language_preference.includes(id)) {
      setFormData((prev) => ({
        ...prev,
        language_preference: [...prev.language_preference, id],
      }));
    }
  };

  const removeLanguage = (id) => {
    setFormData((prev) => ({
      ...prev,
      language_preference: prev.language_preference.filter((l) => l !== id),
    }));
  };

  const [formData, setFormData] = useState({
    looking_for: "",
    coaching_category: "",
    preferred_mode_of_delivery: "",
    location: "",
    coaching_goal: "",
    language_preference: [],
    preferred_communication_channel: "",
    learner_age_group: "",
    preferred_teaching_style: "",
    budget_range: "",
    preferred_schedule: "",
    coach_gender: "",
    coach_experience_level: "",
    only_certified_coach: "",
    preferred_start_date_urgency: "",
    special_requirements: "",
    share_with_coaches: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

      const requiredFields = [
    "looking_for",
    "coaching_category",
    "preferred_mode_of_delivery",
    "location",
    "coaching_goal",
    "language_preference",
    "preferred_communication_channel",
    "learner_age_group",
    "preferred_teaching_style",
    "budget_range",
    "preferred_schedule",
    "coach_gender",
    "coach_experience_level",
    "only_certified_coach",
    "preferred_start_date_urgency",
    "special_requirements",
    "share_with_coaches",
  ];

  const missingFields = requiredFields.filter((field) => {
    const value = formData[field];
    return (
      value === "" ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    );
  });

  if (missingFields.length > 0) {
    alert("Please fill all required fields.");
    return;
  }

    try {
      const token = Cookies.get("token");
      console.log("Submitting form with data:", formData);
      const response = await fetch(`${apiUrl}/cochingRequestSend`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Raw response:", result);

    if (!response.ok || result.status === false) {
      console.error("Backend error:", result.message || "Submission failed.");
      alert(result.message || "Something went wrong");
      return;
    }
      alert("Request submitted successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="container send-request py-5">
        <p className="text-center request-heading mb-4">
          Tell us what you need, set your preferences, and we’ll do the rest.
          Simply select your coaching category, describe your goal, and choose
          your preferred delivery mode, language, availability, and
          communication method. We’ll notify all qualified coaches who match
          your request, and they’ll reach out to you directly with offers or
          next steps.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="request-form mx-auto shadow-sm">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">I am looking for*</label>
                <select
                  className="form-selectbox"
                  name="looking_for"
                  value={formData.looking_for}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select category</option>
                  {coachType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Coaching Category*</label>
                <select
                  className="form-selectbox"
                  name="coaching_category"
                  value={formData.coaching_category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select sub category</option>
                  {coachSubTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.subtype_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Preferred Mode of Delivery*
                </label>
                <select
                  className="form-selectbox"
                  name="preferred_mode_of_delivery"
                  value={formData.preferred_mode_of_delivery}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose delivery mode</option>
                  {deliveryMode.map((mode) => (
                    <option key={mode.id} value={mode?.id}>
                      {mode.mode_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Location*</label>
                <select
                  className="form-selectbox"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select location</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">
                  Goal Or Objective Of Coaching/Learning*
                </label>
                <textarea
                  name="coaching_goal"
                  value={formData.coaching_goal}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="e.g. Improve confidence, Career advancement..."
                  rows="5"
                ></textarea>
              </div>
              <div className="col-md-6">
                <div className="mb-3 position-relative">
                  <label className="form-label">Language Preference*</label>
                  <div className="form-select-multi" onClick={toggleDropdown}>
                    {languages.map((language) => (
                      <span key={language.id} value={language.id}></span>
                    ))}
                    {formData.language_preference.map((langId) => {
                      const language = languages.find((l) => l.id === langId);
                      return (
                        <span className="pill-tag" key={langId}>
                          {language?.language || "Unknown"}
                          <button
                            type="button"
                            onClick={() => removeLanguage(langId)}
                          >
                            &times;
                          </button>
                        </span>
                      );
                    })}
                    <span className="dropdown-icon">&#9662;</span>
                  </div>

                  <ul className="dropdown-menu w-100" ref={dropdownRef}>
                    {languages.map((lang) => (
                      <li key={lang.id}>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => handleLanguageSelect(lang.id)}
                          disabled={formData.language_preference.includes(
                            lang.id
                          )}
                        >
                          {lang.language}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Preferred Communication Channel*
                </label>
                <select
                  className="form-selectbox"
                  name="preferred_communication_channel"
                  value={formData.preferred_communication_channel}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select communication channel</option>
                  <option value={1}>Video Call</option>
                </select>
              </div>
            </div>

            <div className="sub-form-section p-4 mt-4">
              <h3 className="mb-3 quick-text">Additional Fields</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Learner's Age Group Or Demographic
                  </label>
                  <select
                    className="form-selectbox"
                    name="learner_age_group"
                    value={formData.learner_age_group}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select age</option>
                    {ageGroup.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.group_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Preferred Coaching/Teaching Style
                  </label>
                  <select
                    className="form-selectbox"
                    name="preferred_teaching_style"
                    value={formData.preferred_teaching_style}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select teaching style</option>
                    {coachingCategory.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Budget Range</label>
                  <input
                    type="text"
                    className="form-input"
                    name="budget_range"
                    value={formData.budget_range}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Preferred Schedule</label>
                  <input
                    type="text"
                    className="form-input"
                    name="preferred_schedule"
                    value={formData.preferred_schedule}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Coach Gender</label>
                  <select
                    className="form-selectbox"
                    name="coach_gender"
                    value={formData.coach_gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select gender</option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                    <option value={3}>Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Coach Experience Level*</label>
                                      <input
                    type="text"
                    className="form-input"
                    name="coach_experience_level"
                    value={formData.coach_experience_level}
                    onChange={handleChange}
                  />
                  {/* <select
                    className="form-selectbox"
                    name="coach_experience_level"
                    value={formData.coach_experience_level}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select experience</option>
                    <option value={1}>Highly Experienced</option>
                    <option value={2}>Mediun</option>
                    <option value={3}>Beginner</option>
                  </select> */}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Only Certified Coach</label>
                  <select
                    className="form-selectbox"
                    name="only_certified_coach"
                    value={formData.only_certified_coach}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Urgency Or Preferred Start Date
                  </label>
                  <select
                    className="form-selectbox"
                    name="preferred_start_date_urgency"
                    value={formData.preferred_start_date_urgency}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select start duration</option>
                    <option value={1}>Immediately</option>
                    <option value={2}>Within a week</option>
                    <option value={3}>Flexible</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">
                    Special Requirements Or Notes
                  </label>
                  <textarea
                    className="form-input"
                    rows="2"
                    name="special_requirements"
                    value={formData.special_requirements}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-check mt-4 d-flex align-items-center">
              <input
                className="form-checkbox"
                type="checkbox"
                id="consentCheckbox"
                name="share_with_coaches"
                checked={formData.share_with_coaches === 1}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="consentCheckbox">
                Yes, please share my request with suitable coaches who can help
                me reach my goals.
              </label>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn submit-btn">
                Submit <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
