"use client";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useRouter } from "next/navigation";
import { formatBookingAvailability } from "@/lib/commonFunction";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ViewServicePackage({ pkg, allPackageIds, onDelete }) {
  const router = useRouter();
  const token = Cookies.get('token');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    router.push(`/coach/all-packages/${pkg.id}?coach_id=${pkg.coach_id}`);
    localStorage.setItem("allPackages", JSON.stringify(allPackageIds));
  };

  const handleDeletePackage = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-package`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ package_id: pkg.id }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Package deleted successfully!");
        if (onDelete) onDelete(pkg.id); // remove from UI instantly
        router.refresh(); // optional: ensure data sync
      } else {
        toast.error(data.message || "Failed to delete package");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting the package.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* ===== Package Card ===== */}
      <div className="col-md-3 session-card">
        <img
          src={
            pkg?.media_file
              ? pkg?.media_file
              : `${FRONTEND_BASE_URL}/images/package1.webp`
          }
          alt="Package Image"
          className="top-image"
        />
        <div className="session-pkg-content">
          <h2>{pkg?.title}</h2>
          <div className="icons-row first-online-add">
            <PersonalVideoIcon className="mui-icons" /> {pkg?.delivery_mode?.mode_name}
            <PersonOutlineOutlinedIcon className="mui-icons" /> {pkg?.session_format?.name}
            <CalendarMonthOutlinedIcon className="mui-icons" />{" "}
            {formatBookingAvailability(pkg?.booking_availability_start, pkg?.booking_availability_end) || "Jun - Aug 2025"}
          </div>
          <div className="icons-row">
            <ForumOutlinedIcon className="mui-icons" /> {pkg?.session_count} Sessions{" "}
            <i className="bi bi-clock-history" style={{ transform: "scaleX(-1)" }}></i>{" "}
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
              <button
                className="cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>
            </div>
            <div className="btn-action-add">
              <button className="cursor-pointer" onClick={handleClick}>
                View Details
              </button>
              <button className="cursor-pointer">
                <ShareIcon />
              </button>
            </div>
            <div
              className={`status status-${pkg?.package_status === 1
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

      {/* ===== Delete Confirmation Modal ===== */}
      {showModal && (
        <div className="coachpkg-modal-overlay">
          <div className="coachpkg-modal-container">
            <h4>Are you sure you want to delete this package?</h4>
            <p>This action cannot be undone.</p>
            <div className="coachpkg-modal-actions">
              <button
                className="coachpkg-btn coachpkg-btn-secondary "
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="coachpkg-btn coachpkg-btn-danger"
                onClick={handleDeletePackage}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
            <button className="coachpkg-modal-close" onClick={() => setShowModal(false)}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ===== Simple Inline Styles for modal ===== */}
      {/* <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .modal-container {
          background: white;
          padding: 20px 30px;
          border-radius: 12px;
          text-align: center;
          position: relative;
          width: 350px;
        }
        .modal-actions {
          margin-top: 20px;
          display: flex;
          justify-content: space-around;
        }
        .btn {
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-secondary {
          background: #ccc;
          border: none;
        }
        .btn-danger {
          background: #d9534f;
          color: white;
          border: none;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style> */}
    </>
  );
}
