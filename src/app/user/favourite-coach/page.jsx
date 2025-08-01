"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/match.css";
import "../_styles/favourite.css";
import { HandleValidateToken } from "@/app/api/auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function favourite() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [favouriteCoaches, setFavouriteCoaches] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchUserFavourites = async () => {
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
        const resp = await fetch(`${apiUrl}/coachFavoriteList`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!resp.ok) {
          throw new Error("Failed to fetch favourite coaches");
        }

        const data = await resp.json();
        console.log(data);
        setFavouriteCoaches(data?.data || []);

      } catch (error) {
        console.error("Error fetching favourites:", error);
        toast.error("Error fetching favourites:");
      }
    };

    fetchUserFavourites();
  }, []);

  return (
    <div className="main-panel">
      <div className="content-wrapper favourite-coach-warp">
        <div className="row favourite-coach-page">
          <h3 className="tittle-text">Favourite coach </h3>

          {favouriteCoaches.length > 0 ? (
            favouriteCoaches.map((item, index) => {
              const coach = item.coach;
              const fullName =`${coach.first_name} ${coach.last_name}`;
              const imageUrl = coach.profile_image
                ? `${coach.profile_image}`
                : "/coachsparkle/assets/images/professional-img.png";

              return (
                <div className="col-md-6 favourite-card" key={index}>
                  <div className="card engagements-cards">
                    <div className="card-body">
                      <div className="inner-card-add">
                        <i className="bi bi-three-dots"></i>
                      </div>
                      <div className="respond-add">
                        <img src={imageUrl} alt="Coach" className="coach-img" onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/coachsparkle/assets/images/professional-img.png";
  }} />
                        <div>
                          <p className="favourite-text-tittle">{fullName}</p>
                          <p className="life-add-text">
                            {coach.title || "Coach at"}{" "}
                            <b>{coach.company || "Unknown Company"}</b>.
                          </p>
                          <p className="confidence-add-text">
                            {coach.bio || "No bio available."}
                          </p>
                          <div className="star-add-pointer">
                            <i className="bi bi-star-fill"></i>
                            <p>{coach.rating || "5.0"}</p>
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

          {/* <div className="col-md-6 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <div className="inner-card-add">

                                    <i className="bi bi-three-dots"></i>
                                </div>
                                <div className="respond-add">

                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div>
                                        <p className="favourite-text-tittle">Sarah Lee</p>
                                        <p className="life-add-text">Life and Confidence Coach at <b>Comex Pte. Ltd</b>.</p>
                                        <p className="confidence-add-text">Experienced in Personal Development and Life coaching</p>
                                        <div className="star-add-pointer">
                                        <i className="bi bi-star-fill"></i>
                                            <p>5.0</p>

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


                    <div className="col-md-6 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <div className="inner-card-add">

                                    <i className="bi bi-three-dots"></i>
                                </div>
                                <div className="respond-add">

                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div>
                                        <p className="favourite-text-tittle">Sarah Lee</p>
                                        <p className="life-add-text">Life and Confidence Coach at <b>Comex Pte. Ltd</b>.</p>
                                        <p className="confidence-add-text">Experienced in Personal Development and Life coaching</p>
                                        <div className="star-add-pointer">
                                        <i className="bi bi-star-fill"></i>
                                            <p>5.0</p>

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

                    <div className="col-md-6 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <div className="inner-card-add">

                                    <i className="bi bi-three-dots"></i>
                                </div>
                                <div className="respond-add">

                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div>
                                        <p className="favourite-text-tittle">Sarah Lee</p>
                                        <p className="life-add-text">Life and Confidence Coach at <b>Comex Pte. Ltd</b>.</p>
                                        <p className="confidence-add-text">Experienced in Personal Development and Life coaching</p>
                                        <div className="star-add-pointer">
                                        <i className="bi bi-star-fill"></i>
                                            <p>5.0</p>

                                        </div>
                                    </div>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Book</button>
                                    <button className="message-btn">Message</button>
                                </div>
                            </div>
                        </div>

                    </div> */}
        </div>
      </div>
    </div>
  );
}
