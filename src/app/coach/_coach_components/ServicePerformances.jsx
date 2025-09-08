"use client";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import EastIcon from '@mui/icons-material/East';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


export default function ServicePerformancess() {
  const { user } = useUser();
  let isProUser = user.subscription_plan.plan_name == 'Pro' ? true : false;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="position-relative">
      <div className="d-flex justify-content-start gap-2 align-items-center mb-3">
        <h3 className="text-lg font-semibold quick-text">
          Services Performances{" "}
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

      <div
        className="service-performance" style={{
          position: "relative",
          pointerEvents: !isProUser ? "none" : "auto",
        }}
      >
        <table className="w-100">
          <thead>
            <tr className="service-add">
              <th>Service Packages</th>
              <th>No. of Views</th>
              <th>Inquiry Rate</th>
              <th>Booking Confirmed</th>
              <th>Rating & Reviews</th>
              <th>Total Earnings</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="growth-package">
            <tr>
              <td>Career Growth Package</td>
              <td>12</td>
              <td>12</td>
              <td>2</td>
              <td>5.0</td>
              <td className="total-text">$175</td>
              <td>
                <span className="badge active">Active</span>
              </td>
              <td className="actions">
                <a href="#">
                 <DriveFileRenameOutlineOutlinedIcon className="mui-edit-icons"/>
                </a>
                <a href="#">
                 <DeleteOutlineOutlinedIcon className="mui-delet-add-icon"/>
                </a>
                <a href="#">
                 <RemoveRedEyeOutlinedIcon className="mui-eye-add-icon"/>
                </a>
              </td>
            </tr>
            <tr>
              <td>Confidence Coaching</td>
              <td>12</td>
              <td>12</td>
              <td>0</td>
              <td>0.0</td>
              <td className="total-text">$175</td>
              <td>
                <span className="badge active">Active</span>
              </td>
              <td className="actions">
                <a href="#">
                <DriveFileRenameOutlineOutlinedIcon className="mui-edit-icons"/>
                </a>
                <a href="#">
                <DeleteOutlineOutlinedIcon className="mui-delet-add-icon"/>                </a>
                <a href="#">
                <RemoveRedEyeOutlinedIcon className="mui-eye-add-icon"/>
                </a>
              </td>
            </tr>
            <tr>
              <td>Group Discussion Coaching</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0.0</td>
              <td className="total-text">$0</td>
              <td>
                <span className="badge unpublished">Unpublish</span>
              </td>
              <td className="actions">
                <a href="#">
                <DriveFileRenameOutlineOutlinedIcon className="mui-edit-icons"/>
                </a>
                <a href="#">
                <DeleteOutlineOutlinedIcon className="mui-delet-add-icon"/>
                </a>
                <a href="#">
                <RemoveRedEyeOutlinedIcon className="mui-eye-add-icon"/>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {!isProUser && (
        <div
          className="position-absolute top-50 start-50 translate-middle shadow-lg"
          style={{
            backgroundColor: "#FEF8D3",
            border: "1px solid #F5E26B",
            borderRadius: "8px",
            padding: "24px",
            width: "80%",
            zIndex: 10,
          }}
        >
          <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>
            Unlock Service Insights to Grow Smarter
          </h5>

          <p style={{ marginBottom: "10px", lineHeight: "1.5" }}>
            Track how your services are performing – from views and inquiries to
            bookings and ratings. Discover what’s working and fine-tune your
            offerings with real-time <strong>performance analytics</strong>.
          </p>

          <p style={{ fontWeight: "500", marginBottom: "12px" }}>
            Upgrade to Pro Plan to:
          </p>

          <div className="d-flex flex-wrap">
            <ul
              className="list-unstyled me-5"
              style={{ flex: 1, minWidth: "250px" }}
            >
              {[
                "See how many users are viewing each service",
                "Monitor inquiry and booking conversion rates",
              ].map((text, index) => (
                <li key={index} className="d-flex align-items-start mb-2">
                  <span
                    style={{
                      backgroundColor: "#28a745",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "12px",
                      marginRight: "10px",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <ul
              className="list-unstyled"
              style={{ flex: 1, minWidth: "250px" }}
            >
              {[
                "View client reviews and average ratings",
                "Track total earnings per package",
              ].map((text, index) => (
                <li key={index} className="d-flex align-items-start mb-2">
                  <span
                    style={{
                      backgroundColor: "#28a745",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "12px",
                      marginRight: "10px",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex justify-content-start start-making align-items-center mt-3 flex-wrap gap-2">
            <p className="mb-0">
              Start making data-driven decision for your coaching
            </p>
            <a
              href="#"
              className="btn btn-primary btn-sm fw-semibold"
              style={{
                backgroundColor: "#009BFA",
                border: "none",
                borderRadius: "10px",
                padding: "20px 16px",
              }}
            >
              Upgrade & Unlock Now <EastIcon className="mui-icons"/>
            </a>
          </div>
        </div>
      )}

      {isProUser ? (
        <div className="footer-btn mt-4">
          <button className="manage-btn">
            Manage Services <EastIcon className="mui-icons"/>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}