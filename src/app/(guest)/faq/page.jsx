"use client";

import { useEffect, useState } from "react";
import { getMasterFaq } from "@/app/api/guest";
import "../_styles/about_us.css";
import "../_styles/faq.css";

export default function Faq() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getMasterFaq();
        console.log(data);
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);

  if (loading) {
    return <p className="text-center">Loading FAQs...</p>;
  }

  return (
    <div className="about-us-page-add">
      <section className="hero">
        <div>
          <h1>
            Frequently <strong>Asked Questions</strong>
          </h1>
          <div className="input-with-btn">
            <input
              type="text"
              placeholder="Search FAQs (e.g., how to cancel session, edit profile)"
            />
            <button type="button">
              Submit <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <div className="frequently-add">
        <div className="container">
          <p className="looking-coach-text">
            Whether you're looking for a coach or growing your coaching
            practice, we are here to support you. Find quick answers to help you
            navigate Coach Sparkle with ease.
          </p>

          <div className="accordion" id="accordionExample">
            {faqData.map((category, catIndex) => (
              <div key={category.id} className="accordion-text-top">
                <h4>
                  <img
                    src={`/coachsparkle/images/accordion-icon-${
                      category.id === 1
                        ? "one"
                        : category.id === 2
                        ? "two"
                        : category.id === 3
                        ? "three"
                        : category.id === 4
                        ? "four"
                        : "default"
                    }.png`}
                    alt="accordion-icon"
                  />{" "}
                  {category.name}
                </h4>
                {category.faqs.map((faq, faqIndex) => {
                  const headingId = `heading-${category.id}-${faq.id}`;
                  const collapseId = `collapse-${category.id}-${faq.id}`;
                  return (
                    <div className="accordion-item" key={faq.id}>
                      <h2 className="accordion-header" id={headingId}>
                        <button
                          className={`accordion-button ${
                            faqIndex === 0 ? "" : "collapsed"
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded={faqIndex === 0 ? "true" : "false"}
                          aria-controls={collapseId}
                        >
                          {faq.title}
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        className={`accordion-collapse collapse ${
                          faqIndex === 0 ? "show" : ""
                        }`}
                        aria-labelledby={headingId}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>{faq.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <p className="still-below-text">
              Still need help? Contact us <a href="#">here.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
