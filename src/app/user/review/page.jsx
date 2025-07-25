import "../_styles/review.css";
import "../_styles/dashboard.css";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Review() {
    return (
        <div className="main-panel">
            <div className="content-wrapper coach-wrap review-section-add">
                <div className="rating-reviews">
                    <div className="reviews-left-side">
                        <div className="review-container">
                            <h3 className="text-lg font-semibold mb-4 quick-text">
                                Rating and reviews
                                
                            </h3>
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
                                    <tr className="border-row-add"></tr>

                                    <tr className="user-row">
                                        <td className="user-name-add">
                                            <div className="user-info">
                                                <p>Coach Name</p>
                                            </div>
                                        </td>
                                        <td className="sed-tab">
                                            <p>“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae”</p>
                                        </td>
                                        <td>
                                            <span className="status published">Published</span>
                                        </td>
                                        <td class="icon-actions">
                                        {/* <BorderColorIcon className="mui-icons edit-icon"/> */}

                                        <DeleteIcon className="mui-icons delet-icon"/>
                                        </td>

                                    </tr>
                                    <tr className="border-row-add"></tr>
                                    <tr className="user-row">
                                    <td className="user-name-add">
                                            <div className="user-info">
                                                <p>Ethan Noah</p>
                                            </div>
                                        </td>
                                        <td className="sed-tab">
                                            <p>“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae”</p>
                                        </td>
                                        <td>
                                            <span className="status published">Published</span>
                                        </td>
                                   
                                        <td class="icon-actions">
                                        {/* <BorderColorIcon className="mui-icons edit-icon"/> */}

                                        <DeleteIcon className="mui-icons delet-icon"/>
                                        </td>

                                    </tr>
                                    <tr className="border-row-add"></tr>

                                    <tr className="user-row">
                                     <td className="user-name-add">
                                            <div className="user-info">
                                                <p>Ethan Noah</p>
                                            </div>
                                        </td>
                                        <td className="sed-tab">
                                        <p>“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae”</p>
                                        </td>
                                        <td>
                                            <span className="status draft">Draft</span>
                                        </td>
                                        <td class="icon-actions">
                                        <BorderColorIcon className="mui-icons edit-icon"/>

                                        <DeleteIcon className="mui-icons delet-icon"/>
                                        </td>

                                    </tr>
                                    <tr className="border-row-add"></tr>


                                    <tr className="user-row">
                                     <td className="user-name-add">
                                            <div className="user-info">
                                                <p>Ethan Noah</p>
                                            </div>
                                        </td>
                                        <td className="sed-tab">
                                        <p>“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae”</p>
                                        </td>
                                        <td>
                                            <span className="status published">Published</span>
                                        </td>
                                        <td class="icon-actions">
                                        {/* <BorderColorIcon className="mui-icons edit-icon"/> */}

                                        <DeleteIcon className="mui-icons delet-icon"/>
                                        </td>

                                    </tr>
                                    <tr className="border-row-add"></tr>



                                    
                                    <tr className="user-row">
                                     <td className="user-name-add">
                                            <div className="user-info">
                                                <p>Ethan Noah</p>
                                            </div>
                                        </td>
                                        <td className="sed-tab">
                                        <p>“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae”</p>
                                        </td>
                                        <td>
                                            <span className="status published">Published</span>
                                        </td>
                                        <td class="icon-actions">
                                        <BorderColorIcon className="mui-icons edit-icon"/>

                                        <DeleteIcon className="mui-icons delet-icon"/>
                                        </td>
                                    </tr>




                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
