"use client";
import { useUser } from "@/context/UserContext";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Link from "next/link";

export default function WelcomeBack({ profile_complete_percentage }) {
    const { user } = useUser();
    let isProUser = user.subscription_plan.plan_status;

    const getProgressWidth = (percent) => {
        return `${Math.min(percent, 100)}%`;
    };

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
                            {isProUser ? (
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
                        {/* <div className="status">
                            <select>
                                <option>Online</option>
                                <option>Offline</option>
                            </select>
                        </div> */}
                        <span className="online-status">Online</span>
                    </div>
                </div>
                <div className="progress-bar">
                    <div className="progress-line">
                        <div className="progress-fill" style={{ width: getProgressWidth(profile_complete_percentage) }}>
                            <span>{profile_complete_percentage}%</span>
                        </div>
                    </div>

                    <div className="update-links">
                        <div className="complete-bar">Profile {profile_complete_percentage}% Complete</div>
                        <div className="links">
                            <Link href="/coach/profile">Update Profile</Link>
                            <Link href="/coach/service-packages">Add Services +</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}