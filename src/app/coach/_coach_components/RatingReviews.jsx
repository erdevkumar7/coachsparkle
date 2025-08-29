import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EastIcon from '@mui/icons-material/East';

export default function RatingReviews() {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4 quick-text">
        Rating And Reviews{" "}
        <span className="total-rating">
          <i className="bi bi-star"></i> 5.0 (21 reviews)
        </span>
      </h3>
      <table className="review-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reviews</th>
            {/* <th>Status</th>
            <th>Action</th> */}
          </tr>
          <tr style={{ height: "10px" }}></tr>
        </thead>
        <tbody>
          <tr className="user-row" style={{ marginBottom: "20px" }}>
            <td>
              <div className="user-info">
                <img
                  src="/coachsparkle/assets/images/coaching-img.png"
                  alt="user"
                />
                <div className="user-details">
                  <div className="review-stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                  </div>
                  <strong>Selena McCoy</strong>

                  <small>15 October 2024</small>
                </div>
              </div>
            </td>
            <td className="sed-tab">
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium"
              </p>
            </td>
            {/* <td>
              <span className="status published">Published</span>
            </td>
            <td className="action-btns">
              <button className="reply-btn">Reply</button>             
              <RemoveRedEyeOutlinedIcon className='eye-icons' />
            </td> */}
          </tr>
          <tr style={{ height: "15px" }}></tr>

          <tr className="user-row" style={{ marginBottom: "20px" }}>
            <td>
              <div className="user-info">
                <img
                  src="/coachsparkle/assets/images/coaching-img.png"
                  alt="user"
                />
                <div className="user-details">
                  <div className="review-stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                  </div>
                  <strong>Selena McCoy</strong>

                  <small>15 October 2024</small>
                </div>
              </div>
            </td>
            <td className="sed-tab">
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium"
              </p>
            </td>
            {/* <td>
              <span className="status published">Published</span>
            </td>
            <td className="action-btns">
              <button className="reply-btn">Reply</button>
              <RemoveRedEyeOutlinedIcon className='eye-icons' />
            </td> */}
          </tr>
          <tr style={{ height: "15px" }}></tr>

          <tr className="user-row" style={{ marginBottom: "20px" }}>
            <td>
              <div className="user-info">
                <img
                  src="/coachsparkle/assets/images/coaching-img.png"
                  alt="user"
                />
                <div className="user-details">
                  <div className="review-stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star"></i>
                  </div>
                  <strong>Selena McCoy</strong>

                  <small>15 October 2024</small>
                </div>
              </div>
            </td>
            <td className="sed-tab">
              <p>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium"
              </p>
            </td>
            {/* <td>
              <span className="status published">Published</span>
            </td>
            <td className="action-btns">
              <button className="reply-btn">Reply</button>
              <RemoveRedEyeOutlinedIcon className='eye-icons' />
            </td> */}
          </tr>
        </tbody>
      </table>
      <div className="view-all">
        <button>
          View All
          <EastIcon className="mui-icons" />
        </button>
      </div>
    </>
  );
}
