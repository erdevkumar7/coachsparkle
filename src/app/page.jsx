// 'use client';
// import React, { useEffect } from "react";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SwiperSecond from "@/components/SwiperSecond";
// import SwiperThird from "@/components/SwiperThird";
import SwiperOne from "@/components/SwiperOne";
// import SwiperFour from "@/components/SwiperFour";
import Image from 'next/image';
import EastIcon from '@mui/icons-material/East';
import CheckIcon from '@mui/icons-material/Check';
import { HandleValidateTokenOnServer } from "./api/user";


export default async function Home() {
  const tokenData = await HandleValidateTokenOnServer();
  let user;
  if (tokenData) {
    user = tokenData?.data
  }

  return (
    <>
      <Header user={user}/>
      <div className="smarter-matching py-5">
        <div className="container">
          <div className="row smarter-matching-inner align-items-center">
            <div className="col-md-7 smarter-matching-left">
              <h1 className="display-5 fw-bold">
                Smarter Matching.<br />
                Human Connections. <br />
                Better Outcomes.
              </h1>
              <p className="lead">Describe your goal or challenge — our AI will match you with
                the right coach</p>
              <div className="search-container">
                <input type="text" className="form-control search-input" placeholder="“E.g., Improve public speaking for work, in English, evenings preferre" />
                <div className="ai-btn-find">
                  <button>Start AI Matching</button>
                </div>
              </div>

              <div className="counters-content">
                <div className="row counters-inner-content">
                  <div className="four col-md-4">
                    <div className="counter-box">
                      <span className="counter" data-count="680">680</span>
                      <p>Available Coaches</p>
                    </div>
                  </div>
                  <div className="four col-md-4">
                    <div className="counter-box">
                      <span className="counter" data-count="8000">8k+</span>
                      <p>Matches made</p>
                    </div>
                  </div>
                  <div className="four col-md-4">
                    <div className="counter-box">
                      <span className="counter" data-count="100">100+</span>
                      <p>Coaching goals achieved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 smarter-matching-right">
              <marquee direction="up" height="628px" id="coachMarquee">
                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-one.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-two.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-two.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-one.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>

                <div className="card p-2 d-flex flex-row align-items-center">
                  <div className="coach-img-left-side me-3">
                    <Image src={`${FRONTEND_BASE_URL}/images/ellipse-two.png`} className="card-img-top" alt="coach-name" width={1000} height={226} />

                  </div>

                  <div className="coach-name-right-side">
                    <h5 className="mb-1">Coach Name Will Go Here</h5>
                    <p className="mb-1">Staff Software Engineer at eBay</p>
                    <div className="coach-software-name">
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                      <a href="#" className="me-2">Software</a>
                    </div>
                  </div>
                </div>
              </marquee>
            </div>
          </div>
        </div>
      </div>



      <div className="global-companies">
        <div className="container">
          <h1 className="text-center">Trusted by 500+ Global Partners</h1>
          <SwiperSecond />
          {/* <SwiperThird />      */}
        </div>
      </div>

      <div className="dedicated-career-coach">
        <div className="container">
          <div className="row dedicated-career-coach-inner">

            <div className="col-md-6 mb-4 mb-md-0 dedicated-career-coach-left">
              <h1 className="mb-3">Coach Sparkle uses AI to deliver personalized coach matches - faster and smarter</h1>
              <p>
                Coach Sparkle uses smart AI to understand your coaching goals, preferences, and availability — then instantly matches you with coaches who align with your needs. Whether you’re looking to build confidence, grow your career, or improve a skill, our AI cuts through the noise to connect you with the right coach — saving you time and ensuring a better fit from the start. You can also use CoachSparkle to find the right coach for your child, a loved one, or even aging parents — because growth and support matter at every stage of life.
              </p>

              <a href="#" className="learn-more-btn-add">Try Know <EastIcon className="mui-icons" /></a>
            </div>


            <div className="col-md-6 dedicated-career-coach-right">
              <Image src={`${FRONTEND_BASE_URL}/images/career-coach-img.webp`} className="card-img-top" alt="career-coach" width={1000} height={226} />

            </div>
          </div>

          <div className="row coaching-approach-inner">

            <div className="col-md-6 coaching-approach-right">
              <Image src={`${FRONTEND_BASE_URL}/images/coaching-approach-img.webp`} className="card-img-top" alt="coaching approach" width={1000} height={226} />

            </div>


            <div className="col-md-6 mb-4 mb-md-0 coaching-approach-left">
              <h1 className="mb-3">
                It’s always free to use - for learners, users and curious browsers
              </h1>
              <div className="clear-informative">
                <div className="informative-text">
                  <div>
                    <p>
                      Coach Sparkle is free to use for anyone looking for coaching. Whether you're exploring options, comparing profiles, or sending a coaching request, there’s no cost to browse, match, or message coaches. No hidden fees. No commitment required — just the freedom to find the right support at your own pace.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


      <div className="explore-coaches">
        <div className="container">
          <div className="explore-coaches-section">
            <div className="row explore-coaches-inner-content">
              <div className="col-md-12 adipiscing-text">
                <h1>Explore 1,000+ Available Coaches</h1>
                <p>
                  Browse by category, read real profiles, and connect with a coach who truly gets you.<br />
                  Start your journey today — it’s free, personalized, and built around your goals.
                </p>
              </div>
              <div className="professional-top">
                <a href="#" className="view-all-add-btn text-right">VIEW ALL <EastIcon className="mui-icons" /></a>
                <div className="professional-cards">
                  <div className="card">
                    <img src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Career & Professional" className="img-fluid" />
                    <h5>Career & Professional Coaches</h5>
                    <ul>
                      <li><CheckIcon className="mui-icons" />Career Coach</li>
                      <li><CheckIcon className="mui-icons" />Executive Coach</li>
                      <li><CheckIcon className="mui-icons" />Business Coach</li>
                    </ul>
                  </div>

                  <div className="card">
                    <Image src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Personal Development" width={1000} height={226} />

                    <h5>Personal Development & Life Coaches</h5>
                    <ul>
                      <li><CheckIcon className="mui-icons" />Life Coach</li>
                      <li><CheckIcon className="mui-icons" />Confidence Coach</li>
                      <li><CheckIcon className="mui-icons" />Mindset Coach</li>
                    </ul>
                  </div>

                  <div className="card">
                    <Image src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Wellness & Health" width={1000} height={226} />

                    <h5>
                      Wellness & Health <br />
                      Coaches
                    </h5>
                    <ul>
                      <li><CheckIcon className="mui-icons" />Health Coach</li>
                      <li><CheckIcon className="mui-icons" />Fitness Coach</li>
                      <li><CheckIcon className="mui-icons" />Nutrition Coach</li>
                    </ul>
                  </div>

                  <div className="card">
                    <Image src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Family & Youth" width={1000} height={226} />

                    <h5>Family, Relationship & Youth Coaches</h5>
                    <ul>
                      <li><CheckIcon className="mui-icons" />Academic Coach</li>
                      <li><CheckIcon className="mui-icons" />Learning Specialist</li>
                      <li><CheckIcon className="mui-icons" />Language Coach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="view-all-coaches-list">
        <div className="container">
          <div className="search-container">
            <div className="search-input">
              <h1>Featured Coaches</h1>
            </div>
            <div className="view-all-btn">
              <a href="#">View All Coaches <EastIcon className="mui-icons" /></a>
            </div>
          </div>
          <div className="row view-all-coaches-view">
            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">

                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />
                {/* <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" /> */}
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">
                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">
                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-one.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />

                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">
                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row view-all-coaches-view">
            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">
                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">
                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />
                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">

                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-one.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />

                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">
                <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />

                <div className="card-body">
                  <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                  <p className="card-text">Staff Software Engineer at eBay</p>
                  <div className="software-engineer-list">
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                    <a href="#">Software</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="how-it-work">
        <div className="container">
          <h1 className="text-center">Multiple Ways to Find Your Ideal Coaches</h1>
          <div className="row how-it-work-inner-part">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h1>01</h1>
                  <h5 className="card-title">Manual Search</h5>
                  <span>Browse with Filters</span>
                  <p className="card-text">Use standard filters like category, location,
                    budget, and language to find coaches manually at your own pace.</p>
                </div>
                <div className="btn_hiw">
                  <a href="#">Try Now</a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card two">
                <div className="card-body">
                  <h1>02</h1>
                  <h5 className="card-title">Send a Coaching Request</h5>
                  <span>Let Coaches Come to You</span>
                  <p className="card-text">
                    Describe your coaching need and we’ll notify all qualified coaches.
                    Those interested will reach out to you directly.</p>
                </div>
                <div className="btn_hiw">
                  <a href="#">Try Now</a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h1>03</h1>
                  <h5 className="card-title">Smart AI Matching</h5>
                  <span>Let AI Recommend Your Fit</span>
                  <p className="card-text">Share your goal, availability, and preferences — our AI will
                    suggest the most suitable coaches for you in seconds.</p>
                </div>
                <div className="btn_hiw">
                  <a href="#">Try Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="people-love-living">
        <div className="container">
          <h1>People Love Using Coach Sparkle</h1>
          <p>Hear What the Coachees have to say</p>
          <SwiperOne />
          {/* <SwiperFour /> */}
        </div>
      </div>


      <div className="latest-articles-explore">
        <div className="container">
          <h1>Latest Articles</h1>
          <p>Read Articles Contributed by Featured Coaches</p>
          <div className="row latest-articles-inner">
            <div className="articles-btn-top">
              <a href="#" className="articles-btn-add">All articles</a>
            </div>
            <div className="latest-articles-cards-content">
              <div className="col-12 col-sm-6 col-md-4 latest-articles-cards">
                <div className="card h-100">
                  <Image src={`${FRONTEND_BASE_URL}/images/articles-img-one.webp`} alt="Coach Image" width={1000} height={226} />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Article Heading</h5>
                    <h6><i className="bi bi-calendar"></i> Apr 30, 2025</h6>
                    <p className="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem...</p>
                    <a href="#" className="read-more-btn">Read More..</a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 latest-articles-cards">
                <div className="card h-100">
                  <Image src={`${FRONTEND_BASE_URL}/images/articles-img-two.webp`} alt="latest articles" width={1000} height={226} />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Article Heading</h5>
                    <h6><i className="bi bi-calendar"></i> Apr 30, 2025</h6>
                    <p className="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem...</p>
                    <a href="#" className="read-more-btn">Read More..</a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 latest-articles-cards">
                <div className="card h-100">
                  <Image src={`${FRONTEND_BASE_URL}/images/articles-img-three.webp`} alt="latest articles" width={1000} height={226} />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Article Heading</h5>
                    <h6><i className="bi bi-calendar"></i> Apr 30, 2025</h6>
                    <p className="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem...</p>
                    <a href="#" className="read-more-btn">Read More..</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="choose-plan-you">
        <div className="container">
          <h1 className="text-center">
            Free for Everyone <br />
            Premium for Coaches Who Want More
          </h1>
          <p className="text-center">Whether you’re searching for your next coach or listing your expertise,
            Coach Sparkle is always free to use.</p>
          <p className="text-center span-txt">Users: Browse, match, and message coaches - 100% free<br />
            Coaches: Join free, list your profile, and get discovered. Ready to stand out? Upgrade to Pro Coach Plan for advance tools and top placement</p>
          <div className="row">
<<<<<<< HEAD
              <div className="toggle-container">
                <div className="switch-toggle">
                    <input type="radio" name="plan" id="monthly" ></input>
                    <input type="radio" name="plan" id="yearly"></input>
                    <label htmlFor="monthly" className="monthly-text">Monthly</label>
                    <label htmlFor="yearly">Yearly</label>
                    <div className="slider"></div>
                </div>
=======
            <div className="toggle-container">
              <div className="switch-toggle">
                <input type="radio" name="plan" id="monthly" ></input>
                <input type="radio" name="plan" id="yearly"></input>
                <label htmlFor="monthly">Monthly</label>
                <label htmlFor="yearly">Yearly</label>
                <div className="slider"></div>
>>>>>>> cac6dac10db532cf6a2962da72bde64623386820
              </div>
            </div>
            <div className="pricing">
              <div className="col-md-4">
                <div className="card">
                  <h3>Basic Plan</h3>
                  <p>Get started with a basic profile to explore the platform and connect with your first few clients.</p>
                  <h2>$<span className="number-add">0</span></h2>
                  <div className="user-list-plan">
                    <ul>
                      <li><i className="bi bi-check"></i>Basic Listing In 1 Category</li>
                      <li><i className="bi bi-check"></i>500 Character Bio + Photo</li>
                      <li><i className="bi bi-check"></i> Standard AI Matching</li>
                      <li><i className="bi bi-check"></i>Up to  5 Notifications / Month</li>
                      <li><i className="bi bi-check"></i>Manual Booking Only</li>
                      <li><i className="bi bi-check"></i>Fixed Pricing</li>
                      <li><i className="bi bi-check"></i>Text Message Only</li>
                      <li><i className="bi bi-check"></i>Standard Support, Limited Analytics</li>
                    </ul>
                    <button>Sign up</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card featured">
                  <h3>Pro Coach Plan</h3>
                  <p>Maximize your reach and revenue with advanced tools, full visibility and priority matching</p>
                  <h2>$<span className="number-add">190</span></h2>
                  {/* <span className="save">Save <span> $50 </span> a year</span> */}
                  <div className="user-list-plan">
                    <ul>
                      <li><i className="bi bi-check"></i>Featured Listing In Unlimited Categories With Priority</li>
                      <li><i className="bi bi-check"></i>3000 Character, Intro Video & Media Gallery</li>
                      <li><i className="bi bi-check"></i>Real Time Alerts + Priority AI Matching</li>
                      <li><i className="bi bi-check"></i>Unlimited Coaching Request Notifications</li>
                      <li><i className="bi bi-check"></i>Smart Calendar Sync + Auto Booking Capabilities</li>
                      <li><i className="bi bi-check"></i>Custom Pricing, Bundled Packages, and Flexible Offers</li>
                      <li><i className="bi bi-check"></i>Email, Video Call and Client Interest Insights</li>
                      <li><i className="bi bi-check"></i>24 Hours Priority Support + Full Analytics Dashboard</li>
                    </ul>
                    <button>Start Free! First 3 months on us!</button>
                  </div>
                </div>
              </div>

              {/* <div className="col-md-4">
                <div className="card">
                  <h3>Premium</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                  <h2>$<span className="number-add">16</span></h2>
                  <div className="user-list-plan">
                    <ul>
                      <li><i className="bi bi-check"></i>Features</li>
                      <li><i className="bi bi-check"></i>Features</li>
                      <li><i className="bi bi-check"></i> Features</li>
                      <li><i className="bi bi-check"></i>Features</li>
                      <li><i className="bi bi-check"></i>Features</li>
                    </ul>
                    <button>Signup</button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>


      <div className="your-organization-coach">
        <div className="container">
          <div className="row organization-coach">
            <h1 className="text-center">Unlock Human Potential in Your Workforce</h1>
            <p className="text-center">
              From executive coaching to team development and mental wellness — Coach Sparkle helps companies elevate people,
              culture, and performance through curated coaching solutions
            </p>
            <div className="register-add">
              <a href="#" className="register-now-btn">Find Corporate Coaches</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}