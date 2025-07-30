"use client";
import ShareIcon from "@mui/icons-material/Share";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useRouter } from "next/navigation";
export default function ViewServicePackage({ pkg, allPackageIds }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/coach/all-packages/${pkg.id}?coach_id=${pkg.coach_id}`);
    localStorage.setItem("allPackages", JSON.stringify(allPackageIds));
  };
  return (
    <>
      <div className="session-card">
        <img
          src={
            pkg?.media_file
              ? pkg?.media_file
              : `/coachsparkle/images/package1.webp`
          }
          alt="Team Image"
          className="top-image"
        />
        <div className="session-pkg-content">
          <h2>{pkg?.title}</h2>
          <div className="icons-row first-online-add">
            <PersonalVideoIcon className="mui-icons" />{" "}
            {pkg?.delivery_mode?.mode_name}
            <PersonOutlineOutlinedIcon className="mui-icons" />{" "}
            {pkg?.session_format?.name}
            <CalendarMonthOutlinedIcon className="mui-icons" /> Jun - Aug 2025
          </div>
          <div className="icons-row">
            <ForumOutlinedIcon className="mui-icons" /> {pkg?.session_count}{" "}
            Sessions
            <i
              className="bi bi-clock-history"
              style={{ transform: "scaleX(-1)" }}
            ></i>{" "}
            {pkg?.session_duration} Min/Session
          </div>
          <div className="icons-row strength-value">
            <GpsFixedIcon className="mui-icons" /> {pkg?.focus}
          </div>
          <p className="session-description">{pkg?.short_description}</p>
          <div className="pkg-price">
            ${pkg?.price} / {pkg?.price_model?.name}
          </div>
          <div className="d-flex justify-content-between action-btn">
            <div className="btn-action-add">
              <button className="cursor-pointer">Edit</button>
              <button className="cursor-pointer">Delete</button>
            </div>
            <div className="btn-action-add">
              <button className="cursor-pointer" onClick={handleClick}>View Details</button>
              <button className="cursor-pointer">
                <ShareIcon />
              </button>
            </div>
            <div
              className={`status status-${
                pkg?.package_status === 1
                  ? "published"
                  : pkg?.package_status === 2
                  ? "draft"
                  : pkg?.package_status === 0
                  ? "unpublished"
                  : ""
              }`}
            >
              <button>
                {pkg?.package_status === 1
                  ? "Published"
                  : pkg?.package_status === 2
                  ? "Draft"
                  : pkg?.package_status === 0
                  ? "Unpublished"
                  : ""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
