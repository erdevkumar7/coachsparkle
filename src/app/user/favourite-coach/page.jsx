"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/match.css";
import "../_styles/favourite.css";
import { HandleValidateToken } from "@/app/api/auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Pagination from "@/components/Pagination";

export default function favourite() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [favouriteCoaches, setFavouriteCoaches] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetchUserFavourites(currentPage);
  }, [currentPage]);
  const fetchUserFavourites = async (pageNum = 1) => {
    const token = Cookies.get("token");
    const tokenData = await HandleValidateToken(token);
    if (!tokenData) {
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    setUser(tokenData.data);

    try {
      const resp = await fetch(
        `${apiUrl}/coachFavoriteList?page=${pageNum}&per_page=4`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!resp.ok) {
        throw new Error("Failed to fetch favourite coaches");
      }

      const data = await resp.json();
      console.log(data);
      setFavouriteCoaches(data?.data || []);
      setCurrentPage(data?.pagination?.current_page || 1);
      setTotalPages(data?.pagination?.last_page || 1);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      toast.error("Error fetching favourites");
    }
  };

  const handleRemoveFavourite = async (coachId) => {
  try {
    const resp = await fetch(`${apiUrl}/addRemoveCoachFavorite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coach_id: coachId }),
    });

    const data = await resp.json();

    if (!data.status) {
      toast.error(data.message || "Could not remove coach");
      return;
    }

    toast.success("Coach removed from favourites");
    fetchUserFavourites(currentPage);
  } catch (error) {
    console.error("Remove error:", error);
    toast.error("Something went wrong");
  }
};


  return (
    <div className="main-panel">
      <div className="content-wrapper favourite-coach-warp">
        <div className="row favourite-coach-page">
          <h3 className="tittle-text">Favourite coach </h3>

          {favouriteCoaches.length > 0 ? (
            favouriteCoaches.map((item, index) => {
              const coach = item.coach;
              const fullName = `${coach.first_name} ${coach.last_name}`;
              const imageUrl = coach.profile_image
                ? `${coach.profile_image}`
                : "/coachsparkle/assets/images/professional-img.png";

              return (
                <div className="col-md-6 favourite-card" key={index}>
                  <div className="card engagements-cards">
                    <div className="card-body">
                      <div className="dropdown inner-card-add">
                        <button
                          className="btn btn-link dropdown-toggle p-0"
                          type="button"
                          id={`dropdownMenuButton-${index}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreHorizOutlinedIcon className="mui-icons remove-btn" />
                        </button>
                        <ul
                          className="dropdown-menu dropdown-menu-end remove-ul"
                          aria-labelledby={`dropdownMenuButton-${index}`}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleRemoveFavourite(coach.id)}
                            >
                              Remove
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div className="respond-add">
                        <img
                          src={imageUrl}
                          alt="Coach"
                          className="coach-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "/coachsparkle/assets/images/professional-img.png";
                          }}
                        />
                        <div>
                          <p className="favourite-text-tittle">{fullName}</p>
                          <p className="life-add-text">
                            {coach.professional_title} at{" "}
                            <b>{coach.company_name || "Unknown Company"}</b>.
                          </p>
                          <p className="confidence-add-text">
                            Experienced In {coach.coach_type}
                          </p>
                          <div className="star-add-pointer">
                            <i className="bi bi-star-fill"></i>
                            <p>{coach.reviews.rating || "5.0"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="two-btn-free">
                        <button className="start-btn">Book</button>
                        <button className="message-btn">Message</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No favourite coaches found.</p>
          )}
          <Pagination
            currentPage={currentPage}
            lastPage={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
