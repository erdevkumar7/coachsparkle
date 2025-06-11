'use client';
import React, { useEffect } from "react";
import { FRONTEND_BASE_URL } from "@/config/url_config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Home() {
  useEffect(() => {
    // ✅ Marquee control
    const marquee = document.getElementById("coachMarquee");
    if (marquee) {
      marquee.addEventListener("mouseover", () => marquee.stop());
      marquee.addEventListener("mouseout", () => marquee.start());
    }

    // ✅ Owl Carousel
    if (window.$ && window.$(".owl-carousel").owlCarousel) {
      window.$(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 3 },
          768: { items: 4 },
          1024: { items: 6 },
        },
      });
    }

    // ✅ Swiper Carousel
    if (window.Swiper) {
      new window.Swiper(".swiper-container", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }

    // ✅ Counter animation
    if (window.$) {
      window.$(".counter").each(function () {
        const $this = window.$(this);
        const countTo = parseInt($this.attr("data-count"), 10);
        window.$({ countNum: 0 }).animate(
          { countNum: countTo },
          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              if (countTo >= 1000) {
                const kValue = Math.round(countTo / 1000);
                $this.text(kValue + "K+");
              } else {
                $this.text(countTo);
              }
            },
          }
        );
      });
    }

    // ✅ Cleanup for marquee (optional)
    return () => {
      if (marquee) {
        marquee.removeEventListener("mouseover", () => marquee.stop());
        marquee.removeEventListener("mouseout", () => marquee.start());
      }
    };
  }, []);
  return (
    <>
      <Header />
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
                <i className="fas fa-search search-icon"></i>
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-one.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-two.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-two.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-one.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-three.png`} alt="Coach Image" />
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
                    <img src={`${FRONTEND_BASE_URL}/images/ellipse-two.png`} alt="Coach Image" />
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

          <div className="owl-carousel owl-theme owl-loaded owl-drag">
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(-1527px, 0px, 0px)",
                  transition: "all 0.25s ease 0s",
                  width: "3334px"
                }}
              >
                {[
                  "global-img-one.png",
                  "global-img-two.png",
                  "global-img-three.png",
                  "global-img-four.png",
                  "global-img-five.png",
                  "global-img-six.png",
                  "global-img-one.png",
                  "global-img-two.png",
                  "global-img-three.png",
                  "global-img-four.png",
                  "global-img-five.png",
                  "global-img-five.png",
                  "global-img-four.png",
                  "global-img-one.png",
                  "global-img-two.png",
                  "global-img-six.png",
                  "global-img-four.png",
                  "global-img-one.png",
                  "global-img-three.png",
                  "global-img-two.png"
                ].map((img, index) => (
                  <div
                    key={index}
                    className={`owl-item ${index < 7 ? "cloned" : ""}`}
                    style={{ width: "128.906px", marginRight: "10px" }}
                  >
                    <div className="item">
                      <img src={`${FRONTEND_BASE_URL}/images/${img}`} alt="carousel" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
        <div className="owl-nav disabled"></div>
      </div>

      {/* <div className="global-companies">
        <div className="container">
          <h1 className="text-center">Trusted by 1000+ global companies</h1>
        </div>
      </div> */}


      <div className="dedicated-career-coach">
        <div className="container">
          <div className="row dedicated-career-coach-inner">

            <div className="col-md-6 mb-4 mb-md-0 dedicated-career-coach-left">
              <h1 className="mb-3">Coach Sparkle uses AI to deliver personalized coach matches - faster and smarter</h1>
              <p>
                Coach Sparkle uses smart AI to understand your coaching goals, preferences, and availability — then instantly matches you with coaches who align with your needs. Whether you’re looking to build confidence, grow your career, or improve a skill, our AI cuts through the noise to connect you with the right coach — saving you time and ensuring a better fit from the start. You can also use CoachSparkle to find the right coach for your child, a loved one, or even aging parents — because growth and support matter at every stage of life.
              </p>

              <a href="#" className="learn-more-btn-add">Try Know <i className="bi bi-arrow-right"></i></a>
            </div>


            <div className="col-md-6 dedicated-career-coach-right">
              <img src={`${FRONTEND_BASE_URL}/images/career-coach-img.png`} alt="Career Coach" className="img-fluid" />
            </div>
          </div>

          <div className="row coaching-approach-inner">

            <div className="col-md-6 coaching-approach-right">
              <img src={`${FRONTEND_BASE_URL}/images/coaching-approach-img.png`} alt="coaching approach" className="img-fluid" />
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
                <a href="#" className="view-all-add-btn text-right">VIEW ALL<i className="bi bi-arrow-right"></i></a>
                <div className="professional-cards">
                  <div className="card">
                    <img src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Career & Professional" className="img-fluid" />
                    <h5>Career & Professional Coaches</h5>
                    <ul>
                      <li><i className="bi bi-check-lg"></i>Career Coach</li>
                      <li><i className="bi bi-check-lg"></i>Executive Coach</li>
                      <li><i className="bi bi-check-lg"></i>Business Coach</li>
                    </ul>
                  </div>

                  <div className="card">
                    <img src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Personal Development" className="img-fluid" />
                    <h5>Personal Development & Life Coaches</h5>
                    <ul>
                      <li><i className="bi bi-check-lg"></i>Life Coach</li>
                      <li><i className="bi bi-check-lg"></i>Confidence Coach</li>
                      <li><i className="bi bi-check-lg"></i>Mindset Coach</li>
                    </ul>
                  </div>

                  <div className="card">
                    <img src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Wellness & Health" className="img-fluid" />
                    <h5>
                      Wellness & Health <br />
                      Coaches
                    </h5>
                    <ul>
                      <li><i className="bi bi-check-lg"></i>Health Coach</li>
                      <li><i className="bi bi-check-lg"></i>Fitness Coach</li>
                      <li><i className="bi bi-check-lg"></i>Nutrition Coach</li>
                    </ul>
                  </div>

                  <div className="card">
                    <img src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Family & Youth" className="img-fluid" />
                    <h5>Family, Relationship & Youth Coaches</h5>
                    <ul>
                      <li><i className="bi bi-check-lg"></i>Academic Coach</li>
                      <li><i className="bi bi-check-lg"></i>Learning Specialist</li>
                      <li><i className="bi bi-check-lg"></i>Language Coach</li>
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
              <input type="text" className="form-control search-input" placeholder="Search Coaches..." />
              <i className="fas fa-search search-icon"></i>
            </div>
            <div className="view-all-btn">
              <a href="#">View All Coaches <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>
          <div className="row view-all-coaches-view">
            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
              <div className="card h-100">
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-one.png`} className="card-img-top" alt="Coach Image" />
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
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-one.png`} className="card-img-top" alt="Coach Image" />
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
                <img src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                  <p className="card-text">Use standard filters like category, location,
                    budget, and language to find coaches manually at your own pace.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card two">
                <div className="card-body">
                  <h1>02</h1>
                  <h5 className="card-title">Send a Coaching Request</h5>
                  <p className="card-text">
                    Describe your coaching need and we’ll notify all qualified coaches.
                    Those interested will reach out to you directly.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h1>03</h1>
                  <h5 className="card-title">Smart AI Matching</h5>
                  <p className="card-text">Share your goal, availability, and preferences — our AI will
                    suggest the most suitable coaches for you in seconds.</p>
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

          <div className="swiper-container slide-container">
            <div className="swiper-wrapper">

              <div className="swiper-slide">
                <div className="card-content">
                  <h2 className="name">Great Work</h2>
                  <h5 className="description">“At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et”</h5>
                  <img src="https://votivephp.in/realstate/resources/assets/img/star-symbol.png" />
                  <div className="good-jobs-content">
                    <img src="https://votivephp.in/realstate/resources/assets/img/people-one.png" />
                    <div>
                      <h4>Ali Tufan</h4>
                      <h5>Marketing</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="card-content">
                  <h2 className="name">Good Job</h2>
                  <h5 className="description">“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae”</h5>
                  <img src="https://votivephp.in/realstate/resources/assets/img/star-symbol.png" />
                  <div className="good-jobs-content">
                    <img src="https://votivephp.in/realstate/resources/assets/img/people-two.png" />
                    <div>
                      <h4>Albert Flores</h4>
                      <h5>Designer</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="card-content">
                  <h2 className="name">Perfect</h2>
                  <h5 className="description">“Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo”</h5>
                  <img src="https://votivephp.in/realstate/resources/assets/img/star-symbol.png" />
                  <div className="good-jobs-content">
                    <img src="https://votivephp.in/realstate/resources/assets/img/people-three.png" />
                    <div>
                      <h4>Robert Fox</h4>
                      <h5>Developer</h5>
                    </div>
                  </div>
                </div>
              </div>


            </div>


            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>


            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>


      <div className="latest-articles-explore">
        <div className="container">
          <h1>Latest articles</h1>
          <p>Explore our Free Acticles</p>
          <div className="row latest-articles-inner">
            <div className="articles-btn-top">
              <a href="#" className="articles-btn-add">All articles</a>
            </div>
            <div className="latest-articles-cards-content">
              <div className="col-12 col-sm-6 col-md-4 latest-articles-cards">
                <div className="card h-100">
                  <img src={`${FRONTEND_BASE_URL}/images/articles-img-one.png`} className="card-img-top" alt="Coach Image" />
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
                  <img src={`${FRONTEND_BASE_URL}/images/articles-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                  <img src={`${FRONTEND_BASE_URL}/images/articles-img-three.png`} className="card-img-top" alt="Coach Image" />
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
            Choose Plan <br />
            That’s Right For You
          </h1>
          <p className="text-center">Choose plan that works best for you, feel free to contact us</p>
          <div className="row">
            <div className="pricing">
              <div className="col-md-4">
                <div className="card">
                  <h3>Introductory Call</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                  <h2>$<span className="number-add">0</span></h2>
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
              </div>
              <div className="col-md-4">
                <div className="card featured">
                  <h3>Study Plan</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                  <h2>$<span className="number-add">8</span></h2>
                  <span className="save">Save <span> $50 </span> a year</span>
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
              </div>

              <div className="col-md-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="your-organization-coach">
        <div className="container">
          <div className="row organization-coach">
            <h1 className="text-center">Transform your organization with Coach Sparkle today</h1>
            <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="register-add">
              <a href="#" className="register-now-btn">REGISTER NOW</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
