export default function MainContent() {
    <div className="container-fluid page-body-wrapper">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Overview</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                        aria-controls="ui-basic">
                        <div>
                            <i className="fa fa-user"></i>
                            <span className="menu-title">Profile</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                        aria-controls="ui-basic">
                        <div>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            <span className="menu-title">Home</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                        aria-controls="ui-basic">
                        <div>
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                            <span className="menu-title">My Schedule</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                        aria-controls="ui-basic">
                        <div>
                            <i className="fa fa-bell" aria-hidden="true"></i>
                            <span className="menu-title">Subscription</span>
                        </div>
                    </a>
                </li>


                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                        aria-controls="ui-basic">
                        <div>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            <span className="menu-title">Account Settings</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false"
                        aria-controls="ui-basic">
                        <div>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span className="menu-title"> Sign Out</span>
                        </div>
                    </a>
                </li>
            </ul>
        </nav>

        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold quick-text-add">Quick Stats</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin transparent profile-view-cards">
                        <div className="row profile-view-inner">
                            <div className="col-md-3 stretch-card transparent">
                                <div className="card card-tale-custom shadow-sm rounded-4 p-3 border-0 one">
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-users" aria-hidden="true"></i>
                                        <div>
                                            <p className="view-text">Profile Views</p>
                                            <h4 className="mb-0 fw-bold">3.5k</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3 stretch-card transparent">
                                <div className="card card-tale-custom shadow-sm rounded-4 p-3 border-0 two">
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-commenting-o" aria-hidden="true"></i>
                                        <div>
                                            <p className="view-text">New Messages</p>
                                            <h4 className="mb-0 fw-bold">24</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3 stretch-card transparent">
                                <div className="card card-tale-custom shadow-sm rounded-4 p-3 border-0 three">
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-codepen" aria-hidden="true"></i>
                                        <div>
                                            <p className="view-text">Upcoming Sessions</p>
                                            <h4 className="mb-0 fw-bold">06</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="row top-products-add">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title mb-0">Active Matches</p>
                                <div className="table-responsive">
                                    <table className="table table-striped table-borderless">
                                        <thead className="heading-add">
                                            <tr>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Mobile No</th>
                                                <th>Email ID</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Ethan Noah</td>
                                                <td className="font-weight-bold">10 March, 2023</td>
                                                <td>10:35AM</td>
                                                <td>
                                                    00 000 00000
                                                </td>
                                                <td>xyz@xyz.com</td>
                                                <td className="font-weight-medium">
                                                    <div className="badge badge-success">Success</div>
                                                </td>
                                                <td className="actions">
                                                    <button className="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="delete"><i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Ethan Noah</td>
                                                <td className="font-weight-bold">10 March, 2023</td>
                                                <td>10:35AM</td>
                                                <td>
                                                    00 000 00000
                                                </td>
                                                <td>xyz@xyz.com</td>
                                                <td className="font-weight-medium">
                                                    <div className="badge badge-success">Success</div>
                                                </td>
                                                <td className="actions">
                                                    <button className="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="delete"><i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Ethan Noah</td>
                                                <td className="font-weight-bold">10 March, 2023</td>
                                                <td>10:35AM</td>
                                                <td>
                                                    00 000 00000
                                                </td>
                                                <td>xyz@xyz.com</td>
                                                <td className="font-weight-medium">
                                                    <div className="badge badge-success">Success</div>
                                                </td>
                                                <td className="actions">
                                                    <button className="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="delete"><i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Ethan Noah</td>
                                                <td className="font-weight-bold">10 March, 2023</td>
                                                <td>10:35AM</td>
                                                <td>
                                                    00 000 00000
                                                </td>
                                                <td>xyz@xyz.com</td>
                                                <td className="font-weight-medium">
                                                    <div className="badge badge-success">Success</div>
                                                </td>
                                                <td className="actions">
                                                    <button className="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="delete"><i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card sales-report-left">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <p className="card-title">Profile Views</p>
                                    <a href="#" className="text-info">View all</a>
                                </div>

                                <div id="sales-chart-legend" className="chartjs-legend mt-4 mb-2"></div>
                                <canvas id="sales-chart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 grid-margin stretch-card sales-report-right">
                        <div className="card">
                            <div className="card-body">
                                <div className="profile-links">
                                    <p className="card-title">Profile Links</p>
                                    <div className="social-icons">
                                        <a href="#" className="icon facebook" title="Facebook"><i className="fa fa-facebook"
                                            aria-hidden="true"></i>
                                            Facebook</a>
                                        <a href="#" className="icon instagram" title="Instagram"><i className="fa fa-instagram"
                                            aria-hidden="true"></i>
                                            Instagram</a>
                                        <a href="#" className="icon linkedin" title="LinkedIn"><i className="fa fa-linkedin-square"
                                            aria-hidden="true"></i>
                                            LinkedIn</a>
                                        <a href="#" className="icon youtube" title="YouTube"><i className="fa fa-youtube-play"
                                            aria-hidden="true"></i>
                                            YouTube</a>
                                        {/* <a href="#" className="icon twitter" title="Twitter"><img src="assets/images/twitter.png"></i> Twitter</a> */}
                                    </div>
                                    <div className="website-link">
                                        <i className="fa fa-globe" aria-hidden="true"></i>
                                        <span>Website:</span>
                                        <a href="https://coachsparkle.com" target="_blank" className="text-info">coachsparkle.com</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


                <div className="row testimonials-section-add">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Testimonials</p>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Reviews</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-main-add">
                                        <tr className="testimonials-table-row">
                                            <td>Ethan Noah</td>
                                            <td className="perspiciatis-text">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                accusantium doloremque laudantium..."</td>
                                            <td><span className="badge published">Published</span></td>
                                            <td className="actions">
                                                <button className="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <button className="delete"><i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="testimonials-table-row">
                                            <td>Ethan Noah</td>
                                            <td className="perspiciatis-text">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                accusantium doloremque laudantium..."</td>
                                            <td><span className="badge published">Published</span></td>
                                            <td className="actions">
                                                <button className="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <button className="delete"><i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="testimonials-table-row">
                                            <td>Ethan Noah</td>
                                            <td className="perspiciatis-text">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                accusantium doloremque laudantium..."</td>
                                            <td><span className="badge unpublished">Unpublished</span></td>
                                            <td className="actions">
                                                <button className="edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <button className="delete"><i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>
                        </div>

                    </div>




                </div>

                <div className="row media-section-add">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Media</p>
                            <div className="media-card">
                                <div className="upload-section">
                                    <label for="profile-video">Upload Profile Video</label>
                                    {/* <input type="file" id="profile-video" name="profile-video"> */}
                                </div>

                                <div className="upload-section">
                                    <label for="photo-gallery">Upload Photo Gallery</label>
                                    {/* <input type="file" id="photo-gallery" name="photo-gallery"> */}
                                </div>
                            </div>
                        </div>

                    </div>




                </div>

                <div className="row articles-section-add">
                    <div className="card">
                        <div className="card-body">
                            <div className="articles-container">
                                <div className="table-responsive">
                                    <p className="card-title">Articles</p>
                                    <table className="articles-table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td className="article-name">
                                                    <img src="assets/images/articles-one.png" alt="Article" />
                                                </td>
                                                <td className="article-name">
                                                    <span>Article Name</span>
                                                </td>
                                                <td className="voluptatem">
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                                    laudantium, totam rem aperiam, eaque ipsa quae...
                                                </td>
                                                <td>
                                                    <span className="status published">Published</span>
                                                </td>
                                                <td className="edit-add-btn">
                                                    <button className="edit-btn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="delete-btn"><i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>


                                            <tr>
                                                <td className="article-name">
                                                    <img src="assets/images/articles-one.png" alt="Article" />
                                                </td>
                                                <td className="article-name">
                                                    <span>Article Name</span>
                                                </td>
                                                <td className="voluptatem">
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                                    laudantium, totam rem aperiam, eaque ipsa quae...
                                                </td>
                                                <td>
                                                    <span className="status published">Published</span>
                                                </td>
                                                <td className="edit-add-btn">
                                                    <button className="edit-btn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="delete-btn"><i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="article-name">
                                                    <img src="assets/images/articles-one.png" alt="Article" />
                                                </td>
                                                <td className="article-name">
                                                    <span>Article Name</span>
                                                </td>
                                                <td className="voluptatem">
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                                    laudantium, totam rem aperiam, eaque ipsa quae...
                                                </td>
                                                <td>
                                                    <span className="status pending">Pending</span>
                                                </td>
                                                <td className="edit-add-btn">
                                                    <button className="edit-btn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button className="delete-btn"><i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>




                <div className="row services-section-add">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Services</p>

                            <div className="add-service-container">
                                <label className="label" for="service">Add Services</label>
                                <div className="input-button-wrapper">
                                    <input type="text" id="service" placeholder="Cloud" className="service-input" />
                                    <button className="add-button">Add</button>
                                </div>
                            </div>


                            <div className="tags-container">
                                <span className="tag"><a href="#">Software</a></span>
                                <span className="tag"><a href="#">Research</a></span>
                                <span className="tag"><a href="#">Survey</a></span>
                                <span className="tag"><a href="#">UX Strategy</a></span>
                                <span className="tag"><a href="#">C#</a></span>
                                <span className="tag"><a href="#">C#.Net</a></span>
                                <span className="tag"><a href="#">Python</a></span>
                                <span className="tag"><a href="#">AWS</a></span>
                                <span className="tag"><a href="#">Frontend</a></span>
                                <span className="tag"><a href="#">React</a></span>
                                <span className="tag"><a href="#">NodeJS</a></span>
                                <span className="tag"><a href="#">Rust</a></span>
                                <span className="tag"><a href="#">Blockchain</a></span>
                                <span className="tag"><a href="#">DevOps</a></span>
                                <span className="tag"><a href="#">Interview</a></span>
                                <span className="tag"><a href="#">SQL</a></span>
                            </div>


                        </div>


                    </div>

                </div>






                <div className="row subscription-section-add">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Subscription</p>
                            <div className="plans-container">

                                <div className="plan free-plan">
                                    <div className="plan-header">
                                        <h3>Current Plan</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                        <h1>Free</h1>
                                    </div>
                                    <div className="feature-list">
                                        <ul>
                                            <li>Features</li>
                                            <li>Features</li>
                                            <li>Features</li>
                                            <li>Features</li>
                                            <li>Features</li>
                                        </ul>
                                    </div>
                                    <div className="buttons">
                                        <button className="cancel-btn">Cancel Subscription</button>
                                        <button className="download-btn">Download Invoice</button>
                                    </div>
                                </div>


                                <div className="plan premium-plan">
                                    <div className="plan-header">
                                        <h3>Premium</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                        <div className="price">
                                            <p>$</p> 29<small>/ Month</small>
                                        </div>
                                    </div>
                                    <div className="feature-list">
                                        <ul>
                                            <li>Features</li>
                                            <li>Features</li>
                                            <li>Features</li>
                                            <li>Features</li>
                                            <li>Features</li>
                                        </ul>
                                    </div>
                                    <button className="upgrade-btn">Upgrade To Premium</button>
                                </div>
                            </div>



                        </div>


                    </div>

                </div>



            </div>






        </div>

    </div>
}