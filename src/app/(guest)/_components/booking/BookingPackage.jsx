"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import ShareIcon from "@mui/icons-material/Share";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import Booking from "./Booking";

const packages = [
  {
    title: "Breakthrough Package",
    image: "/coachsparkle/images/package-full-popup.png",
    price: "$250",
  },
  {
    title: "Breakthrough Package",
    image: "/coachsparkle/images/package-full-popup.png",
    price: "$250",
  },
  {
    title: "Breakthrough Package",
    image: "/coachsparkle/images/package-full-popup.png",
    price: "$250",
  },
  {
    title: "Breakthrough Package",
    image: "/coachsparkle/images/package-full-popup.png",
    price: "$250",
  },
  {
    title: "Breakthrough Package",
    image: "/coachsparkle/images/package-full-popup.png",
    price: "$250",
  },
  {
    title: "Breakthrough Package",
    image: "/coachsparkle/images/package-full-popup.png",
    price: "$250",
  },
];

const BookingPackage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookNowClick = () => {
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
  };

  return (
    <>
      {showBooking ? (
        <>
          <div>
            <Booking />
          </div>
        </>
      ) : (
        <>
          <div className="service-page">
            <div className="text-center mt-5">
              <img
                src="/coachsparkle/images/coach-list-img-one.png"
                className="rounded-circle mb-2 coach-avatar"
                alt="Coach"
              />
              <h3 className="mb-4">Sarah Lee</h3>
              <p className="coach-bio">
                Former marketing exec turned confidence coach. I help
                professionals break free from self-doubt and step into bold,
                fulfilling careers. My goal is to empower lasting change with
                empathy, mindfulness, and accountability.
              </p>
             <div className="manage-btn-add">
              <button className="btn mb-4 msg-btn">
                Message Coach <i className="bi bi-arrow-right"></i>
              </button>
              </div>
            </div>

            <div className="swiper-wrapper-container position-relative">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                slidesPerView={1}
                loop
                className="package-swiper"
              >
                {packages.map((pkg, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="card package-card mx-auto">
                      <div className="card-header d-flex justify-content-between align-items-start border-0">
                        <img
                          src={pkg.image}
                          alt="Package"
                          className="card-img-top rounded-top"
                        />
                        <button className="btn btn-light share-btn">
                          <ShareIcon />
                        </button>
                      </div>
                      <div className="card-body text-start">
                        <h5 className="mb-1">{pkg.title}</h5>
                        <div className="d-flex gap-3 small mb-2 icons">
                          <PersonalVideoIcon className="text-muted" /> Online
                          <PersonOutlineOutlinedIcon className="text-muted" />{" "}
                          1-on-1 coaching
                          <CalendarMonthOutlinedIcon className="text-muted" />{" "}
                          Jun - Aug 2025
                        </div>
                        <div className="d-flex gap-3 small mb-2">
                          <ForumOutlinedIcon className="text-muted" />3 Sessions
                          <i
                            className="bi bi-clock-history"
                            style={{ transform: "scaleX(-1)" }}
                          ></i>{" "}
                          60 min/Session
                        </div>
                        <div className="d-flex gap-3 small mb-2">
                          <GpsFixedIcon className="text-muted" /> Confidence,
                          Goal clarity, Custom action plan
                        </div>
                        <div className="mt-4 content">
                          <p>
                            Designed for short-term goal clarity and mindset
                            shifts. Ideal if you're preparing for a
                            presentation, career pivot, or tough decision.
                          </p>
                        </div>
                        <div className="content">
                          <h6>What This Package Helps You Achieve:</h6>
                          <span>
                            Gain clarity and confidence to tackle high-stakes
                            situations like:
                          </span>
                          <ul>
                            <li>Job interviews</li>
                            <li>Job interviews</li>
                            <li>Career moves or life transitions</li>
                            <li>
                              Shift limiting beliefs and adopt an empowered
                              mindset
                            </li>
                            <li>
                              Build a focused action plan with support between
                              sessions
                            </li>
                          </ul>
                        </div>

                        <div className="content">
                          <h6>Package Format:</h6>

                          <ul>
                            <li>3 live video sessions (60 minutes each)</li>
                            <li>
                              Sessions are spaced flexibly within a 6-week
                              window
                            </li>
                            <li>
                              Conducted via Zoom or preferred video platform
                            </li>
                            <li>
                              Includes a short <strong>per-session</strong> prep
                              form for each session
                            </li>
                          </ul>
                        </div>

                        <div className="content">
                          <h6>What’s Included:</h6>

                          <ul>
                            <li>3 one-on-one coaching sessions with Sarah</li>
                            <li>
                              Printable coaching worksheets tailored to your
                              goals
                            </li>
                            <li>
                              Voice note support between sessions (Mon–Fri) via
                              preferred app
                            </li>
                            <li>
                              Optional accountability check-ins if requested
                            </li>
                          </ul>
                        </div>

                        <div className="content">
                          <h6>Who Should Book This:</h6>

                          <ul>
                            <li>
                              Professionals preparing for a big moment or change
                            </li>
                            <li>
                              Individuals seeking clarity and short-term
                              progress
                            </li>
                            <li>
                              Returning clients who want a focused tune-up
                            </li>
                          </ul>
                        </div>

                        <div className="content">
                          <h6>Before You Book:</h6>

                          <ul>
                            <li>
                              You’ll receive an onboarding email with scheduling
                              links
                            </li>
                            <li>
                              You must complete all 3 sessions within 6 weeks
                            </li>
                            <li>
                              Complete a short intake form before your first
                              session
                            </li>
                          </ul>
                        </div>

                        <div className="content">
                          <h6>Cancellation & Rescheduling Policy:</h6>

                          <ul>
                            <li>
                              24-hour notice required for all cancellations
                            </li>
                            <li>One free reschedule allowed per session</li>
                            <li>
                              Missed sessions without notice are forfeited
                            </li>
                          </ul>
                        </div>

                        <div className="text-center mt-4">
                          <h4>
                            {pkg.price} <small>/ Package</small>
                          </h4>
                          <button
                            className="btn book-btn mt-2"
                            onClick={handleBookNowClick}
                          >
                            Schedule and Book Now!
                          </button>
                        </div>

                        <div className="d-flex gap-2 mt-4 small">
                          <i
                            className="bi bi-fire"
                            style={{ transform: "scaleX(-1)" }}
                          ></i>
                          Only 2 slots left!
                          <br />
                        </div>
                        <div className="small">
                          For clients seeking focused support for a short-term
                          goal or life transition
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="swiper-button-prev custom-arrow">
                <ArrowBackSharpIcon className="arrow-icon" />
              </button>

              <button className="swiper-button-next custom-arrow">
                <ArrowForwardSharpIcon className="arrow-icon" />
              </button>
            </div>

            <div className="text-center numbering mt-3 mb-5">
              <small className="fw-bold large">
                <span>{currentIndex + 1}</span> / {packages.length}
              </small>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookingPackage;
