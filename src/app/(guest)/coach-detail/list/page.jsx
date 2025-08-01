"use client";

import { useEffect, useState } from "react";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import axios from "axios";
import Link from "next/link";
import "../../_styles/coach-list.css";
import RangeSlider from "../../_components/CoachRange";
import MultipleSelectCheckmarks from "../../_components/CoachLocation";
import MultipleSelect from "../../_components/CoachLocation";
import GroupedSelect from "../../_components/CoachCategory";
import GroupedMultiSelectWithCheckboxes from "../../_components/CoachCategory";
import CoachServices from "../../_components/CoachServices";
import CheckboxLabels from "../../_components/CoachDeliveryMode";
import CoachTrials from "../../_components/CoachTrials";
import CoachDeliveryMode from "../../_components/CoachDeliveryMode";
import CoachCorporateWork from "../../_components/CoachCorporateWork";
import CoachCategory from "../../_components/CoachCategory";
import CoachLanguages from "../../_components/CoachLanguages";
import BasicRating from "../../_components/CoachRatings";
import HalfRating from "../../_components/CoachRatings";
import CoachAvail from "../../_components/CoachSideCalendar";
import BreadCrumb from "@/components/BreadCrumb";
import Pagination from "@/components/Pagination";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EastIcon from '@mui/icons-material/East';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavIcon from '../../_components/coach-detail/FavIcon';


export default function CoachList() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [coaches, setCoaches] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
  ];


  useEffect(() => {
    getAllCoaches(currentPage);
  }, [currentPage]);
  const getAllCoaches = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: `${apiUrl}/coachlist?page=${page}`,
      });
console.log("coach:", response.data.data)
      setCoaches(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    // console.log(page, 'pageee')
    if (
      page !== pagination.current_page &&
      page >= 1 &&
      page <= pagination.last_page
    ) {
      setCurrentPage(page);
    }
  };

  // console.log(currentPage, 'coachescoaches')
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
              <div className="search-container">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="“E.g., Improve public speaking for work, in English, evenings preferre"
                />
                <div className="ai-btn-find">
                  <button>Start AI Matching</button>
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
              <select className="option-tab">
                <option>25</option>
                <option>50</option>
              </select>

            </div>
          </div>
        </div>
        <div className="container list-start">

          <aside className="sidebar">
            <input
              type="text"
              placeholder="Search for any skill, title or company"
            />
            <p className="results">1000+ coaches found</p>

            <div className="filter-section">
              <h4>Prices</h4>
              {/* <div className="price-range-slider">
                                <div className="range-values">
                                    <span id="amount-left">$0</span>
                                    <span id="amount-right">$2000</span>
                                </div>
                                <div id="slider-range" className="range-bar"></div>
                            </div> */}
              <div className="range_sld">
                <div className="price-range-box">
                  <span className="price">$ 0</span>
                  <span className="separator">-</span>
                  <span className="price">$ 2000</span>
                </div>

                <RangeSlider />
              </div>

              <p className="usd-text">All prices in USD</p>
            </div>

            <div className="filter-section">
              <h4>Location</h4>
              {/* <div className="filter-services">
                                <label><input type="checkbox" /> Leadership</label>
                                <label><input type="checkbox" /> Product Management</label>
                                <label><input type="checkbox" /> Career Growth</label>
                                <label><input type="checkbox" /> Career</label>
                                <label><input type="checkbox" /> Product Strategy</label>
                                <label><input type="checkbox" /> Startup</label>
                                <label><input type="checkbox" /> Management</label>
                                <a href="#">Show more services</a>
                            </div> */}

              <MultipleSelect />
            </div>

            <div className="filter-section">
              <h4>Coaching Category</h4>
              {/* <div className="filter-services">
                                <label><input type="checkbox" /> Career & Professional Coaches</label>
                                <label><input type="checkbox" /> Personal Development & Life Coaches</label>
                                <label><input type="checkbox" /> Wellness & Health Coaches</label>
                                <label><input type="checkbox" /> Family, Relationship & Youth Coaches</label>
                                <label><input type="checkbox" /> Academic & Learning Coaches </label>
                                <label><input type="checkbox" /> Specialized & Skill-Based Coaches </label>
                                <label><input type="checkbox" /> Niches (Emerging)</label>
                            </div> */}

              <CoachCategory />
            </div>

            <div className="filter-section">
              <h4>Services</h4>
              {/* <div className="filter-services">
                                <label><input type="checkbox" /> Online</label>
                                <label><input type="checkbox" /> In-Person</label>
                                <label><input type="checkbox" /> Hybrid</label>
                            </div> */}

              <CoachServices />
            </div>

            <div className="filter-section">
              <h4>Delivery Mode</h4>

              {/* <div className="filter-services">
                                <label><input type="checkbox" /> Structured</label>
                                <label><input type="checkbox" /> Free-flow</label>
                                <label><input type="checkbox" /> Visual</label>
                                <label><input type="checkbox" /> Practical</label>
                                <label><input type="checkbox" /> Mindfulness-based</label>
                                <label><input type="checkbox" /> Conversational </label>
                            </div> */}

              <CoachDeliveryMode />
            </div>

            <div className="filter-section">
              <h4>Free Trial / Volunteer / Pro Bono</h4>
              {/* <div className="filter-services">
                                <label><input type="checkbox" /> French</label>
                                <label><input type="checkbox" /> English</label>
                                <label><input type="checkbox" /> Arabic</label>
                                <label><input type="checkbox" /> Spanish</label>
                                <label><input type="checkbox" /> Hindi</label>
                                <label><input type="checkbox" /> Italian</label>
                                <label><input type="checkbox" /> German</label>
                                <a href="#">Show more languages</a>
                            </div> */}

              <CoachTrials />
            </div>

            <div className="filter-section rating-add">
              <h4>Available for Corporate Work</h4>

              {/* <div className="filter-services">
                                <label><input type="checkbox" /> <i className="bi bi-star"></i></label>
                                <label><input type="checkbox" /> <i className="bi bi-star"></i><i className="bi bi-star"></i></label>
                                <label><input type="checkbox" /> <i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></label>
                                <label><input type="checkbox" /> <i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></label>
                                <label>
                                    <input type="checkbox" /> <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                    <i className="bi bi-star"></i>
                                </label>
                            </div> */}

              <CoachCorporateWork />
            </div>

            <div className="filter-section">
              <h4>Languages</h4>
              <CoachLanguages />
            </div>

            <div className="filter-section">
              <h4>Availability</h4>
              {/* <CoachAvail /> */}
            </div>

            <div className="filter-section rating-star">
              <h4>Rating</h4>
              <HalfRating />
            </div>
          </aside>



          {loading ? (
            <main className="main-content">
              <p>Loading...</p>
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
                          <span className="check-box-add-icons">
                            <CheckCircleIcon className="mui-icons" /> Verified
                          </span>
                        </div>
                        <p className="reviews-text">
                          <StarOutlineIcon className="mui-icons" />

                          <span>5.0</span> (21 reviews)
                        </p>
                        <p className="senior-engineer-text">
                          <BusinessCenterIcon className="mui-icons" />
                          <strong>
                            {coach.professional_title || "free coaching"}{" "}
                          </strong>
                        </p>
                        <p className="description">
                          {coach.short_bio ||
                            "Focus on your personal and professional growth with tailored development support. Whether you're building new skills, leading a complex project, or aiming for your next milestone, you'll get practical guidance designed to help you move forward with confidence."}
                        </p>
                      </div>
                      <div className="coach-actions">
                        <p className="price">
                          {coach.price ? `$${coach.price}/month` : "N/A"}
                        </p>
                        <button className="book">
                          Book Now <EastIcon className="mui-icons fav-list-icons" />
                        </button>
                        <Link href={`/coach-detail/${coach.user_id}`}>
                          <button className="profile">
                            View Profile <EastIcon className="mui-icons fav-list-icons" />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="tags">
                      {coach.service_names && coach.service_names.length > 0 ? (
                        coach.service_names.map((service, index) => (
                          <span key={index}>{service}</span>
                        ))
                      ) : (
                        <span>No services listed</span>
                      )}
                    </div>
                    <div className="fav-list">
                      <span>
                        {/* <FavoriteBorderIcon className="mui-icons" /> */}
                        <FavIcon coachId={coach.user_id} initiallyFavorited={coach?.is_fevorite}/>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="info1">
                <p>Couldn't find what you are looking for?</p>
                <button className="ai-mtc">Try AI Match <EastIcon className="mui-icons east-icons-add" /></button>
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
    </>
  );
}
