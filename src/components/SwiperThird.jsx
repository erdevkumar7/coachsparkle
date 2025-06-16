import { FRONTEND_BASE_URL } from '@/utiles/config';
import Slider from "react-slick";

export default function SwiperThird() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 2 seconds
        arrows: false, // you can set false if you don't want arrows
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-two.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-three.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-four.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-five.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-six.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-two.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-three.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-four.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-five.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-five.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-four.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-six.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-one.png`} alt="carousel" />
            </div>

            <div className="item">
                <img src={`${FRONTEND_BASE_URL}/images/global-img-two.png`} alt="carousel" />
            </div>
        </Slider>
    );
};