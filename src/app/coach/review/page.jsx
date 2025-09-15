import '../_styles/review.css';

export default function Review() {
    return (
        <div className="main-panel">
            <div className="content-wrapper coach-wrap review-section-add">
                <div className="rating-reviews">
                    <div className="reviews-left-side">
                        <div className="review-container">
                            <h3 className="text-lg font-semibold mb-4 quick-text">
                                Rating and reviews
                                <span className="total-rating"><i className="bi bi-star"></i> 5.0 (21 reviews)</span>
                            </h3>
                            <div className='review-section table-striped'>
                            <table className="review-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Reviews</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    <tr></tr>
                                </thead>

                                <tbody>
                                    <tr className='border-row-add'></tr>

                                    <tr className="user-row">
                                        <td>
                                            <div className="user-info">
                                                <img src="/coachsparkle/assets/images/coaching-img.png" alt="user" />
                                                <div className="user-details">
                                                    <div className="review-stars"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i></div>
                                                    <strong>Selena McCoy</strong><small>15 October 2024</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="sed-tab"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p></td>
                                        <td><span className="status published">Published</span></td>
                                        <td className="replied-btns"><button className="reply-btn">Replied</button><i className="bi bi-eye"></i></td>
                                    </tr>
                                    <tr className='border-row-add'></tr>
                                    <tr className="user-row">
                                        <td>
                                            <div className="user-info">
                                                <img src="/coachsparkle/assets/images/coaching-img.png" alt="user" />
                                                <div className="user-details">
                                                    <div className="review-stars"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i></div>
                                                    <strong>Selena McCoy</strong><small>15 October 2024</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="sed-tab"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p></td>
                                        <td><span className="status published">Published</span></td>
                                        <td className="action-btns"><button className="reply-btn">Reply</button><i className="bi bi-eye"></i></td>
                                    </tr>
                                    <tr className='border-row-add'></tr>

                                    <tr className="user-row">
                                        <td>
                                            <div className="user-info">
                                                <img src="/coachsparkle/assets/images/coaching-img.png" alt="user" />
                                                <div className="user-details">
                                                    <div className="review-stars"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i></div>
                                                    <strong>Selena McCoy</strong><small>15 October 2024</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="sed-tab"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p></td>
                                        <td><span className="status published">Published</span></td>
                                        <td className="action-btns"><button className="reply-btn">Reply</button><i className="bi bi-eye"></i></td>
                                    </tr>

                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}