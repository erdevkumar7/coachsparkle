'use client';

import { useState } from 'react';
import { FRONTEND_BASE_URL } from "@/utiles/config";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function ReviewTable({ reviews }) {
  const [reviewsState, setReviewsState] = useState(reviews); // Local state for reviews
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token');

  const handleViewClick = (review) => {
    setSelectedReview(review);
    setShowViewModal(true);
  };

  const handleReplyClick = (review) => {    
    setSelectedReview(review);
    setReplyText(review.reply?.review_text || '');
    setShowReplyModal(true);
  };

  const handleReplySubmit = async () => {
    if (!selectedReview || !replyText.trim()) {
      alert('Please enter a reply');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachReplyToUserReview`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          review_id: selectedReview.id,
          coach_id: selectedReview.coach_id,
          review_text: replyText, // Changed from review_text to reply_text
        }),
      });

      const resData = await res.json();
      // console.log('resData', resData);

      if (resData.status) {
        // Update the local reviews state to reflect the reply
        const updatedReviews = reviewsState.map(review =>
          review.id === selectedReview.id
            ? {
              ...review,
              reply: {
                review_text: replyText
              },
              coach_status: 1
            }
            : review
        );
        setReviewsState(updatedReviews);

        setShowReplyModal(false);
        setReplyText('');
        setSelectedReview(null);

        // Show success message
        toast.success('Reply submitted successfully!');
      } else {
        toast.error(resData.message || 'Failed to submit reply');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Error submitting reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Use local reviews state instead of prop
  const displayReviews = reviewsState;
    console.log('reviewsState', displayReviews)

  return (
    <div className="review-section table-striped">
      <table className="review-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reviews</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayReviews.map((review) => (
            <tr key={review.id} className="user-row">
              <td>
                <div className="user-info">
                  <img
                    src={
                      review.user?.profile_image ||
                      `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                    }
                    alt={review.user?.display_name || 'user'}
                    onError={(e) => {
                      e.target.src = `${FRONTEND_BASE_URL}/images/default_profile.jpg`;
                    }}
                  />
                  <div className="user-details">
                    <div className="review-stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi bi-star${i < Math.round(review.rating) ? '-fill' : ''}`}
                        ></i>
                      ))}
                    </div>
                    <strong>
                      {`${review.user?.first_name} ${review.user?.last_name}`}
                    </strong>
                    <small>
                      {new Date(review.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </small>
                  </div>
                </div>
              </td>
              <td className="sed-tab">
                <p>{review.review_text}</p>
              </td>
              <td>
                <span
                  className={`status ${review.user_status ? 'published' : 'pending'}`}
                >
                  {review.status ? 'Published' : 'Pending'}
                </span>
              </td>
              <td className="action-btns">
                {review.coach_status === 0 ? (
                  <button className="reply-btn" onClick={() => handleReplyClick(review)}>
                    Reply
                  </button>
                ) : (
                  <button
                    className="reply-btn"
                    style={review.reply && { backgroundColor: '#50C878', border: 'none' }}
                    onClick={() => handleReplyClick(review)}
                  >
                    {review.reply ? 'Replied' : 'Reply'}
                  </button>
                )}
                <i
                  className="bi bi-eye ml-2 cursor-pointer"
                  onClick={() => handleViewClick(review)}
                ></i>
              </td>
            </tr>
          ))}
          {displayReviews.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Reply Modal */}
      <Modal open={showReplyModal} onClose={() => !loading && setShowReplyModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Reply to {selectedReview?.user?.first_name} {selectedReview?.user?.last_name}
          </Typography>
          <TextField
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            disabled={loading}
            placeholder="Type your reply here..."
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              onClick={() => setShowReplyModal(false)}
              variant="outlined"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReplySubmit}
              variant="contained"
              color="success"
              disabled={loading || !replyText.trim()}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* View Modal */}
      <Modal open={showViewModal} onClose={() => setShowViewModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={1}>
            Review by {selectedReview?.user?.first_name} {selectedReview?.user?.last_name}
          </Typography>
          <Typography mb={2}>{selectedReview?.review_text}</Typography>
          {/* {selectedReview?.reply?.review_text && (
            <>
              <Typography variant="subtitle1" fontWeight="bold">
                Your Reply:
              </Typography>
              <Typography>{selectedReview?.reply?.review_text}</Typography>
            </>
          )} */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={() => setShowViewModal(false)} variant="outlined">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}