"use client";
import { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUserReview } from "@/app/api/user-client";
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

export default function ReviewTable({ reviews, token }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ review_text: "", rating: 0 });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <table className="review-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reviews</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 && (
            <tr>
              <td colSpan={3}>No reviews available</td>
            </tr>
          )}

          {reviews.map((review) => (
            <tr key={review.id} className="user-row">
              <td className="user-name-add">
                <div className="user-info">
                  <p>
                    {review.coach?.first_name} {review.coach?.last_name}
                  </p>
                </div>
              </td>

              <td className="sed-tab">
                <p>"{review.review_text}"</p>
              </td>

              <td className="icon-actions">
                <BorderColorIcon
                  className="mui-icons edit-icon"
                  onClick={() => handleEditClick(review)}
                />
                <DeleteIcon className="mui-icons delet-icon" />
              </td>
            </tr>
          ))}
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

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </>
  );
}
