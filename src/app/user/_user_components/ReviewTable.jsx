"use client";
import { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { updateUserReview, deleteUserReview } from "@/app/api/user-client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import { toast } from "react-toastify";

export default function ReviewTable({ reviews = [], token }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ review_text: "", rating: 0 });
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleEditClick = (review) => {
    setEditingId(review.id);
    setFormData({
      review_text: review.review_text || "",
      rating: review.rating || 0,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ review_text: "", rating: 0 });
  };

  const handleUpdate = async () => {
    const result = await updateUserReview(editingId, formData, token);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Review updated successfully");
      handleClose();
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const handleDelete = async (reviewId) => {
    setDeletingId(reviewId);
    const result = await deleteUserReview(reviewId, token);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Review deleted successfully");
      setTimeout(() => window.location.reload(), 1000);
    }
    setDeletingId(null);
  };

  return (
    <>
      <table className="review-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reviews</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
                No reviews found
              </td>
            </tr>
          ) : (
            reviews.map((review) => (
              <tr key={review.id} className="user-row">
                <td className="user-name-add">
                  <div className="user-info">
                    {review.coach?.first_name} {review.coach?.last_name}
                  </div>
                </td>
                <td className="sed-tab">"{review.review_text}"</td>
                <td
                  className="icon-actions"
                >
                  {deletingId === review.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <>
                      <BorderColorIcon
                        className="mui-icons edit-icon"
                        onClick={() => handleEditClick(review)}
                        style={{ cursor: "pointer" }}
                      />
                      <DeleteIcon
                        className="mui-icons delet-icon"
                        onClick={() => handleDelete(review.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Review"
            multiline
            rows={4}
            margin="normal"
            value={formData.review_text}
            onChange={(e) =>
              setFormData({ ...formData, review_text: e.target.value })
            }
          />
          <Rating
            name="rating"
            value={Number(formData.rating)}
            onChange={(e, newValue) =>
              setFormData({ ...formData, rating: newValue })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
