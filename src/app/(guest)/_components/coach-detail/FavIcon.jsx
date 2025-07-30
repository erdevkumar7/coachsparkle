"use client";
import { useRouter } from "next/navigation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function FavIcon({ coachId, initiallyFavorited}) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("token");
  const [isFavorited, setIsFavorited] = useState(initiallyFavorited);
  const [loading, setLoading] = useState(false);

  const validateUser = async () => {
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      toast.error("Login first");
      router.push(`/login?redirect=/coach-detail/${coachId}`);
      return false;
    }

    const tokenData = await HandleValidateToken(token);
    if (!tokenData) {
      console.warn("Invalid token. Clearing cookies and redirecting.");
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      return false;
    }

    console.log("Token is valid.");
    return true;
  };

  const handleClick = async () => {
    const isValid = await validateUser();
    if (!isValid) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/addRemoveCoachFavorite`,
        { coach_id: coachId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { status, message } = response.data;
      toast.success(message || "Favourtie status updated");

      setIsFavorited((prev) => !prev);
    } catch (error) {
      console.error("Favorite API error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <span onClick={handleClick} style={{ cursor: "pointer" }}>
      {isFavorited ? (
        <FavoriteIcon className="mui-icons text-danger" />
      ) : (
        <FavoriteBorderIcon className="mui-icons" />
      )}
    </span>
  );
}
