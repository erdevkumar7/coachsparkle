import { FRONTEND_BASE_URL } from "@/utiles/config";
import "../../_styles/coach-list.css";
import DetailsTab from "../../_components/DetailsTab";
import CoachingListDetailPackage from "../../_components/CoachListDetailPackage";
import { getCoachById, getCoachCalendarStatus, packageIdsByCoachId, similarCoaches } from "@/app/api/coach";
import SimilarCoaches from "../../../../components/SimilarCoaches";
import CoachDetailCalendar from "../../_components/CoachDetailCalendar";
import ViewServicePackage from "@/app/coach/_coach_components/ViewServicePackage";
import LoginForm from "@/components/LoginForm";
import BreadCrumb from "@/components/BreadCrumb";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavIcon from '../../_components/coach-detail/FavIcon';
import { notFound } from "next/navigation";
import ActionButton from "@/components/reusable/ActionButton";
import SendMessageButton from "../../_components/SendMessageButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TranslateIcon from '@mui/icons-material/Translate';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Image from 'next/image';
import LanguageIcon from '@mui/icons-material/Language';
import AdjustIcon from '@mui/icons-material/Adjust';
import { HandleValidateTokenOnServer } from "@/app/api/user";
import Link from "next/link";
import { getLatestMasterBlogs } from "../../../api/guest";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CustomShareIcon from "../../_components/coach-detail/CustomShareIcon";


export default async function CoachDetail({ params }) {

  const { coach_id } = await params;
  const tokenData = await HandleValidateTokenOnServer();
  const blogs = await getLatestMasterBlogs(coach_id);

  let fav_user_id;
  let userType;
  if (tokenData) {
    fav_user_id = tokenData.data.id;
    userType = tokenData.data.user_type;
  }
  // console.log('userType', userType)
  const [coach, allPackageIdRes, calendarData, incrementViewRes] = await Promise.all([
    getCoachById(coach_id, fav_user_id),
    packageIdsByCoachId(coach_id),
    getCoachCalendarStatus(coach_id),

    // Increment profile view count
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit-coach-and-package-views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coach_id,
        user_id: fav_user_id ?? null,
      }),
      cache: "no-store",
    }).catch((error) => {
      console.error("Error increasing profile view count:", error);
      return null;
    }),
  ])

  if (!coach) {
    return notFound();
  }

  const similarCoachData = await similarCoaches(coach.user_id)
  const allPackages = allPackageIdRes?.data || [];

  let fistPackageID;
  if (allPackages.length > 0) {
    fistPackageID = allPackages[0]
  }

  // console.log('fistPackageID', coach)
  // console.log("Favourite", coach?.is_fevorite)

  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    {
      label: `${coach?.first_name} ${coach?.last_name}`,
      href: `/coach-detail/${coach_id}`,
    },
  ];
  console.log('coachData', coach)
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
                                <CheckCircleIcon className="mui-icons" />Verified
                              </span>
                            )}
                            {coach?.is_corporate === 1 && (
                              <span className="avail-text">
                                {" "}
                                <CheckCircleIcon className="mui-icons" />Available for
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

                          {/* <div className="profile-card">
                            <div className="badge-tag">
                              {coach?.coach_subtype && (
                                <span className="badge">
                                  {coach?.coach_subtype}
                                </span>
                              )}
                            </div> */}

                          <div className="profile-card">
                            <div className="badge-tag">
                              {coach?.coach_subtype?.length > 0 &&
                                coach.coach_subtype.map((subtype, index) => (
                                  <span className="badge" key={index}>
                                    {subtype.subtype_name}
                                  </span>
                                ))}
                            </div>


                            <div className="d-flex gap-4">
                              <div>
                                <div className="info-item">
                                  <LocationOnIcon className="mui-icons" />
                                  <span>{coach.country_id}</span>
                                </div>

                                <div className="info-item">
                                  <TranslateIcon className="mui-icons" />
                                  <span>
                                    {coach.language_names?.join(", ") ||
                                      "Not available"}
                                  </span>
                                </div>

                                <div className="info-item">
                                  {coach?.delivery_mode && (
                                    <>
                                      <LanguageIcon className="mui-icons" />
                                      <span>{coach?.delivery_mode}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="info-item">
                                  {coach?.experience && (
                                    <>
                                      <EmojiEventsIcon className="mui-icons award-icons-add" />
                                      <span>
                                        {coach?.experience}-years experiences
                                      </span>
                                    </>
                                  )}
                                </div>

                                <div className="info-item">
                                  {coach?.age_group && (
                                    <>
                                      <AdjustIcon className="mui-icons" />
                                      <span>For Ages {coach?.age_group}</span>
                                    </>
                                  )}
                                </div>

                                <div className="info-item">
                                  <StarBorderIcon className="mui-icons" />
                                  <span><b>{coach?.averageRating || 'No Rating'}</b> ({`${coach?.totalReviews} reviews` || '0 reviews'})</span>
                                  <span>
                                    {/* <b>No Rating </b> */}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {userType === 3 ? null : <div className="coach-action-profile-icon">
                        <FavIcon coachId={coach.user_id} initiallyFavorited={coach?.is_fevorite} />
                      </div>}

                      <CustomShareIcon coach={coach} />

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
                    {coach?.service_packages.length > 0 &&
                      <>
                        <CoachingListDetailPackage packages={coach.service_packages} />
                        <div className="v-all">
                          {/* <button>View All</button> */}
                          <ActionButton navigateTo={`/coach-detail/${coach.user_id}/package/${fistPackageID}`} className="my-btn">
                            View All
                          </ActionButton>
                        </div>
                      </>}
                  </div>

                  <div className="about-section publs_artcl">
                    <h4>Published Articles</h4>
                    {blogs.length > 0 ? (
                      <div className="artcl-flex">
                        {blogs.map((blog) => (
                          <div className="item-artcl" key={blog.id}>
                            <Image src={blog.blog_image} alt={blog.blog_name}
                              className="top-image" width={1000} height={226} />

                            <div className="item-cont1">
                              <h4>
                                {blog.blog_name}
                              </h4>
                              <p>
                                {blog.blog_content.replace(/<[^>]+>/g, '').slice(0, 100)}...
                              </p>
                              {/* <Link href={`/coachsparkle/articles/${blog.id}`}><button>Read Article</button></Link> */}
                              <Link href={`#`}><button>Read Article</button></Link>
                            </div>
                          </div>
                        ))}
                      </div>) : (
                      <div className="artcl-flex no-artical">
                          <p>No articles published yet.</p>                  
                      </div>)}
                  </div>

                  {similarCoachData.data?.length > 0 && <div className="about-section sim-coachs">
                    <h4>Similar Coaches</h4>
                    <SimilarCoaches similarCoachData={similarCoachData.data} />
                  </div>}
                </div>
              </div>

              <div className="col-md-4 coach-profile-list-right">
                <div className="profile-card">

                  {coach?.video_link ? (<video width="100%" height="100%" controls autoPlay>
                    <source src={coach?.video_link} type="video/mp4" />
                  </video>) : (
                    <Image src={`${FRONTEND_BASE_URL}/images/profile-video.webp`} alt="Img"
                      className="top-image" width={1000} height={226} />
                  )}

                  <div className="profile-message">
                    <p className="price">
                      {coach.price ? `$${coach.price}/ hour` : "N/A"}
                    </p>
                    <p className="small-txt">Prices range from {coach?.price_range || 'N/A'}</p>

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
                    <SendMessageButton coachId={coach.user_id} coachName={coach.first_name} />
                    {/* <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      <i className="bi bi-chat-dots"></i> Send Message
                    </button> */}

                    {/* <div
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
                    </div> */}

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
                    {/* <CoachDetailCalendar /> */}
                    <CoachDetailCalendar calendarData={calendarData?.availability} coachId={coach_id} />
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
