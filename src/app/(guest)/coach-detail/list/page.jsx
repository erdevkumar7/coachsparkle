"use client";
import { useEffect, useState, useRef } from "react";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import axios from "axios";
import Link from "next/link";
import "../../_styles/coach-list.css";
import RangeSlider from "../../_components/CoachRange";
import MultipleSelect from "../../_components/CoachLocation";
import DOMPurify from "dompurify";
import CoachServices from "../../_components/CoachServices";
import CoachTrials from "../../_components/CoachTrials";
import CoachDeliveryMode from "../../_components/CoachDeliveryMode";
import CoachCorporateWork from "../../_components/CoachCorporateWork";
import CoachCategory from "../../_components/CoachCategory";
import CoachLanguages from "../../_components/CoachLanguages";
import SingleActiveRating from "../../_components/CoachRatings";
import BreadCrumb from "@/components/BreadCrumb";
import Pagination from "@/components/Pagination";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EastIcon from "@mui/icons-material/East";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavIcon from "../../_components/coach-detail/FavIcon";
import Cookies from "js-cookie";
import { getAllMasters } from "@/app/api/guest";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import AvailabilityStartEndCalendar from "../../_components/coach-detail/AvailabilityStartEndCalendar";
import { BotMessageSquare } from "lucide-react";

export default function CoachList() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [coaches, setCoaches] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [services, setServices] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(25); // Add items per page state
  const [getUserType, setUserType] = useState(null);
  const router = useRouter();
  const searchInputRef = useRef(null);
  const [filtersResetKey, setFiltersResetKey] = useState(0);
  const searchParams = useSearchParams();

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const coachListRef = useRef(null);

  const [filters, setFilters] = useState({
    query: searchParams.get("query") ?? "",
    search_for: "",
    delivery_mode: null,
    free_trial_session: null,
    is_corporate: null,
    countries: [],
    services: [],
    coaching_sub_categories: [],
    languages: [],
    average_rating: null,
    price: null,
    availability_start: null,
    availability_end: null,
  });

  useEffect(() => {
    // Check for coaching_sub_categories in URL params
    const subCategoriesParam = searchParams.get("coaching_sub_categories");
    const isCorporateParam = searchParams.get("isCorporate");

    if (subCategoriesParam) {
      const subCategoryIds = subCategoriesParam
        .split(",")
        .map((id) => parseInt(id));
      setFilters((prev) => ({
        ...prev,
        coaching_sub_categories: subCategoryIds,
      }));
    }

    if (isCorporateParam) {
      setFilters((prev) => ({
        ...prev,
        is_corporate: parseInt(isCorporateParam),
      }));
    }
  }, [searchParams]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
  ];

  useEffect(() => {
    const fetchMastersAndCoaches = async () => {
      try {
        const allMasters = await getAllMasters();
        if (allMasters) {
          setCountries(allMasters.countries || []);
          setDeliveryMode(allMasters.delivery_mode || []);
          setAllLanguages(allMasters.languages || []);
          setServices(allMasters.services || []);
        }
        getAllCoaches(1);
      } catch (err) {
        console.error("Failed to fetch masters:", err);
      }
    };

    fetchMastersAndCoaches();
  }, []);

  useEffect(() => {
    getAllCoaches(currentPage);
  }, [currentPage, filters, itemsPerPage]);

  const getAllCoaches = async (page = 1) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      let userId = null;

      if (token) {
        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          userId = parsedUser.id;
          setUserType(parsedUser.user_type);
        }
      }

      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, val]) => {
          if (Array.isArray(val)) return val.length > 0;
          return val !== null && val !== "" && val !== undefined;
        }),
      );

      if (userId) activeFilters.user_id = userId;

      const response = await axios.post(
        `${apiUrl}/coachlist?page=${page}&per_page=${itemsPerPage}`,
        activeFilters,
        { headers: { "Content-Type": "application/json" } },
      );

      setCoaches(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (
      page !== pagination.current_page &&
      page >= 1 &&
      page <= pagination.last_page
    ) {
      setCurrentPage(page);
    }
  };

  // Add handler for items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleTryAIMatch = () => {
    const top = searchInputRef.current?.offsetTop - 150; // adjust scroll if needed

    window.scrollTo({
      top: top,
      behavior: "smooth",
    });

    // Highlight + focus
    searchInputRef.current?.focus();
    searchInputRef.current?.select();
  };

  // const handleStartAIMatching = () => {
  //   setCurrentPage(1);

  //   // ensure query is used as AI search
  //   setFilters((prev) => ({
  //     ...prev,
  //     query: prev.query
  //   }));

  //   getAllCoaches(1);
  // };
  const handleStartAIMatching = async () => {
    if (!filters.query) return;

    setAiLoading(true);

    try {
      // 🔥 FAKE AI LOGIC (convert text → filters)
      const query = filters.query.toLowerCase();

      let aiFilters = {};

      if (query.includes("english")) {
        aiFilters.languages = [1]; // adjust id
      }

      if (query.includes("corporate")) {
        aiFilters.is_corporate = 1;
      }

      if (query.includes("public speaking")) {
        aiFilters.coaching_sub_categories = [2]; // adjust id
      }

      if (query.includes("evening")) {
        aiFilters.availability_start = "18:00";
      }

      // simulate delay (like API)
      await new Promise((res) => setTimeout(res, 1000));

      setAiResult({
        message: "We found coaches based on your request",
        filters: aiFilters,
      });

      setShowModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  };

  //   const handleStartAIMatching = async () => {
  //   if (!filters.query) return;

  //   setAiLoading(true);

  //   try {
  //     // 👉 CALL AI API (this is the missing part)
  //     const res = await axios.post(`${apiUrl}/ai-match`, {
  //       query: filters.query
  //     });

  //     setAiResult(res.data);
  //     setShowModal(true); // show modal

  //   } catch (error) {
  //     console.error("AI Match Error:", error);
  //   } finally {
  //     setAiLoading(false);
  //   }
  // };

  // const handleApplyAIMatch = () => {
  //   setShowModal(false);

  //   if (aiResult?.filters) {
  //     setFilters((prev) => ({
  //       ...prev,
  //       ...aiResult.filters,
  //     }));
  //   }

  //   setCurrentPage(1);
  // };

  const handleApplyAIMatch = () => {
    setShowModal(false);

    if (aiResult?.filters) {
      const updatedFilters = {
        ...filters,
        ...aiResult.filters,
      };

      setFilters(updatedFilters);
      getAllCoaches(1); // 🔥 force API call with correct filters

        // 🔥 scroll to results
    // setTimeout(() => {
    //   coachListRef.current?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }, 300);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      query: "",
      search_for: "",
      delivery_mode: null,
      free_trial_session: null,
      is_corporate: null,
      countries: [],
      services: [],
      coaching_sub_categories: [],
      languages: [],
      average_rating: null,
      price: null,
      availability_start: null,
      availability_end: null,
    });

    setCurrentPage(1);
    setFiltersResetKey((prev) => prev + 1);
  };

  // console.log('coachesvvv', coaches)

  // const matchPercent = Math.floor(Math.random() * 20) + 80; // 80–100%
  // const matchReason = "Good match for your search preferences";
  const isSearchActive = !!filters.query?.trim();

  const matchPercent = Math.floor(Math.random() * 20) + 80;

let matchReason = "Good match";

if (filters.query?.toLowerCase().includes("english")) {
  matchReason = "Speaks English fluently";
}

if (filters.query?.toLowerCase().includes("public speaking")) {
  matchReason = "Expert in public speaking";
}

  return (
    <>
      <div className="coach-banner-add">
        <div className="banner">
          <div className="container">
            <div className="row title-banner text-center">
              <div className="banner-text">
                Browse Coaches or Get AI-Powered Matches in Seconds
              </div>
              <p>
                Find the right coach your way — filter manually or get instant
                AI-powered suggestions
              </p>
              <div className="search-container ai-search">
                {/* <span className="ai-icon">✨</span> */}
                <input
                  ref={searchInputRef}
                  type="text"
                  className="form-control search-input"
                  placeholder="Tell us what you'd like to learn — our AI will match you with the right coach for your goals."
                  value={filters.query || ""}
                  onChange={(e) => updateFilter("query", e.target.value)}
                />
                <div className="ai-btn-find">
                  {/* <button onClick={handleStartAIMatching}>
                    Start AI Matching
                  </button> */}
                  {/* <button onClick={handleStartAIMatching} disabled={aiLoading}>
                    {aiLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Start AI Matching"
                    )}
                  </button> */}
                  <button onClick={handleStartAIMatching} disabled={aiLoading}>
                    {aiLoading ? "Loading..." : "Ask AI"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BreadCrumb items={breadcrumbItems} />

        <div className="container">
          <div className="sort-container">
            <div className="sorting-data d-flex align-items-center gap-2">
              <span className="sort-by-text">Sort By:</span>
              <select className="best-tab">
                <option>Best Match</option>
              </select>
              <select
                className="option-tab"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container list-start">
          <aside className="sidebar">
            <div className="d-flex align-items-center justify-content-between">
              <h4>Filters</h4>
              <a
                style={{ cursor: "pointer", color: "#009bfa" }}
                onClick={handleClearFilters}>
                Clear all Filters
              </a>
            </div>
            <input
              type="text"
              placeholder="Search for any skill, title or company"
              value={filters.search_for}
              onChange={(e) => updateFilter("search_for", e.target.value)}
            />
            <p className="results">
              {" "}
              {pagination?.total
                ? `${pagination.total} coaches found`
                : "No coaches found"}
            </p>

            <div className="filter-section">
              <h4>Prices</h4>
              <div className="range_sld">
                <div className="price-range-box">
                  <span className="price">
                    ${filters.price ? filters.price[0] : 0}
                  </span>
                  <span className="separator">-</span>
                  <span className="price">
                    ${filters.price ? filters.price[1] : 2000}
                  </span>
                </div>

                <RangeSlider
                  value={filters.price || [0, 2000]}
                  onChange={(val) => updateFilter("price", val)}
                />
              </div>

              <p className="usd-text">All prices in USD / SGD</p>
            </div>

            <div className="filter-section">
              <h4>Location</h4>
              <MultipleSelect
                key={filtersResetKey}
                countries={countries}
                value={filters.countries}
                onChange={(selected) => updateFilter("countries", selected)}
              />
            </div>

            <div className="filter-section">
              <h4>Coaching Category</h4>
              <CoachCategory
                key={filtersResetKey}
                value={filters.coaching_sub_categories}
                onChange={(selected) =>
                  updateFilter("coaching_sub_categories", selected)
                }
              />
            </div>

            {/* <div className="filter-section">
              <h4>Services</h4>
              <CoachServices
                key={filtersResetKey}
                services={services}
                value={filters.services}
                onChange={(selected) => updateFilter("services", selected)}
              />
            </div> */}

            <div className="filter-section">
              <h4>Delivery Mode</h4>
              <CoachDeliveryMode
                key={filtersResetKey}
                deliveryMode={deliveryMode}
                value={filters.delivery_mode}
                onChange={(val) => updateFilter("delivery_mode", val)}
              />
            </div>

            <div className="filter-section">
              <h4>Free Trial / Volunteer / Pro Bono</h4>
              <CoachTrials
                key={filtersResetKey}
                value={filters.free_trial_session}
                onChange={(val) => updateFilter("free_trial_session", val)}
              />
            </div>

            <div className="filter-section rating-add">
              <h4>Available for Corporate Work</h4>
              <CoachCorporateWork
                key={filtersResetKey}
                value={filters.is_corporate}
                onChange={(val) => updateFilter("is_corporate", val)}
              />
            </div>

            <div className="filter-section">
              <h4>Languages</h4>
              <CoachLanguages
                key={filtersResetKey}
                allLanguages={allLanguages}
                value={filters.languages}
                onChange={(selected) => updateFilter("languages", selected)}
              />
            </div>

            <div className="filter-section">
              <h4>Availability</h4>
              <AvailabilityStartEndCalendar
                key={filtersResetKey}
                value={[filters.availability_start, filters.availability_end]}
                onChange={([start, end]) => {
                  updateFilter(
                    "availability_start",
                    start ? start.format("YYYY-MM-DD") : null,
                  );
                  updateFilter(
                    "availability_end",
                    end ? end.format("YYYY-MM-DD") : null,
                  );
                }}
              />
            </div>

            <div className="filter-section rating-star">
              <h4>Rating</h4>
              <SingleActiveRating
                key={filtersResetKey}
                value={filters.average_rating}
                onChange={(val) => updateFilter("average_rating", val)}
              />
            </div>
          </aside>

          {loading ? (
            <main className="main-content" 
            // ref={coachListRef}
            >
              <div className="d-flex justify-content-center align-items-center min-vh-100">
                <CircularProgress />
              </div>
            </main>
          ) : coaches.length > 0 ? (
            <main className="main-content">
              {coaches.map((coach, index) => (
                <div className="coach-card" key={index}>
                  <img
                    src={
                      coach.profile_image
                        ? coach.profile_image
                        : `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                    }
                    alt="coach"
                  />
                  <div className="coach-info">
                    <div className="senior-engineer-details-add">
                      <div>
                        <div className="co-name">
                          <h2>
                            {coach.first_name} {coach.last_name}
                          </h2>
                          {coach.is_verified ? (
                            <span className="check-box-add-icons">
                              <CheckCircleIcon className="mui-icons" /> Verified
                            </span>
                          ) : null}
                        </div>
                        <p className="reviews-text">
                          <StarOutlineIcon className="mui-icons" />
                          <span>{coach?.averageRating || "No Rating"}</span> (
                          {`${coach?.totalReviews} reviews` || "0 reviews"})
                        </p>
                        <p className="senior-engineer-text">
                          <BusinessCenterIcon className="mui-icons" />
                          <strong>
                            {coach.professional_title || "free coaching"}{" "}
                          </strong>
                        </p>

                        <p
                          className="description"
                          dangerouslySetInnerHTML={{
                            __html: coach?.detailed_bio || "No bio available",
                          }}
                        />
                        <div className="tags">
                          {coach.service_names &&
                          coach.service_names.length > 0 ? (
                            coach.service_names.map((service, index) => (
                              <span key={index}>{service}</span>
                            ))
                          ) : (
                            <span>No services listed</span>
                          )}
                        </div>
                      </div>
                      <div className="coach-actions">
                        <p className="price">
                          {coach.price ? `$${coach.price}/month` : "N/A"}
                        </p>
                        {coach.latest_package_id ? (
                          <button
                            className="book-latest-package"
                            onClick={() =>
                              router.push(
                                `/coach-detail/${coach.user_id}/package/${coach.latest_package_id}`,
                              )
                            }>
                            Book Now{" "}
                            <EastIcon className="mui-icons fav-list-icons" />
                          </button>
                        ) : (
                          <button className="book">
                            Book Now{" "}
                            <EastIcon className="mui-icons fav-list-icons" />
                          </button>
                        )}
                        <Link href={`/coach-detail/${coach.user_id}`}>
                          <button className="profile">
                            View Profile{" "}
                            <EastIcon className="mui-icons fav-list-icons" />
                          </button>
                        </Link>

                        <div>
                          {isSearchActive && (
                          <div className="ai-match-box">
                            <div className="progress-ring1">
                              <svg width="60" height="60">
                                <circle
                                  className="progress-bg1"
                                  cx="30"
                                  cy="30"
                                  r="26"
                                  strokeWidth="5"
                                />
                                <circle
                                  className="progress-bar1"
                                  cx="30"
                                  cy="30"
                                  r="26"
                                  strokeWidth="5"
                                  style={{
                                    strokeDasharray: 2 * Math.PI * 26,
                                    strokeDashoffset:
                                      2 *
                                      Math.PI *
                                      26 *
                                      (1 - matchPercent / 100),
                                  }}
                                />
                              </svg>

                              <div className="progress-text1">
                                {matchPercent} <span>%</span>
                              </div>
                            </div>

                            <div className="match-info">
                              {/* <p className="match-label">Match</p> */}
                              <p className="match-reason">{matchReason}</p>
                            </div>
                          </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {getUserType === 3 ? null : (
                      <div className="fav-list">
                        <span>
                          <FavIcon
                            coachId={coach.user_id}
                            initiallyFavorited={coach?.is_fevorite}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="info1">
                <p>Couldn't find what you are looking for?</p>
                <button className="ai-mtc" onClick={handleTryAIMatch}>
                  Try AI Match <EastIcon className="mui-icons east-icons-add" />
                </button>
              </div>

              <div className="paginaetd-icons">
                <Pagination
                  currentPage={currentPage}
                  lastPage={pagination.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            </main>
          ) : (
            <main className="main-content">
              <p>No coaches found.</p>
            </main>
          )}
        </div>
      </div>

      {aiLoading && (
        <div className="ai-thinking">
          🤖 Thinking<span className="dots"></span>
        </div>
      )}

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal ai-modal">
            <div className="ai-chat">
              <div className="user-message">
                <div className="user-bubble">
                  <strong>You:</strong> {filters.query}
                </div>
              </div>

              <div className="ai-message">
                <div className="avatar1">
                  <BotMessageSquare size={20} />
                </div>

                <div className="bubble typing">
                  <p className="typing-text">{aiResult?.message}</p>
                </div>
              </div>

              <div className="modal-actions fade-in">
                <button className="ok-btn" onClick={handleApplyAIMatch}>
                  Show Matching Coaches →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
