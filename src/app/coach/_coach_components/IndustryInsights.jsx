"use client";
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";

export default function IndustryInsights() {
  const { user } = useUser();
    let isProUser = user.subscription_plan.plan_name == 'Pro' ? true : false;
  // const [isProUser, setIsProUser] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const topServices = [
    "Career Advancement",
    "Public Speaking",
    "Interview Skills",
  ];

  return (
    <div className="mb-4 border rounded p-3 bg-white position-relative">
      <div className="d-flex justify-content-start gap-2 align-items-center mb-3">
        <h3 className="text-lg font-semibold quick-text">
          Industry Insights{" "}
          {!isProUser && (
            <span
              className="position-relative d-inline-block"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-lock-fill text-warning ms-1"></i>
              {showTooltip && (
                <div
                  className="position-absolute bg-light text-dark border small rounded shadow badge bg-light text-dark px-2 py-3"
                  style={{
                    top: "-80%",
                    left: "500%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    width: "220px",
                    whiteSpace: "normal",
                  }}
                >
                  <i className="bi bi-info-circle me-1 text-primary"></i>
                  This feature is available in the Pro Coach Plan.{" "}
                  <a
                    href="#"
                    className="text-[#009BFA] fw-semibold ms-1 text-decoration-none"
                  >
                    UPGRADE NOW
                  </a>
                </div>
              )}
            </span>
          )}
        </h3>
      </div>

      <div className="position-relative">
        {isProUser ? (
          <>
            <p className="text-muted mb-2">
              Top 3 searched services in your category
            </p>
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
              <p className="text-muted mb-2">
                Top 3 searched services in your category
              </p>
              <ol className="mb-0 ps-3">
                {topServices.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="position-absolute top-50 start-50 translate-middle w-50">
              <div
                className="rounded p-3 shadow-lg text-dark"
                style={{
                  backgroundColor: "#FEF8D3",
                  border: "1px solid #F5E26B",
                }}
              >
                <strong className="d-block mb-1">
                  Unlock Industry Insights
                </strong>
                <small>
                  Gain exclusive access to the top-searched service of your
                  category. Stay ahead of trends, tailor your offers and get
                  more clients
                </small>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
