"use client";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SmartMatching({ coaches, sectionData, homePageCountData }) {
    const router = useRouter();

    const availableCoaches = homePageCountData?.available_coach_count ?? 0;
    const matchedCount = homePageCountData?.matched_count ?? 0;
    const goalAchievedCount = homePageCountData?.coaching_goal_achieve_count ?? 0;
    return (
        <div className="smarter-matching py-5">
            <div className="container">
                <div className="row smarter-matching-inner align-items-center">
                    <div className="col-md-7 smarter-matching-left">
                        <h1 className="display-5 fw-bold">
                            {sectionData?.title
                                ? sectionData.title
                                    .split(".")
                                    .filter(line => line.trim() !== "")
                                    .map((line, index) => (
                                        <span key={index}>
                                            {line.trim()}.
                                            <br />
                                        </span>
                                    ))
                                : (
                                    <>
                                        Smarter Matching.<br />
                                        Human Connections.<br />
                                        Better Outcomes.
                                    </>
                                )}
                        </h1>
                        <p className="lead">
                            {sectionData?.subtitle || "Describe your goal or challenge — our AI will match you with the right coach"}
                        </p>
                        <div className="search-container">
                            <input type="text" className="form-control search-input" placeholder="“E.g., Improve public speaking for work, in English, evenings preferre" />
                            <div className="ai-btn-find">
                                <button>Start AI Matching</button>
                            </div>
                        </div>

                        <div className="counters-content">
                            <div className="row counters-inner-content">
                                <div className="four col-md-4">
                                    <div className="counter-box">
                                        <span className="counter" data-count={availableCoaches}>{availableCoaches}+</span>
                                        <p>Available Coaches</p>
                                    </div>
                                </div>
                                <div className="four col-md-4">
                                    <div className="counter-box">
                                        <span className="counter" data-count={matchedCount}>{matchedCount}+</span>
                                        <p>Matches made</p>
                                    </div>
                                </div>
                                <div className="four col-md-4">
                                    <div className="counter-box">
                                        <span className="counter" data-count={goalAchievedCount}>{goalAchievedCount}+</span>
                                        <p>Coaching goals achieved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5 smarter-matching-right">
                        <marquee
                            direction="up"
                            height="628px"
                            id="coachMarquee"
                            onMouseOver={(e) => e.currentTarget.stop()}
                            onMouseOut={(e) => e.currentTarget.start()}
                        >
                            {coaches.map((coach) =>
                                <div className="card p-2 d-flex flex-row align-items-center" key={coach.user_id} onClick={() => router.push(`/coach-detail/${coach.user_id}`)}>
                                    <div className="coach-img-left-side me-3">
                                        <Image src={coach.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} className="card-img-top" alt="coach-name" width={1000} height={226} />
                                    </div>
                                    <div className="coach-name-right-side">
                                        <h5 className="mb-1">{coach.first_name} {coach.last_name}</h5>
                                        <p className="mb-1">
                                            {coach?.professional_title}{" "}
                                            {coach?.company_name && (
                                                <>
                                                    <span> at </span>
                                                    {coach.company_name}
                                                </>
                                            )}
                                        </p>
                                        <div className="coach-software-name">
                                            {coach.service_names && (
                                                <div className="software-engineer-list">
                                                    {coach.service_names?.slice(0, 4).map((service) => (<Link href="#" key={service}>{service}</Link>))}
                                                </div>)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </marquee>
                    </div>
                </div>
            </div>
        </div>
    )
}