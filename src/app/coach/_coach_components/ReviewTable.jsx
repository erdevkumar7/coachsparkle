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

export default function ReviewTable({ reviews }) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleReplyClick = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply || '');
    setShowReplyModal(true);
  };

  const handleViewClick = (review) => {
    setSelectedReview(review);
    setShowViewModal(true);
  };

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
          {reviews.map((review) => (
            <tr key={review.id} className="user-row">
              <td>
                <div className="user-info">
                  <img
                    src={
                      review.user?.profile_image ||
                      `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                    }
                    alt={review.user?.display_name || 'user'}
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
                  className={`status ${review.status ? 'published' : 'pending'}`}
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
                    style={{ backgroundColor: '#50C878', border: 'none' }}
                    onClick={() => handleReplyClick(review)}
                  >
                    Replied
                  </button>
                )}
                <i
                  className="bi bi-eye ml-2 cursor-pointer"
                  onClick={() => handleViewClick(review)}
                ></i>
              </td>
            </tr>
          ))}
          {reviews.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Reply Modal */}
      <Modal open={showReplyModal} onClose={() => setShowReplyModal(false)}>
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
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={() => setShowReplyModal(false)} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={() => setShowReplyModal(false)}
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

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
          {selectedReview?.reply && (
            <>
              <Typography variant="subtitle1" fontWeight="bold">
                Your Reply:
              </Typography>
              <Typography>{selectedReview.reply}</Typography>
            </>
          )}
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
