import React, { useState } from "react";

export default function IndustryInsights() {
  const [isProUser, setIsProUser] = useState(false);

  const topServices = [
    "Career Advancement",
    "Public Speaking",
    "Interview Skills",
  ];

  return (
    <div className="mb-4 border rounded p-3 bg-white position-relative">
      <div className="d-flex justify-content-start gap-2 align-items-center mb-3">
        <h5 className="mb-0 fw-semibold">
          Industry Insights{" "}
          {!isProUser && <i className="bi bi-lock-fill text-warning ms-1"></i>}
        </h5>
        {!isProUser && (
          <div className="badge bg-light text-dark border small px-2 py-3">
            <i className="bi bi-info-circle me-1 text-primary"></i>
            This feature is available in the <strong>Pro Coach Plan.</strong>{" "}
            <a href="#" className="text-[#009BFA] fw-semibold ms-1 text-decoration-none">
              UPGRADE NOW
            </a>
          </div>
        )}
      </div>

      <div className="position-relative">
        {isProUser ? (
          <>
            <p className="text-muted mb-2">Top 3 searched services in your category</p>
            <ol className="mb-0 ps-3">
              {topServices.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </>
        ) : (
          <>
            <div
              className="bg-secondary bg-opacity-25 p-3 rounded"
              style={{
                filter: "blur(3px)",
                pointerEvents: "none",
              }}
            >
              <p className="text-muted mb-2">Top 3 searched services in your category</p>
              <ol className="mb-0 ps-3">
                {topServices.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="position-absolute top-50 start-50 translate-middle w-50">
              <div className="bg-warning-subtle border rounded p-3 shadow-lg text-dark">
                <strong className="d-block mb-1">Unlock Industry Insights</strong>
                <small>
                  Gain exclusive access to the top-searched service of your category.
                  Stay ahead of trends, tailor your offers and get more clients
                </small>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
