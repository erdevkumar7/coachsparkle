import { FRONTEND_BASE_URL } from "@/utiles/config";
import "../../_styles/coach-list.css";
import DetailsTab from "../../_components/DetailsTab";
import CoachingListDetailPackage from "../../_components/CoachListDetailPackage";
import { getCoachById } from "@/app/api/coach";
import SimilarCoaches from "../../../../components/SimilarCoaches";
import CoachDetailCalendar from "../../_components/CoachDetailCalendar";
import ViewServicePackage from "@/app/coach/_coach_components/ViewServicePackage";
import LoginForm from "@/components/LoginForm";
import BreadCrumb from "@/components/BreadCrumb";

export default async function CoachDetail({ params }) {
  const { id } = await params;

  const coach = await getCoachById(id);
  if (!coach) {
    return <div>Coach not found.</div>;
  }

  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    {
      label: `${coach?.first_name} ${coach?.last_name}`,
      href: `/coach-detail/${id}`,
    },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="coach-banner-add">
        <div className="coach-profile-list-add">
          <div className="container">
            <div className="row coach-profile-list-inner">
              <div className="col-md-8 coach-profile-list-left">
                <div className="coach-profile-content">
                  <div className="coach-card">
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
                          <h2>
                            {coach?.first_name} {coach?.last_name}
                          </h2>
                          <div className="box-txts">
                            {coach?.is_verified === 1 && (
                              <span className="verified-text">
                                {" "}
                                <i className="bi bi-check"></i>Verified
                              </span>
                            )}
                            {coach?.is_corporate === 1 && (
                              <span className="avail-text">
                                {" "}
                                <i className="bi bi-check"></i>Available for
                                Corporate Work
                              </span>
                            )}
                          </div>
                          <p className="senior-engineer-text">
                            <strong>
                              {coach?.professional_title}{" "}
                              {coach?.company_name && (
                                <>
                                  <span> at </span>
                                  {coach.company_name}
                                </>
                              )}
                            </strong>
                          </p>

                          <p className="senior-engineer-text">
                            {coach?.coach_type && (
                              <strong>
                                Experience <span>in</span> {coach?.coach_type}
                              </strong>
                            )}
                          </p>

                          <div className="profile-card">
                            <div className="badge-tag">
                              {coach?.coach_subtype && (
                                <span className="badge">
                                  {coach?.coach_subtype}
                                </span>
                              )}
                            </div>
                            <div className="d-flex gap-4">
                              <div>
                                <div className="info-item">
                                  <i className="bi bi-geo-alt"></i>
                                  <span>{coach.country_id}</span>
                                </div>

                                <div className="info-item">
                                  <i className="bi bi-translate"></i>
                                  <span>
                                    {coach.language_names?.join(", ") ||
                                      "Not available"}
                                  </span>
                                </div>

                                <div className="info-item">
                                  {coach?.delivery_mode && (
                                    <>
                                      <i className="bi bi-globe"></i>
                                      <span>{coach?.delivery_mode}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="info-item">
                                  {coach?.experience && (
                                    <>
                                      <i className="bi bi-circle"></i>
                                      <span>
                                        {coach?.experience}-years experiences
                                      </span>
                                    </>
                                  )}
                                </div>

                                <div className="info-item">
                                  {coach?.age_group && (
                                    <>
                                      <i className="bi bi-universal-access-circle"></i>
                                      <span>For Ages {coach?.age_group}</span>
                                    </>
                                  )}
                                </div>

                                <div className="info-item">
                                  <i className="bi bi-star"></i>
                                  {/* <span><b>5.0</b> (21 reviews)</span> */}
                                  <span>
                                    <b>No Rating </b>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="coach-action-profile-icon">
                        <i className="bi bi-heart"></i>
                      </div>
                      <div className="coach-action-share-icon">
                        <i className="bi bi-share"></i>
                      </div>
                      <div className="tags">
                        {coach?.service_names &&
                          coach.service_names.map((service) => (
                            <span key={service}>{service}</span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="about-section tabs-block">
                    <DetailsTab coach={coach} />
                  </div>
                  <div className="about-section package_short">
                    <h4>Coaching Packages</h4>
                    {/* <div className="session-wrapper">
                                            {coach.service_packages && coach.service_packages.slice(0, 2).map((pkg, index) => (
                                                <ViewServicePackage key={index} pkg={pkg} />
                                            ))}
                                        </div> */}
                    <CoachingListDetailPackage
                      packages={coach.service_packages.slice(0, 2)}
                    />
                    <div className="v-all">
                      <button>View All</button>
                    </div>
                  </div>
                  <div className="about-section publs_artcl">
                    <h4>Published Articles</h4>
                    <div className="artcl-flex">
                      <div className="item-artcl">
                        <img
                          src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`}
                          alt="Team Image"
                          className="top-image"
                        />
                        <div className="item-cont1">
                          <h4>
                            5 Strategies to Boost Self-Confidence in the
                            Workplace
                          </h4>
                          <p>
                            Discover practical techniques enhance your
                            confidence at work and navigate professional
                            challenges with assurance.
                          </p>
                          <button>Read Article</button>
                        </div>
                      </div>
                      <div className="item-artcl">
                        <img
                          src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`}
                          alt="Team Image"
                          className="top-image"
                        />
                        <div className="item-cont1">
                          <h4>
                            5 Strategies to Boost Self-Confidence in the
                            Workplace
                          </h4>
                          <p>
                            Discover practical techniques enhance your
                            confidence at work and navigate professional
                            challenges with assurance.
                          </p>
                          <button>Read Article</button>
                        </div>
                      </div>
                      <div className="item-artcl">
                        <img
                          src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`}
                          alt="Team Image"
                          className="top-image"
                        />
                        <div className="item-cont1">
                          <h4>
                            5 Strategies to Boost Self-Confidence in the
                            Workplace
                          </h4>
                          <p>
                            Discover practical techniques enhance your
                            confidence at work and navigate professional
                            challenges with assurance.
                          </p>
                          <button>Read Article</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="about-section sim-coachs">
                    <h4>Similar Coaches</h4>
                    <SimilarCoaches />
                  </div>
                </div>
              </div>

              <div className="col-md-4 coach-profile-list-right">
                <div className="profile-card">
                  <img
                    src={`${FRONTEND_BASE_URL}/images/profile-video.png`}
                    alt="Team Image"
                    className="top-image"
                  />

                  <div className="profile-message">
                    <p className="price">
                      {coach.price ? `$${coach.price}/ hour` : "N/A"}
                    </p>
                    <p className="small-txt">Prices range from $250 - $290</p>

                    <div className="trial-offer">
                      <span>
                        {" "}
                        <i className="bi bi-patch-check"></i>Free trial
                      </span>
                      <div className="yes-no-add">
                        <label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            checked={true}
                            readOnly
                          />
                          {coach?.free_trial_session ? "Yes" : "No"}
                        </label>
                        {/* <label><input className="form-check-input" type="checkbox" value="" id="no" /> No</label> */}
                      </div>
                    </div>

                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      <i className="bi bi-chat-dots"></i> Send Message
                    </button>

                    <div
                      className="modal fade"
                      id="loginModal"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                          <div className="modal-body">
                            <LoginForm />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="social-links">
                      <div className="contact-now-add">
                        {coach?.linkdin_link && (
                          <a href={coach?.linkdin_link} target="_blank">
                            <img
                              src={`${FRONTEND_BASE_URL}/images/sm1.png`}
                              alt="LinkedIn"
                            />
                          </a>
                        )}
                        {coach?.website_link && (
                          <a href={coach?.website_link} target="_blank">
                            <img
                              src={`${FRONTEND_BASE_URL}/images/sm2.png`}
                              alt="website"
                            />
                          </a>
                        )}
                        {coach?.youtube_link && (
                          <a href={coach?.youtube_link} target="_blank">
                            <img
                              src={`${FRONTEND_BASE_URL}/images/sm3.png`}
                              alt="youtube"
                            />
                          </a>
                        )}
                        {coach?.podcast_link && (
                          <a href={coach?.podcast_link} target="_blank">
                            <img
                              src={`${FRONTEND_BASE_URL}/images/sm4.png`}
                              alt="podcast"
                            />
                          </a>
                        )}
                        {coach?.blog_article && (
                          <a href={coach?.blog_article} target="_blank">
                            <img
                              src={`${FRONTEND_BASE_URL}/images/sm5.png`}
                              alt="booking"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="calendar shadow-sm calendar-profile-show">
                  <div className="d-flex prve-next-btn mb-3">
                    <h4 id="monthYear" className="mb-0"></h4>
                    <CoachDetailCalendar />
                  </div>

                  <div className="days" id="calendarDays"></div>
                  <div className="calendar-legend">
                    <span>
                      <span className="dot available-dot"></span> Available
                    </span>
                    <span>
                      <span className="dot unavailable-dot"></span> Unavailable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
