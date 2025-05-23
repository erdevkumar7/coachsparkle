export default function UserHeader() {
    <>
        <div className="row p-0 m-0 proBanner" id="proBanner">
            <div className="col-md-12 p-0 m-0">
                <div className="card-body card-body-padding px-3 d-flex align-items-center justify-content-between">
                    <div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0 font-weight-medium me-3 buy-now-text">Free 24/7 customer support, updates, and more with
                                this template!</p>
                            <a href="https://www.bootstrapdash.com/product/skydash-admin-template" target="_blank"
                                className="btn me-2 buy-now-btn border-0">Buy Now</a>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <a href="https://www.bootstrapdash.com/product/skydash-admin-template/"><i
                            className="ti-home me-3 text-white"></i></a>
                        <button id="bannerClose" className="btn border-0 p-0">
                            <i className="ti-close text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                <a className="navbar-brand brand-logo me-5" href="index.html"><img src="assets/images/logo.png" className="me-2"
                    alt="logo" /></a>
                <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/favicon.png" alt="logo" /></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span className="icon-menu"></span>
                </button>
                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#"
                            data-bs-toggle="dropdown">
                            <i className="icon-bell mx-0"></i>
                            <span className="count"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                            aria-labelledby="notificationDropdown">
                            <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-success">
                                        <i className="ti-info-alt mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-normal">Application Error</h6>
                                    <p className="font-weight-light small-text mb-0 text-muted"> Just now </p>
                                </div>
                            </a>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-warning">
                                        <i className="ti-settings mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-normal">Settings</h6>
                                    <p className="font-weight-light small-text mb-0 text-muted"> Private message </p>
                                </div>
                            </a>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-info">
                                        <i className="ti-user mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-normal">New user registration</h6>
                                    <p className="font-weight-light small-text mb-0 text-muted"> 2 days ago </p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                            <img src="assets/images/faces/face-img.png" alt="profile" />
                            <p className="top-name-add">James</p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <a className="dropdown-item">
                                <i className="ti-settings text-primary"></i> Settings </a>
                            <a className="dropdown-item">
                                <i className="ti-power-off text-primary"></i> Logout </a>
                        </div>
                    </li>

                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                    data-toggle="offcanvas">
                    <span className="icon-menu"></span>
                </button>
            </div>
        </nav>
    </>
}