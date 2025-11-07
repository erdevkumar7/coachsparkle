"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getMasterFaq } from "@/app/api/guest";
import "../_styles/support.css";
import "../_styles/dashboard.css";
import Cookies from "js-cookie";

export default function Support() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [reason, setReason] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [agreeToContact, setAgreeToContact] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch FAQs
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getMasterFaq();
        const userFaqs = data.filter(
          (category) =>
            category.name?.toLowerCase().includes("user") ||
            category.type === "user"
        );
        setFaqData(userFaqs);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);

  // Client-side validation
  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = ["Name is required."];
    if (!email.trim()) {
      newErrors.email = ["Email is required."];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = ["Invalid email format."];
    }
    if (!userType) newErrors.user_type = ["User type is required."];
    if (screenshot) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(screenshot.type)) {
        newErrors.screenshot = ["Only JPG and PNG images are allowed."];
      }
      if (screenshot.size > 2 * 1024 * 1024) {
        newErrors.screenshot = ["Screenshot must be less than 2MB."];
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validateForm()) return;

    setSubmitting(true);
    setErrors({});
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("user_type", userType);
      formData.append("user_id", userType); // Adjust if different from user_type
      formData.append("reason", reason);
      formData.append("subject", subject);
      formData.append("description", description);
      if (screenshot) {
        formData.append("screenshot", screenshot);
      }
      formData.append("agree_to_contact", agreeToContact ? 1 : 0);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/addsupportrequest`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
         },
        }
      );

      setSuccessMessage(res.data.message || "Support request added successfully");
      setName("");
      setEmail("");
      setUserType("");
      setReason("");
      setSubject("");
      setDescription("");
      setScreenshot(null);
      setAgreeToContact(false);
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Error submitting form:", err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Button enabled state
  const isFormValid =
    name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    ["1", "2", "3"].includes(userType) &&
    !Object.values(errors).some((err) => err && err.length);

  return (
    <div className="main-panel">
      <div className="content-wrapper new-content-wrapper coach-wrap">
        {/* Contact Support Form */}
        <div className="faq-support-add">
          <h4>Contact Support</h4>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="faq-form-add row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <small className="text-danger">{errors.name[0]}</small>}
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <small className="text-danger">{errors.email[0]}</small>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="userType" className="form-label">I am a...</label>
                <select
                  id="userType"
                  className="form-select"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="2">User</option>
                  {/* <option value="3">Coach</option> */}
                </select>
                {errors.user_type && <small className="text-danger">{errors.user_type[0]}</small>}
              </div>
              <div className="col-md-6">
                <label htmlFor="reason" className="form-label">Reason for Contact</label>
                <select
                  id="reason"
                  className="form-select"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Technical Issue</option>
                  <option>Billing Inquiry</option>
                  <option>General Question</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description of The Issue</label>
              <textarea
                id="description"
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="attach-screenshot">
              <p>Attach a Screenshot</p>
              <div className="custom-file-input-wrapper">
                <input
                  type="file"
                  id="cert-upload"
                  accept=".jpg,.jpeg,.png"
                  className="custom-file-hidden"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                />
                <label htmlFor="cert-upload" className="custom-file-btn">Choose file</label>
                <span className="custom-file-placeholder">
                  {screenshot ? screenshot.name : "No file chosen"}
                </span>
              </div>
              {errors.screenshot && <small className="text-danger">{errors.screenshot[0]}</small>}
            </div>

            <div className="form-checkbox">
              <input
                className="form-checkbox-input"
                id="corporateCheck"
                type="checkbox"
                checked={agreeToContact}
                onChange={(e) => setAgreeToContact(e.target.checked)}
              />
              <label className="form-checkbox-label" htmlFor="corporateCheck">
                I agree to be contacted via email.
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={!isFormValid || submitting}
              title={!isFormValid ? "Please complete all required fields correctly" : ""}
            >
              {submitting ? "Submitting..." : "Submit"} <i className="bi bi-arrow-right"></i>
            </button>
          </form>
        </div>

        {/* Dynamic User FAQs */}
        <div className="faq-support-add faqs-coaches">
          <h4>FAQs for Users</h4>
          {loading ? (
            <p>Loading FAQs...</p>
          ) : (
            <div className="accordion" id="accordionExample">
              {faqData.length > 0 ? (
                faqData.map((category) =>
                  category.faqs.map((faq, index) => {
                    const headingId = `heading-${category.id}-${faq.id}`;
                    const collapseId = `collapse-${category.id}-${faq.id}`;
                    return (
                      <div className="accordion-text-top" key={faq.id}>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id={headingId}>
                            <button
                              className={`accordion-button ${
                                index === 0 ? "" : "collapsed"
                              }`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${collapseId}`}
                              aria-expanded={index === 0 ? "true" : "false"}
                              aria-controls={collapseId}
                            >
                              {faq.title}
                            </button>
                          </h2>
                          <div
                            id={collapseId}
                            className={`accordion-collapse collapse ${
                              index === 0 ? "show" : ""
                            }`}
                            aria-labelledby={headingId}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>{faq.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                <p>No FAQs available for Users.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}