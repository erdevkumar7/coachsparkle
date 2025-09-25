import "../_styles/subscription_plan.css";
import SubscriptionUper from "../_coach_components/SubscriptionUper";
import SubscriptionLower from "../_coach_components/SubscriptionLower";
import { getUserProfileData } from "@/app/api/user";

export default async function SubscriptionPlan() {
     const { data: user, error, removeToken } = await getUserProfileData();    

    return (
        <div className="main-panel">
            <div className="new-content-wrapper coach-wrap">
                <div className="container subscription-view-plan">
                   <SubscriptionUper user={user}/>
                    <SubscriptionLower user={user}/>
                </div>
            </div>
        </div>

    );
}