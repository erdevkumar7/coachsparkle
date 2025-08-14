"use client";

import { useEffect, useState } from "react";
import { getMasterFaq } from "@/app/api/guest";
import "../_styles/support.css";
import "../_styles/dashboard.css";

export default function Support() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getMasterFaq();
        console.log("All FAQ Data:", data);

        // Filter only "User" FAQs (adjust logic based on your API structure)
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

  return (
    <div className="main-panel">
      <div className="content-wrapper new-content-wrapper coach-wrap">
        {/* Contact Support Form */}
        <div className="faq-support-add">
          <h4>Contact Support</h4>
          <form>
            <div className="faq-form-add row mb-3 ">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" className="form-control" placeholder="Emma" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="info@gmail.com" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="userType" className="form-label">I am a...</label>
                    <select id="userType" className="form-select">
                        <option>User</option>
                        <option>Coach</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="reason" className="form-label">Reason for Contact</label>
                    <select id="reason" className="form-select">
                        <option>Technical Issue</option>
                        <option>Billing Inquiry</option>
                        <option>General Question</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input type="text" id="subject" className="form-control" placeholder="Enter subject" />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description of The Issue</label>
                <textarea id="description" className="form-control" rows="3" placeholder="Describe your issue"></textarea>
            </div>

            <div className="attach-screenshot">
                <p>Attach a Screenshot</p>
                <div className="custom-file-input-wrapper">

                    <input type="file" id="cert-upload" accept=".jpg,.jpeg" className="custom-file-hidden" multiple="" name="upload_credentials" />
                    <label htmlFor="cert-upload" className="custom-file-btn">Choose file</label>
                    <span className="custom-file-placeholder">No file chosen</span>
                </div>
            </div>

            <div className="form-checkbox">
                <input className="form-checkbox-input" id="corporateCheck" type="checkbox" name="is_corporate" />
                <label className="form-checkbox-label" htmlFor="corporateCheck">
                    I agree to be contacted via email.</label>
            </div>

            <button type="submit" className="btn btn-primary">
                Submit <i className="bi bi-arrow-right"></i>
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
