import { FRONTEND_BASE_URL } from '@/utiles/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function SwiperSecond() {
    return (

        <Swiper spaceBetween={20}
            slidesPerView={6}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false, // keep autoplay running after user interaction
            }}
            modules={[Autoplay]} // IMPORTANT: include the Autoplay module
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
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
            }}
        >
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-two.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-three.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-four.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-five.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-six.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-two.png`} alt="carousel" />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-three.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-four.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-five.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-five.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-four.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-six.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src={`${FRONTEND_BASE_URL}/images/global-img-two.png`} alt="carousel" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
};