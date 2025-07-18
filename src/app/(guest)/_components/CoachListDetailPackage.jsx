"use client";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState } from "react";
export default function CoachingListDetailPackage({ packages }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 2;
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, packages.length - visibleCount)
    );
  };

  const visiblePackages = packages.slice(startIndex, startIndex + visibleCount);

  return (
    <>
      <div className="position-relative">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Coaching Packages</h4>
          <div className="prev-next-arrow d-flex gap-3">
            <button
              className="nav-arrow left-arrow"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="nav-arrow right-arrow"
              onClick={handleNext}
              disabled={startIndex + visibleCount >= packages.length}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="session-wrapper">
          {visiblePackages.map((pkg, index) => (
            <div className="session-card" key={index}>
              <img
                src={
                  pkg?.media_file
                    ? pkg?.media_file
                    : "/coachsparkle/images/package1.png"
                }
                alt="Team Image"
                className="top-image"
              />
              <div className="session-content">
                <h2>{pkg?.title}</h2>
                <div className="icons-row">
                  <PersonalVideoIcon />
                  {pkg?.delivery_mode?.mode_name} |
                  <PersonOutlineOutlinedIcon />
                  {pkg?.session_format?.name} |
                  <CalendarMonthOutlinedIcon />
                  Jun - Aug 2025
                </div>
                <div className="icons-row">
                  <ForumOutlinedIcon />
                  {pkg?.session_count} Sessions |
                  <i
                    className="bi bi-clock-history"
                    style={{ transform: "scaleX(-1)" }}
                  ></i>{" "}
                  {pkg?.session_duration} Min/Session
                </div>
                <div className="icons-row">
                  <GpsFixedIcon />
                  {pkg?.focus}
                </div>
                <p className="session-description">{pkg?.short_description}</p>
                <ul className="session-list">
                  {pkg?.description && (
                    <li>
                      {expandedIndex === index
                        ? pkg.description
                        : `${pkg.description.slice(0, 200)}`}
                      {pkg.description.length > 200 && (
                        <button
              className="read-more-btn btn btn-outline-primary mt-2"
              onClick={() => handleToggle(index)}
            >
              {expandedIndex === index ? "Read Less" : "Read More"}
            </button>
                      )}
                    </li>
                  )}
                </ul>

                <div className="price">
                  {pkg?.price} / {pkg?.price_model?.name}
                </div>
                <a href="#" className="book-btn">
                  View Details and Booking Now!
                </a>
                <div className="d-flex justify-content-start gap-2 mt-4" style={{fontSize: "12px"}}>
                  <i
                    className="bi bi-fire"
                    style={{ transform: "scaleX(-1)" }}
                  ></i>
                  {pkg?.booking_slots
                    ? `Only ${pkg?.booking_slots} slots left!`
                    : "Only 1 slots left!"}
                </div>
                <div className="mt-3" style={{fontSize: "12px"}}>
                  Best for first timers and those preparing for key life or
                  career transition
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
