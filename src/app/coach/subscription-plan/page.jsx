import "../_styles/subscription_plan.css";
import { getUserProfileData } from "@/app/api/user";
import SubscriptionPlans from "../_coach_components/SubscriptionPlans";

export default async function SubscriptionPlan() {
     const { data: user, error, removeToken } = await getUserProfileData();    

    return (
        <div className="main-panel">
            <div className="new-content-wrapper coach-wrap">
                <div className="container subscription-view-plan">
                    <SubscriptionPlans user={user} />
                </div>
            </div>
        </div>

    );
}