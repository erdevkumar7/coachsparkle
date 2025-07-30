"use client";
import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { formatBookingWindow } from "@/lib/commonFunction";
import { useRouter } from "next/navigation";


export default function ShowPackage({ pkg, allPackages }) {
  const router = useRouter();
  const [showBooking, setShowBooking] = useState(false);

  const currentIndex = allPackages.findIndex(p => p === pkg.id);

  const handleNavigation = (direction) => {
    const newIndex = direction === 'next'
      ? currentIndex + 1
      : currentIndex - 1;

    if (newIndex >= 0 && newIndex < allPackages.length) {
      const nextPackage = allPackages[newIndex];
      router.push(`/coach/all-packages/${nextPackage}?coach_id=${pkg.coach_id}`);
    }
  };

  const handleBookNowClick = () => {
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
  };

  if (showBooking) {
    breadcrumbItems.push({ label: "Booking", href: "#" });
  }

  return (
    <>
      <div className="service-page">
        <div className="swiper-wrapper-container position-relative">
          <div className="package-card">
            <div className="package-card-header d-flex justify-content-between align-items-start border-0">
              <img
                src={pkg?.media_file}
                alt="Package"
                className="card-img-top rounded-top"
              />
              <button className="btn share-btn">
                <ShareIcon />
              </button>
            </div>
            <div className="card-body text-start">
              <h5 className="mb-1">{pkg?.title}</h5>
              <div className="d-flex gap-3 small mb-2 icons">
                <PersonalVideoIcon className="text-muted mui-icons" /> {pkg?.delivery_mode?.mode_name}
                <PersonOutlineOutlinedIcon className="text-muted mui-icons" />{" "}
                {pkg?.session_format?.name}
                <CalendarMonthOutlinedIcon className="text-muted mui-icons" />{" "}
                Jun - Aug 2025
              </div>
              <div className="d-flex gap-3 small mb-2">
                <ForumOutlinedIcon className="text-muted mui-icons" />{pkg?.session_count ? pkg?.session_count : 1} Sessions
                <i
                  className="bi bi-clock-history mui-icons"
                  style={{ transform: "scaleX(-1)" }}
                ></i>{" "}
                {pkg?.session_duration ? pkg?.session_duration : 1} min/Session
              </div>
              <div className="d-flex gap-3 small mb-2">
                <GpsFixedIcon className="text-muted mui-icons" />
                {pkg?.focus ? pkg?.focus : 'N/A'}
              </div>
              <div className="mt-4 content">
                <p> {pkg?.short_description}</p>
              </div>
              <div className="content">
                <h6>What This Package Helps You Achieve:</h6>
                <span>
                  Gain clarity and confidence to tackle high-stakes
                  situations like:
                </span>
                <ul>
                  {pkg?.title && <li>{pkg?.title}</li>}
                  {pkg?.description && <li>{pkg?.description}</li>}
                </ul>
              </div>

              <div className="content">
                <h6>Package Format:</h6>

                <ul>
                  <li>{pkg?.session_count ? pkg?.session_count : 1}  sessions ({pkg?.session_duration ? pkg?.session_duration : 1} minutes each)</li>
                  {pkg?.session_format?.name && <li>{pkg?.session_format?.name}</li>}
                  {pkg?.session_format?.description && <li>{pkg?.session_format?.description} </li>}
                </ul>
              </div>

              <div className="content">
                <h6>What’s Included:</h6>

                <ul>
                  <li>{pkg?.session_format?.name} coaching with {pkg?.user?.first_name}.</li>
                  {pkg?.coaching_category?.category_name && <li>Session with {pkg?.coaching_category?.category_name}.</li>}
                  <li>{pkg?.price_model?.description}</li>
                </ul>
              </div>

              <div className="content">
                <h6>Who Should Book This:</h6>

                {pkg?.age_group?.group_name && <ul>
                  <li>
                    {pkg?.age_group?.group_name}
                  </li>
                </ul>}
              </div>

              <div className="content">
                <h6>Before You Book:</h6>

                <ul>
                  <li>
                    You’ll receive an onboarding email with scheduling
                    links
                  </li>
                  {pkg?.booking_window &&
                    <li>
                      Booking availability: {formatBookingWindow(pkg.booking_window)}
                    </li>}
                </ul>
              </div>

              <div className="content">
                <h6>Cancellation & Rescheduling Policy:</h6>

                <ul>
                  {pkg?.cancellation_policy && <li> {pkg?.cancellation_policy}</li>}
                  {pkg?.rescheduling_policy && <li> {pkg?.rescheduling_policy}</li>}
                </ul>
              </div>

              <div className="text-center mt-4">
                <h4>
                  ${pkg?.price} <small>/ {pkg?.price_model?.name}</small>
                </h4>
                {/* <button
                  className="btn book-btn mt-2"
                  onClick={handleBookNowClick}
                >
                  Schedule and Book Now!
                </button> */}
              </div>

              <div className="d-flex gap-2 mt-4 small">
                <i
                  className="bi bi-fire"
                  style={{ transform: "scaleX(-1)" }}
                ></i>
                Only {pkg?.booking_slots ? pkg?.booking_slots : '1'} slots left!
                <br />
              </div>
              <div className="small">
                For clients seeking focused support for a short-term
                goal or life transition
              </div>
            </div>
          </div>

          <button className={`${currentIndex === 0 ? 'prev-next-disable' : ''} swiper-button-prev custom-arrow`} onClick={() => handleNavigation('prev')}
            disabled={currentIndex === 0}>
            <ArrowBackSharpIcon className="arrow-icon" />
          </button>

          <button className={`${currentIndex === allPackages.length - 1 ? 'prev-next-disable' : ""} swiper-button-next custom-arrow`}>
            <ArrowForwardSharpIcon className="arrow-icon" onClick={() => handleNavigation('next')}
              disabled={currentIndex === allPackages.length - 1} />
          </button>
        </div>

        <div className="text-center numbering mt-3 mb-5">
          <small className="fw-bold large">
            <span>{currentIndex + 1}</span> / {allPackages.length}
          </small>
        </div>
      </div>
    </>
  );
};


