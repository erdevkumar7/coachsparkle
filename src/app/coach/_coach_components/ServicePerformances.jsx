"use client";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import EastIcon from '@mui/icons-material/East';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import { getCoachServicePerformances } from "@/app/api/coach";
import { FRONTEND_BASE_URL } from "@/utiles/config";

// Helper function to get status badge
const getStatusBadge = (package_status) => {
  switch (package_status) {
    case 1:
      return <span className="badge active">Active</span>;
    case 2:
      return <span className="badge unpublished">Unpublished</span>;
    default:
      return <span className="badge unpublished">Unpublished</span>;
  }
};

// Helper function to calculate inquiry rate
const calculateInquiryRate = (viewCount, confirmedBooking) => {
  if (viewCount === 0) return 0;
  return ((confirmedBooking / viewCount) * 100).toFixed(1);
};

export default function ServicePerformancess({ servicePerformanceInitailData = [], token }) {
  const { user } = useUser();
  const router = useRouter();

  const [servicePerformances, setServicePerformances] = useState(servicePerformanceInitailData?.data);
  const [currentPage, setCurrentPage] = useState(servicePerformanceInitailData.pagination?.current_page);
  const [lastPage, setLastPage] = useState(servicePerformanceInitailData.pagination?.last_page);

  // const token = Cookies.get('token');
  let isProUser = user.subscription_plan.plan_status;
  const [showTooltip, setShowTooltip] = useState(false);

  // State for delete modal
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  // Open delete confirmation modal
  const handleOpenDeleteModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  // Handle package deletion
  const handleDeletePackage = async () => {
    if (!selectedService) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-package`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ package_id: selectedService.id }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        // Success - close modal and refresh data or update state
        toast.success('Package deleted successfully!');
        // You might want to refresh the data here or remove the item from state       
        handleCloseModal();
        // Optionally refresh the page or update the servicePerformances array
        router.refresh();  // Simple refresh approach

      } else {
        toast.error(result.message || 'Failed to delete package');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('An error occurred while deleting the package');
    } finally {
      setLoading(false);
    }
  };


  const handleManageService = () => {
    router.push(`/coach/service-packages`)
  }

  const fetchPageData = async (page) => {
    const res = await getCoachServicePerformances(page, token);
    if (res?.data) {
      setServicePerformances(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

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
        className="service-performance"
        style={{
          position: "relative",
          pointerEvents: !isProUser ? "none" : "auto",
        }}
      >
        {servicePerformances?.length > 0 ? (
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
              {servicePerformances.map((service) => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.view_count}</td>
                  <td>
                    {calculateInquiryRate(
                      parseInt(service.view_count) || 0,
                      service.confirmed_booking
                    )}%
                  </td>
                  <td>{service.confirmed_booking}</td>
                  <td>
                    <span>{service.review_rating}</span>
                  </td>
                  <td className="total-text">${service.total_earning}</td>
                  <td>
                    {getStatusBadge(service.package_status)}
                  </td>
                  <td className="actions">
                    <Link href={`/coach/service-packages/${service.id}/update`}>
                      <DriveFileRenameOutlineOutlinedIcon className="mui-edit-icons" />
                    </Link>
                    <button
                      className="btn btn-link p-0 border-0"
                      onClick={() => handleOpenDeleteModal(service)}
                      style={{ background: 'none', cursor: 'pointer' }}
                    >
                      <DeleteOutlineOutlinedIcon className="mui-delet-add-icon" />
                    </button>
                    {service.package_status === 1 ? <Link href={`/coach/all-packages/${service.id}?coach_id=${user?.user_id}`}>
                      <RemoveRedEyeOutlinedIcon className="mui-eye-add-icon" />
                    </Link> : <RemoveRedEyeOutlinedIcon className="mui-eye-add-icon new-disabled-eye-icon" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-performances-data">
            No service performances data available
          </div>
        )}
      </div>

      {/* ===== Delete Confirmation Modal ===== */}
      {showModal && (
        <div className="coachpkg-modal-overlay">
          <div className="coachpkg-modal-container">
            <h4>Are you sure you want to delete this package?</h4>
            <p><strong>{selectedService?.title}</strong></p>
            <p>This action cannot be undone.</p>

            <div className="coachpkg-modal-actions">
              <button
                className="coachpkg-btn coachpkg-btn-secondary"
                onClick={handleCloseModal}
                disabled={loading}
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
            <button
              className="coachpkg-modal-close"
              onClick={handleCloseModal}
              disabled={loading}
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
            bookings and ratings. Discover what's working and fine-tune your
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

          <div className="d-flex justify-content-center start-making align-items-center mt-3 flex-wrap gap-2">
            <p className="mb-0">
              Start making data-driven decision for your coaching
            </p>
            <Link
              href={`subscription-plan`}
              className="btn btn-primary btn-sm fw-semibold"
              style={{
                backgroundColor: "#009BFA",
                border: "none",
                borderRadius: "10px",
                padding: "11px 16px",
              }}
            >
              Upgrade & Unlock Now <EastIcon className="mui-icons" />
            </Link>
          </div>
        </div>
      )}

      {isProUser && servicePerformances?.length > 0 ? (
          <div className="footer-btn mt-4">
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={fetchPageData}
            />

            <button className="manage-btn" onClick={handleManageService}>
              Manage Services <EastIcon className="mui-icons" />
            </button>
          </div>
      ) : null}
    </div>
  );
}