'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function SwiperOne() {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            // autoplay={{
            //     delay: 1000, 
            //     disableOnInteraction: false, // keep autoplay running after user interaction
            // }}
           // modules={[Autoplay]} // IMPORTANT: include the Autoplay module
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }}
        >
            <SwiperSlide>
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
            </SwiperSlide>
            <SwiperSlide>
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
            </SwiperSlide>
            <SwiperSlide>
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
            </SwiperSlide>
        </Swiper>
    );
};