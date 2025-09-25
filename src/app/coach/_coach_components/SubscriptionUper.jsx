import Image from 'next/image';
import { FRONTEND_BASE_URL } from "@/utiles/config";

export default function SubscriptionUper({ user }) {
    let isProUser = user.subscription_plan.plan_name == 'Pro' ? true : false;

    return (
        <div className="pro-coach-banner row align-items-center justify-content-between">
            <div className="col-md-7 mb-4 mb-md-0 pro-coach-banner-botm">
                <h4 className="fw-bold you-currently-text">You are currently on {isProUser ? "Pro Coach Plan" : "Basic Plan"} </h4>
                <p className="leverage-text">
                    {isProUser ? "Leverage on the advanced tools, smarter insights, and exclusive features to grow your coaching business faster.": 
                    " Unlock all premium features, get more insights and exclusive features to grow coaching business faster."}
                    </p>
                {!isProUser && <button className="btn btn-not-pro-learn mt-2">Upgrade</button>}        
                <button className="btn btn-learn mt-2">Learn More</button>                
            </div>
            <div className="col-md-5 pro-plan-right-side-img">

                <Image src={`${FRONTEND_BASE_URL}/images/pro-plan-img.webp`} alt="Image 1" className="img-fluid" width={1000} height={226} />

                {/* <img src="/coachsparkle/images/pro-plan-img.webp" alt="Coaches" className="coach-image" /> */}
            </div>
        </div>
    )
}