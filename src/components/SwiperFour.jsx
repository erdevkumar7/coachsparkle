import { FRONTEND_BASE_URL } from '@/utiles/config';
import Slider from "react-slick";

export default function SwiperFour() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true, // you can set false if you don't want arrows
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
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
        </Slider>
    );
};