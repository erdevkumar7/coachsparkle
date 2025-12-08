"use client";
// import "../_styles/coaching_activities.css";
import "../../../user/_styles/coaching_activities.css";
import { getUserCompletedCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const fetchPageData = async (page) => {
    const res = await getUserCompletedCoachingClient(page, token);
    if (res?.data) {
      setCompleted(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

  const HandleRequestreview = async (completedPkgId, completedPkgUserId) => {
    try {
      const reqResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachRequestreview`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "package_id": completedPkgId,
          "user_id": completedPkgUserId
        }),
      });

      if (reqResponse.ok) {
        toast.success("Review request sent successfully!");

        // Update state so UI refreshes automatically
        setCompleted(prev =>
          prev.map(item =>
            item.package_id === completedPkgId &&
              item.package_booked_user_id === completedPkgUserId
              ? { ...item, review_status: 1 } // or true
              : item
          )
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      console.log('request sent')
    }
  }

  // console.log('getCompleted', getCompleted)
  return (
    <div className="mt-5 status-complete">
      <div className="completed-status">
        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
          <div>
            <h3>Completed Coaching ({initialCompleted.pagination.total > 0 && initialCompleted.pagination.total < 10 ? `0${initialCompleted.pagination.total}` : initialCompleted.pagination.total})</h3>
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
        {isOpen && (
          <div className="d-flex justify-content-between flex-wrap py-4 px-4 inner-completed-status">
            <div className="row gap-4">
              {getCompleted.map((completed, index) => (
                <div className="col-md-4 completed p-3" key={index}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0"> {completed.review ? (
                      <>
                        Review Completed
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

                  <div className="d-flex align-items-start gap-3 mb-3 content">
                    <div>
                      <img
                        src={completed?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                        alt="User"
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        {/* {completed.name} */}
                        {completed.package_title?.slice(0, 20)} With {completed.first_name} {completed.last_name}
                      </span>
                      <span className="d-block time">Completed {completed.session_date_end}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    {/* <button className="btn btn-primary button-note">Request Review</button> */}

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
                        onClick={() => HandleRequestreview(completed?.package_id, completed?.package_booked_user_id)}
                        disabled={completed?.review_status ? true : false}
                      >
                        {completed?.review_status ? 'Review Requested' : 'Request Review'}
                      </button>
                    )}
                    <button
                      className="btn btn-outline-secondary button-msg"
                      onClick={() => {
                        router.push(`/coach/messages/3?user_id=${completed.package_booked_user_id}`);
                      }}>
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
                      {/* <button className="btn btn-primary" onClick={handleSubmit}>Submit</button> */}
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