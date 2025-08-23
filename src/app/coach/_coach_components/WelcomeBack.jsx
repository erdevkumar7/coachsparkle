"use client";
import { useUser } from "@/context/UserContext";
import { FRONTEND_BASE_URL } from "@/utiles/config";

export default function WelcomeBack() {
     const { user } = useUser();


    return (
        <>
            <div className="header">
                <h1>
                    Welcome back, Coach {user?.first_name}! <br /> Ready
                    to empower someone today?
                </h1>
            </div>

            <div className="profile-box">
                <div className="profile-info">
                    <img
                        alt="profile"
                        src={
                            user?.profile_image ||
                            `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                        }                        
                    />
                    <div className="coach-profile-view">
                        <div>
                            {user?.subscription_plan?.plan_name == 'Pro' ? (
                                <p className="pro-add-value">Pro</p>
                            ) : (
                                <p className="basic-add-value">Basic</p>
                            )}
                            <div>
                                <strong>
                                    {user?.first_name} {user?.last_name}
                                </strong>
                            </div>
                            <p className="coach-name-text">Coach</p>
                        </div>
                        <div className="status">
                            <select>
                                <option>Online</option>
                                <option>Offline</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="progress-bar">
                    <div className="progress-line">
                        <div className="progress-fill">
                            <span>80%</span>
                        </div>
                    </div>

                    <div className="update-links">
                        <div className="complete-bar">Profile 80% Complete</div>
                        <div className="links">
                            <a href="#">Update Profile</a>
                            <a href="#">Add Services +</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}