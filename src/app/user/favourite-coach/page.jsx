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
            <div className="content-wrapper">
                <div className="row favourite-coach-page">
                    <h3 className="tittle-text">Favourite coach</h3>
                    <div className="col-md-4 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <p className="favourite-text-tittle">Tracy McCoy</p>
                                <div className="respond-add">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <p>Senior Enginner at IBM</p>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Apply</button>
                                    <button className="message-btn">Remove</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <p className="favourite-text-tittle">Gary Sims</p>
                                <div className="respond-add">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <p>Data Analyst at IBM</p>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Apply</button>
                                    <button className="message-btn">Remove</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-4 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <p className="favourite-text-tittle">Joe Wilson</p>
                                <div className="respond-add">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <p>Web Developer at IBM</p>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Apply</button>
                                    <button className="message-btn">Remove</button>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className="col-md-4 favourite-card">

                        <div className="card engagements-cards">
                            <div className="card-body">
                                <p className="favourite-text-tittle">Trish Boucher</p>
                                <div className="respond-add">
                                    <img src="/coachsparkle/assets/images/professional-img.png" alt="Coach Image" className="coach-img" />
                                    <p>UI/UX at IBM</p>
                                </div>

                                <div className="two-btn-free">
                                    <button className="start-btn">Apply</button>
                                    <button className="message-btn">Remove</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>






















            </div>
        </div>
    );

}
