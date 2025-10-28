"use client";
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function CoachPlans() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [plans, setPlans] = useState([]);
    const [planType, setPlanType] = useState("monthly");

    useEffect(() => {
        fethPlans(planType);
    }, [planType]);

    const fethPlans = async (type) => {
        try {
            const response = await axios.post(`${apiUrl}/subscriptionplansbyduration?type=${type}`);
            setPlans(response.data.plans);
        } catch (error) {
            console.error("Error fetching plans", error);
        }
    };


    return (
        <div className="choose-plan-you">
            <div className="container">
                <h1 className="text-center">
                    Free for Everyone <br />
                    Premium for Coaches Who Want More
                </h1>
                <p className="text-center">Whether you’re searching for your next coach or listing your expertise,
                    Coach Sparkle is always free to use.</p>
                <p className="text-center span-txt">Users: Browse, match, and message coaches - 100% free<br />
                    Coaches: Join free, list your profile, and get discovered. Ready to stand out? Upgrade to Pro Coach Plan for advance tools and top placement</p>
                <div className="row">
                    <div className="toggle-container">
                        <div className="switch-toggle">
                            <input
                                type="radio"
                                name="plan"
                                id="monthly"
                                checked={planType === "monthly"}
                                onChange={() => setPlanType("monthly")}
                            />
                            <input
                                type="radio"
                                name="plan"
                                id="yearly"
                                checked={planType === "yearly"}
                                onChange={() => setPlanType("yearly")}
                            />
                            <label htmlFor="monthly">Monthly</label>
                            <label htmlFor="yearly">Yearly</label>
                            <div className="slider"></div>
                        </div>
                    </div>
                    <div className="pricing">
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <div className="col-md-4 mb-4" key={plan.id}>
                                    <div className={`card ${plan.plan_amount > 0 ? "featured" : ""}`}>
                                        <h3>{plan.plan_name}</h3>
                                        <p>{plan.plan_amount > 0 ? "Maximize your reach and revenue with advanced tools, full visibility and priority matching" : "Get started with a basic profile to explore the platform and connect with your first few clients."}</p>
                                        <h2>$<span className="number-add">{plan.plan_amount}</span></h2>

                                        <div className="user-list-plan">
                                            <ul>
                                                {plan.features && plan.features.length > 0 ? (
                                                    plan.features.map((feature) => (
                                                        <li key={feature.id}>
                                                            <i className="bi bi-check"></i> {feature.feature_text}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No features available</li>
                                                )}
                                            </ul>

                                            {plan.plan_amount > 0 ? (
                                                <button>
                                                    Subscribe
                                                </button>
                                            ) : (
                                                <Link href="/select-role">
                                                    <button>
                                                        Sign up
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No {planType} plans available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}