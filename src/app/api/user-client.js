import axios from "axios";
import Cookies from "js-cookie";

export const getUserPendingCoachingClient = async (page = 1, token, itemsPerPage) => {
  if (!token) {
    return { error: "No token provided", data: null };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPendingCoaching?page=${page}&per_page=${itemsPerPage}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const json = await response.json();

    if (!json.success) {
      return { error: json.message || "Unknown error", data: null };
    }

    return { error: null, data: json };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Unexpected error", data: null };
  }
};

export const getUserProgressCoachingClient = async (page = 1, token) => {
  console.log('page', page)
  if (!token) {
    return { error: "No token provided", data: null };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCoachingPackages?page=${page}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const json = await response.json();

    if (!json.success) {
      return { error: json.message || "Unknown error", data: null };
    }

    return { error: null, data: json };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Unexpected error", data: null };
  }
};

export const getUserCompletedCoachingClient = async (page = 1, token) => {
  console.log('page', page)
  if (!token) {
    return { error: "No token provided", data: null };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPackagesCompleted?page=${page}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const json = await response.json();

    if (!json.success) {
      return { error: json.message || "Unknown error", data: null };
    }

    return { error: null, data: json };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Unexpected error", data: null };
  }
};

export const getUserCanceledCoachingClient = async (page = 1, token) => {
  console.log('page', page)
  if (!token) {
    return { error: "No token provided", data: null };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPackagesCanceled?page=${page}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const json = await response.json();

    if (!json.success) {
      return { error: json.message || "Unknown error", data: null };
    }

    return { error: null, data: json };
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Unexpected error", data: null };
  }
};


export const submitUserReview = async (reviewData, token) => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userReviewSubmit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const json = await res.json();

    if (!res.ok || !json.status) {
      return { error: json.message || "Failed to submit review", data: null };
    }

    return { error: null, data: json.data };
  } catch (err) {
    console.error("Review submit error:", err);
    return { error: "Unexpected error while submitting review", data: null };
  }
};

export async function updateUserReview(reviewId, payload, token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userReviewUpdate`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reviewId,
        ...payload,
      }),
    });

    const json = await res.json();

    if (!json.status) {
      return { error: json.message || "Update failed", data: null };
    }

    return { error: null, data: json.data };
  } catch (err) {
    console.error("Update error:", err);
    return { error: "Unexpected error", data: null };
  }
}

export async function deleteUserReview(reviewId, token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userReviewDelete/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok || !json.status) {
      return { error: json.message || "Failed to delete review", data: null };
    }

    return { error: null, data: json.message };
  } catch (err) {
    console.error("Delete error:", err);
    return { error: "Unexpected error", data: null };
  }
}


export const getNotifications = async (token) => {
  try {    
    if (!token) {
      return { status: false, count: 0, notifications: [] };
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/getNotifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { status: false, count: 0, notifications: [] };
  }
};