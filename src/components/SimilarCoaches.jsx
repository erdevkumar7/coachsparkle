'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Link from 'next/link';

export default function SimilarCoaches({ similarCoachData = [] }) {
  const coachCount = similarCoachData.length;

  // Determine appropriate slide count and loop setting
  const slidesPerView = coachCount < 3 ? coachCount : 3;
  const enableLoop = coachCount >= 3;

  if (coachCount === 0) {
    return <p className="text-center my-4">No similar coaches found.</p>;
  }

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={slidesPerView}
      // loop={enableLoop}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      navigation={coachCount > 1}
      modules={[Navigation]}
      breakpoints={{
        320: {
          slidesPerView: coachCount < 2 ? coachCount : 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: coachCount < 3 ? coachCount : 3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: coachCount < 3 ? coachCount : 3,
          spaceBetween: 20,
        },
      }}
    >
      {similarCoachData.map((coach, index) => (
        <SwiperSlide key={index}>
          <div className="col-md-4 item">
            <div className="coaches-view-cards">
              <div className="card h-100">
                <img
                  src={coach.profile_image || `/coachsparkle/images/coaches-img-two.png`}
                  className="card-img-top"
                  alt="Coach Image"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <Link href={`/coach-detail/${coach?.id}`}>
                      {coach?.first_name} {coach?.last_name}
                    </Link>
                  </h5>
                  <p className="card-text">
                    {coach?.professional_title || 'Coach'}{" "}
                    {coach?.company_name ? `at ${coach?.company_name}` : ''}
                  </p>
                  <div className="software-engineer-list">
                    {(coach.service_names || []).slice(0, 5).map((service, i) => (
                      <a href="#" key={i}>
                        {service}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
