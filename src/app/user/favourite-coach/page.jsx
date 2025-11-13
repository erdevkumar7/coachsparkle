"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/match.css";
import "../_styles/favourite.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Pagination from "@/components/Pagination";
import { FRONTEND_BASE_URL } from "@/utiles/config";

export default function favourite() {
  const router = useRouter();
  const [favouriteCoaches, setFavouriteCoaches] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingFavourites, setLoadingFavourites] = useState(true); // Add loading state
  const token = Cookies.get("token");


  useEffect(() => {
    fetchUserFavourites(currentPage);
  }, [currentPage]);


  const fetchUserFavourites = async (pageNum = 1) => {
    try {
      setLoadingFavourites(true); // Start loading
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
      setLoadingFavourites(false);
    } finally {
      setLoadingFavourites(false); // Stop loading regardless of success/error
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

          {/* Loading State */}
          {loadingFavourites && (
            <div className="d-flex justify-content-center align-items-center">
              <CircularProgress />
            </div>
          )}

          {!loadingFavourites && (
            <>
              {favouriteCoaches.length > 0 ? (
                favouriteCoaches.map((item, index) => {
                  const coach = item.coach;
                  const fullName = `${coach?.first_name} ${coach?.last_name}`;
                  const imageUrl = coach?.profile_image
                    ? `${coach.profile_image}`
                    : `${FRONTEND_BASE_URL}/images/default_profile.jpg`;
                  const typeName =
                    item?.coach_subtype_usershow?.coach_subtypeid?.coach_type_show?.type_name;

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
                                  onClick={() => handleRemoveFavourite(coach?.id)}
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
                                {coach?.professional_title} at{" "}
                                <b>{coach?.company_name || "Unknown Company"}</b>.
                              </p>
                              <p className="confidence-add-text">
                                Experienced In {typeName}
                              </p>
                              <div className="star-add-pointer">
                                <i className="bi bi-star-fill"></i>
                                <p>{coach?.reviews.rating || "5.0"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="two-btn-free">
                            <button
                              className="start-btn"
                              onClick={() => {
                                router.push(`/coach-detail/${coach?.id}`);
                              }}
                            >
                              Book</button>

                            <button
                              className="message-btn"
                              onClick={() => {
                                localStorage.setItem('coach_id', `${coach?.id}`);
                                localStorage.setItem('coach_name', `${coach?.first_name}`);
                                router.push('/send-message');
                              }}>Message</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No favourite coaches found.</p>
              )}
            </>
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
