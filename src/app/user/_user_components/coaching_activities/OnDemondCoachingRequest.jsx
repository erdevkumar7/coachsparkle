"use client";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { getUserProgressCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { newDateTimeFormatter } from "@/lib/commonFunction";

export default function CoachingProgress({ initialProgress, token }) {
//   const router = useRouter();
//   const [getCoahcingProgress, setCoahcingProgress] = useState(initialProgress.data);
//   const [currentPage, setCurrentPage] = useState(initialProgress.pagination.current_page);
//   const [lastPage, setLastPage] = useState(initialProgress.pagination.last_page);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

//   const fetchPageData = async (page) => {
//     const res = await getUserProgressCoachingClient(page, token);
//     if (res?.data) {
//       setCoahcingProgress(res.data.data);
//       setCurrentPage(res.data.pagination.current_page);
//       setLastPage(res.data.pagination.last_page);
//     }
//   };


//   const handleViewRequest = (rqst) => {
//     console.log('item', rqst)
//     setSelectedRequest(rqst);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedRequest(null);
//   };


  // const coachingProgress = [
  //   {
  //     title: "Session Booked",
  //     sessionLeft: "1 Session left",
  //     status: "Confirmed",
  //     userImage: "/coachsparkle/assets/images/coaching-img.png",
  //     packageTitle: "Breakthrough Package With User Display Name",
  //     time: "Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)",
  //     platformIcon: "/coachsparkle/images/zoom.png",
  //     primaryAction: "View Session",
  //     secondaryAction: "Message",
  //   },  
  // ];

  // console.log('getCoahcingProgress', getCoahcingProgress)

  return (
    <>
      <div className="mt-5">
        <div className="coaching-progress-status">
          <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
            <div>
              <h3>
                On Demond Coaching Request
              </h3>
            </div>
            <div
              className="sorting-data d-flex align-items-center gap-2"
              onClick={() => setIsOpen((prev) => !prev)}
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
        </div>
      </div>
    </>
  );
}
