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
import BreadCrumb from "@/components/BreadCrumb";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { formatBookingWindow } from "@/lib/commonFunction";

// const packages = [
//   {
//     title: "Breakthrough Package",
//     image: "/coachsparkle/images/package-full-popup.png",
//     price: "$250",
//   },
//   {
//     title: "Breakthrough Package",
//     image: "/coachsparkle/images/package-full-popup.png",
//     price: "$250",
//   },
//   {
//     title: "Breakthrough Package",
//     image: "/coachsparkle/images/package-full-popup.png",
//     price: "$250",
//   },
//   {
//     title: "Breakthrough Package",
//     image: "/coachsparkle/images/package-full-popup.png",
//     price: "$250",
//   },
//   {
//     title: "Breakthrough Package",
//     image: "/coachsparkle/images/package-full-popup.png",
//     price: "$250",
//   },
//   {
//     title: "Breakthrough Package",
//     image: "/coachsparkle/images/package-full-popup.png",
//     price: "$250",
//   },
// ];

export default function BookingPackage({ pkg }) {
  console.log('paaa', pkg)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookNowClick = () => {
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
  };

  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    { label: "Sarah Lee", href: "#" },
    {
      label: "Services",
      onClick: () => setShowBooking(false),
    },
  ];

  if (showBooking) {
    breadcrumbItems.push({ label: "Booking", href: "#" });
  }

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
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
                src={pkg?.user?.profile_image ? pkg?.user?.profile_image : `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                className="rounded-circle mb-2 coach-avatar"
                alt="Coach"
              />
              <h3 className="mb-4">{pkg?.user?.first_name} {pkg?.user?.last_name}</h3>
              <p className="coach-bio">
                {pkg?.user?.short_bio}
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

                <SwiperSlide >
                  <div className="card package-card mx-auto">
                    <div className="card-header d-flex justify-content-between align-items-start border-0">
                      <img
                        src={pkg?.media_file}
                        alt="Package"
                        className="card-img-top rounded-top"
                      />
                      <button className="btn btn-light share-btn">
                        <ShareIcon />
                      </button>
                    </div>
                    <div className="card-body text-start">
                      <h5 className="mb-1">{pkg?.title}</h5>
                      <div className="d-flex gap-3 small mb-2 icons">
                        <PersonalVideoIcon className="text-muted" /> {pkg?.delivery_mode?.mode_name}
                        <PersonOutlineOutlinedIcon className="text-muted" />{" "}
                        {pkg?.session_format?.name}
                        <CalendarMonthOutlinedIcon className="text-muted" />{" "}
                        Jun - Aug 2025
                      </div>
                      <div className="d-flex gap-3 small mb-2">
                        <ForumOutlinedIcon className="text-muted" />{pkg?.session_count ? pkg?.session_count : 1} Sessions
                        <i
                          className="bi bi-clock-history"
                          style={{ transform: "scaleX(-1)" }}
                        ></i>{" "}
                        {pkg?.session_duration ? pkg?.session_duration : 1} min/Session
                      </div>
                      <div className="d-flex gap-3 small mb-2">
                        <GpsFixedIcon className="text-muted" />
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
                          <li>{pkg?.title}</li>
                          <li>{pkg?.description}</li>
                        </ul>
                      </div>

                      <div className="content">
                        <h6>Package Format:</h6>

                        <ul>
                          <li>{pkg?.session_count ? pkg?.session_count : 1}  sessions ({pkg?.session_duration ? pkg?.session_duration : 1} minutes each)</li>
                          <li>{pkg?.session_format?.name}</li>
                          <li>{pkg?.session_format?.description} </li>
                        </ul>
                      </div>

                      <div className="content">
                        <h6>What’s Included:</h6>

                        <ul>
                          <li>{pkg?.session_format?.name} coaching with {pkg?.user?.first_name}.</li>
                          <li>Session with {pkg?.coaching_category?.category_name}.</li>
                          <li>{pkg?.price_model?.description}</li>
                        </ul>
                      </div>

                      <div className="content">
                        <h6>Who Should Book This:</h6>

                        <ul>
                          <li>
                            {pkg?.age_group?.group_name}
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
                          {pkg?.booking_window &&
                            <li>
                              Booking availability: {formatBookingWindow(pkg.booking_window)}
                            </li>}
                        </ul>
                      </div>

                      <div className="content">
                        <h6>Cancellation & Rescheduling Policy:</h6>

                        <ul>
                          <li> {pkg?.cancellation_policy}</li>
                          <li> {pkg?.rescheduling_policy}</li>
                        </ul>
                      </div>

                      <div className="text-center mt-4">
                        <h4>
                          ${pkg?.price} <small>/ {pkg?.price_model?.name}</small>
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
                        Only {pkg?.booking_slots ? pkg?.booking_slots : '1'} slots left!
                        <br />
                      </div>
                      <div className="small">
                        For clients seeking focused support for a short-term
                        goal or life transition
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

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
                {/* <span>{currentIndex + 1}</span> / {packages.length} */}
              </small>
            </div>
          </div>
        </>
      )}
    </>
  );
};


