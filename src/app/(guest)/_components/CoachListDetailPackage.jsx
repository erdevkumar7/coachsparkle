"use client";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
export default function CoachingListDetailPackage({ packages }) {
  return (
    <>
      <div className="session-wrapper">
        {packages.map((pkg, index) => (
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
                {pkg?.description ? <li>{pkg?.description}</li> : ""}
              </ul>
              <div className="price">
                {pkg?.price} / {pkg?.price_model?.name}
              </div>
              <a href="#" className="book-btn">
                View Details and Booking Now!
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
