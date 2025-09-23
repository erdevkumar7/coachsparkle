import { cookies } from 'next/headers';
import '../_styles/review.css';
import ReviewTable from '../_coach_components/ReviewTable';

export default async function ReviewPage() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || '';

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachReviewsBackend`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
        cache: 'no-store',
    });

    const data = await res.json();
    const reviews = data.status ? data.data : [];

    return (
        <div className="main-panel">
            <div className="content-wrapper coach-wrap review-section-add">
                <div className="rating-reviews">
                    <div className="reviews-left-side">
                        <div className="review-container">
                            <h3 className="text-lg font-semibold mb-4 quick-text">
                                Rating and reviews
                                <span className="total-rating">
                                    <i className="bi bi-star"></i>{' '}
                                    {reviews.length > 0
                                        ? (
                                            reviews.reduce((a, r) => a + parseFloat(r.rating), 0) /
                                            reviews.length
                                        ).toFixed(1)
                                        : '0.0'}{' '}
                                    ({reviews.length} reviews)
                                </span>
                            </h3>
                            <ReviewTable reviews={reviews} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
