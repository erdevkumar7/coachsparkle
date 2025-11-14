"use client";
import { getUserCompletedCoachingClient, submitUserReview } from "@/app/api/user-client";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { newDateTimeFormatter } from "@/lib/commonFunction";

export default function CompletedCoaching({ initialCompleted, token }) {
  const router = useRouter();
  const [getCompleted, setCompleted] = useState(initialCompleted.data);
  const [currentPage, setCurrentPage] = useState(initialCompleted.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialCompleted.pagination.last_page);
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [viewingReview, setViewingReview] = useState(false);

  const handleOpen = (packageId, review = null) => {
    setSelectedPackage(packageId);
    if (review) {
      setReviewText(review.review_text);
      setRating(Number(review.rating));
      setViewingReview(true);
    } else {
      setReviewText("");
      setRating(0);
      setViewingReview(false);
    }
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setReviewText("");
    setRating(0);
    setSelectedPackage(null);
    setViewingReview(false);
  };

  const handleSubmit = async () => {
    if (!selectedPackage) {
      alert("Please provide a Package.");
      return;
    }

    if (rating === 0 || reviewText == "") {
      alert("Please provide both rating and review.");
      return;
    }

    const payload = {
      package_id: selectedPackage,
      review_text: reviewText,
      rating: rating,
    };

    const res = await submitUserReview(payload, token);

    if (res.error) {
      alert(res.error);
    } else {
      toast.success("Review submitted successfully!");
      fetchPageData(currentPage);
      handleClose();
    }
  };

  const fetchPageData = async (page) => {
    const res = await getUserCompletedCoachingClient(page, token);
    if (res?.data) {
      setCompleted(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };
  console.log('getCompletedgetCompleted', getCompleted)
  return (
    <div className="mt-5 meditation-package">
      <div className="coaching-progress-status">
        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
          <div>
            <h3>
              Completed Coaching ({initialCompleted.pagination.total > 0 && initialCompleted.pagination.total < 10 ? `0${initialCompleted.pagination.total}` : initialCompleted.pagination.total})
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

        {isOpen && (<div className="d-flex justify-content-between flex-wrap py-4 px-4">
          <div className="row gap-4">
            {getCompleted.map((completed, index) => (
              <div key={index} className="col-md-4 coaching-progress p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0"> {completed.review ? (
                    <>
                      Complete review
                    </>
                  ) : (
                    <>
                      Pending review
                    </>
                  )}</h4>
                </div>
                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill">
                    Completed
                  </button>
                </div>

                <div className="d-flex align-items-start gap-2 mb-3 content">
                  <div>
                    <img
                      src={completed?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                      alt="User"
                      className="rounded-circle"
                      style={{ width: '50px', height: '50px' }} />
                  </div>
                  <div>
                    <span className="fw-semibold d-block name">
                      {completed.package_title?.slice(0, 20)} With {completed.first_name} {completed.last_name}
                    </span>
                    <span className="d-block time">
                      {/* Completed {completed.session_date_end} */}
                      Completed {newDateTimeFormatter(completed.session_date_end, completed.slot_time_end)}
                    </span>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  {completed.review ? (
                    <button
                      className="btn btn-primary button-note"
                      onClick={() => handleOpen(completed.package_id, completed.review)}
                    >
                      View Review
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary button-note"
                      onClick={() => handleOpen(completed.package_id)}
                    >
                      Leave a Review
                    </button>
                  )}
                  <button
                    className="btn btn-outline-secondary button-msg"
                    onClick={() => {
                      router.push(`/user/user-message/3?coach_id=${completed.package_coach_id}`)
                    }}
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={`modal-overlay ${show ? "visible" : "hidden"}`} onClick={handleClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content-review review-modal review">
                <div className="modal-header border-0">
                  <button type="button" className="btn-close" onClick={handleClose}></button>
                </div>

                <div className="modal-body text-center">
                  <h4 className="fw-bold">{viewingReview ? "View Review" : "Leave a Review"}</h4>
                  {viewingReview ? (
                    <>
                      <div className="mb-3">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            style={{ fontSize: "28px", color: star <= rating ? "#fbbc05" : "#e4e5e9", marginRight: "4px" }}
                          >★</span>
                        ))}
                      </div>
                      <p>{reviewText}</p>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            style={{ cursor: "pointer", fontSize: "28px", color: star <= rating ? "#fbbc05" : "#e4e5e9", marginRight: "4px" }}
                            onClick={() => setRating(star)}
                          >★</span>
                        ))}
                      </div>
                      <textarea
                        className="form-control review-textarea"
                        rows="6"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                      ></textarea>
                    </>
                  )}
                </div>

                {!viewingReview && (
                  <div className="modal-footer border-0 justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button className="btn btn-outline-primary" onClick={handleClose}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={fetchPageData}
          />
        </div>)}
      </div>
    </div>
  );
}
