"use client";
import { getOnDemondCoachingRequest } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { newDateTimeFormatter } from "@/lib/commonFunction";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function OnDemondCoachingRequest({ initialProgress, token }) {
   const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [getCoahcingProgress, setCoahcingProgress] = useState(initialProgress.data);
  const [currentPage, setCurrentPage] = useState(initialProgress.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialProgress.pagination.last_page);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

const handleViewRequest = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};
  return (
    <>
      <div className="mt-5 status-coaching-top">
        <div className="coaching-progress-status">
          <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
            <div>
              <h3>On Demond Coaching Request</h3>
            </div>
<div
  className="sorting-data d-flex align-items-center gap-2"
  onClick={handleViewRequest}
  style={{ cursor: "pointer" }}
>
  <ExpandMoreOutlinedIcon
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
    }}
  />
</div>
          </div>
          <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4"></div>
          </div>
        </div>
      </div>

{showModal && (
  <div className="request-modal-overlay">
    <div className="request-modal">
      <div className="request-modal-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Session Details</h5>
        <button className="request-close-btn" onClick={handleCloseModal}>
          &times;
        </button>
      </div>

      <div className="request-modal-main-body">
        <p>Modal Test</p>
      </div>
    </div>
  </div>
)}
    </>
  );
}