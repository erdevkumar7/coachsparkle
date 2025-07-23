"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/match.css";
import "../_styles/favourite.css";
import { HandleValidateToken } from "@/app/api/auth";
import Cookies from "js-cookie";

export default function favourite() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
            return;
        }
        const fetchUser = async () => {
            const tokenData = await HandleValidateToken(token);
            if (!tokenData) {
                Cookies.remove('token');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }

            setUser(tokenData.data)
        };

        fetchUser();
    }, []);

    return (
        <div className="main-panel">
            <div className="content-wrapper favourite-coach-warp">
                <div className="row favourite-coach-page">
                    <h3 className="tittle-text">Favourite coach </h3>

                    <div className="col-md-6 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <div className="inner-card-add">

                                    <i class="bi bi-three-dots"></i>
                                </div>
                                <div className="respond-add">

                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div>
                                        <p className="favourite-text-tittle">Sarah Lee</p>
                                        <p className="life-add-text">Life and Confidence Coach at <b>Comex Pte. Ltd</b>.</p>
                                        <p className="confidence-add-text">Experienced in Personal Development and Life coaching</p>
                                        <div className="star-add-pointer">
                                        <i class="bi bi-star-fill"></i> 
                                            <p>5.0</p>

                                        </div>
                                    </div>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Book</button>
                                    <button className="message-btn">Message</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <div className="inner-card-add">

                                    <i class="bi bi-three-dots"></i>
                                </div>
                                <div className="respond-add">

                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div>
                                        <p className="favourite-text-tittle">Sarah Lee</p>
                                        <p className="life-add-text">Life and Confidence Coach at <b>Comex Pte. Ltd</b>.</p>
                                        <p className="confidence-add-text">Experienced in Personal Development and Life coaching</p>
                                        <div className="star-add-pointer">
                                        <i class="bi bi-star-fill"></i> 
                                            <p>5.0</p>

                                        </div>
                                    </div>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Book</button>
                                    <button className="message-btn">Message</button>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="col-md-6 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <div className="inner-card-add">

                                    <i class="bi bi-three-dots"></i>
                                </div>
                                <div className="respond-add">

                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div>
                                        <p className="favourite-text-tittle">Sarah Lee</p>
                                        <p className="life-add-text">Life and Confidence Coach at <b>Comex Pte. Ltd</b>.</p>
                                        <p className="confidence-add-text">Experienced in Personal Development and Life coaching</p>
                                        <div className="star-add-pointer">
                                        <i class="bi bi-star-fill"></i> 
                                            <p>5.0</p>

                                        </div>
                                    </div>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Book</button>
                                    <button className="message-btn">Message</button>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className="col-md-6 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <div className="inner-card-add">

                                    <i class="bi bi-three-dots"></i>
                                </div>
                                <div className="respond-add">

                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <div>
                                        <p className="favourite-text-tittle">Sarah Lee</p>
                                        <p className="life-add-text">Life and Confidence Coach at <b>Comex Pte. Ltd</b>.</p>
                                        <p className="confidence-add-text">Experienced in Personal Development and Life coaching</p>
                                        <div className="star-add-pointer">
                                        <i class="bi bi-star-fill"></i> 
                                            <p>5.0</p>

                                        </div>
                                    </div>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Book</button>
                                    <button className="message-btn">Message</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>






















            </div>
        </div>
    );

}
