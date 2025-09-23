import EastIcon from '@mui/icons-material/East';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function RatingReviews() {
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

  const displayedReviews = reviews.slice(0, 4);

  return (
    <>
      <h3 className="text-lg font-semibold mb-4 quick-text">
        Rating And Reviews{" "}
        <span className="total-rating">
          <i className="bi bi-star"></i>{" "}
          {reviews.length > 0
            ? (
                reviews.reduce((a, r) => a + parseFloat(r.rating), 0) /
                reviews.length
              ).toFixed(1)
            : "0.0"}{" "}
          ({reviews.length} reviews)
        </span>
      </h3>

      <table className="review-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reviews</th>
          </tr>
          <tr style={{ height: "10px" }}></tr>
        </thead>
        <tbody>
          {displayedReviews.map((review) => (
            <tr key={review.id} className="user-row">
              <td>
                <div className="user-info">
                  <img
                    src={
                      review.user?.profile_image ||
                      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/default_profile.jpg`
                    }
                    alt={review.user?.display_name || "user"}
                    width={50}
                    height={50}
                  />
                  <div className="user-details">
                    <div className="review-stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi bi-star${
                            i < Math.round(review.rating) ? "-fill" : ""
                          }`}
                        ></i>
                      ))}
                    </div>
                    <strong>
                      {`${review.user?.first_name} ${review.user?.last_name}`}
                    </strong>
                    <small>
                      {new Date(review.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </small>
                  </div>
                </div>
              </td>
              <td className="sed-tab">
                <p>{review.review_text}</p>
              </td>
            </tr>
          ))}

          {reviews.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>


        <div className="view-all">
          <Link href="/coach/review">
            <button>
              View All
              <EastIcon className="mui-icons" />
            </button>
          </Link>
        </div>
    </>
  );
}
