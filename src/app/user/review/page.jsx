import "../_styles/review.css";
import "../_styles/dashboard.css";
import { cookies } from "next/headers"; 
import { getUserReviews } from "@/app/api/user";
import ReviewTable from "../_user_components/ReviewTable";

export default async function Review() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; 

    const { error, data: reviews } = await getUserReviews();


    return (
        <div className="main-panel">
            <div className="content-wrapper coach-wrap review-section-add">
                <div className="rating-reviews">
                    <div className="reviews-left-side">
                        <div className="review-container">
                            <h3 className="text-lg font-semibold mb-4 quick-text">
                                Rating and reviews
                            </h3>
                            <ReviewTable reviews={reviews} token={token} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
