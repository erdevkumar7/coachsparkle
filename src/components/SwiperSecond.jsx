import { FRONTEND_BASE_URL } from '@/config/url_config';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SwiperSecond() {
    return (

        <Swiper spaceBetween={20} slidesPerView={6} loop={true}>
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