'use client';
import { FRONTEND_BASE_URL } from '@/utiles/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function SwiperSecond({ partners }) {
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
            {partners && partners.length > 0 ? (
                partners.map((partner) => (
                    <SwiperSlide key={partner.id}>
                        <div className="item">
                            <Image
                                src={partner.logo}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                                onError={(e) => {
                                    e.target.src = `${FRONTEND_BASE_URL}/images/global-img-one.png`;
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-one.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-two.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-three.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-four.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-five.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-six.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-one.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <Image
                                src={`${FRONTEND_BASE_URL}/images/global-img-two.png`}
                                className="w-full h-auto object-contain"
                                alt="log_img"
                                width={186}
                                height={20}
                            />
                        </div>
                    </SwiperSlide>
                </>
            )}
        </Swiper>
    );
};