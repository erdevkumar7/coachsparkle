'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';


export default function SimilarCoaches() {

  return (
    <>
      <Swiper spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, // keep autoplay running after user interaction
        }}
        navigation={true} // ← enable navigation
        modules={[Autoplay, Navigation]} // ← include Navigation module
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <div className="item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
          </div>
        </SwiperSlide>
      </Swiper>


      {/* <div className="container">
                  <div className="row view-all-coaches-view">
                    <div className="col-md-4 col-sm-6 col-md-3 coaches-view-cards">
                      <div className="card h-100">
                        <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
        
                    <div className="col-md-4 col-sm-6 col-md-3 coaches-view-cards">
                      <div className="card h-100">
                        <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
        
                    <div className="col-md-4 col-sm-6 col-md-3 coaches-view-cards">
                      <div className="card h-100">
                        <img src={`/coachsparkle/images/coaches-img-one.png`} className="card-img-top" alt="Coach Image" />
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
                  </div>
                </div> */}
    </>
  )
}