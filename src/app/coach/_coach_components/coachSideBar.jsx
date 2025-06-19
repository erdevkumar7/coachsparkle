import '../_styles/coach_sidebar.css';

export default function CoachSideBarComp() {

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="#"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="ui-basic">
                        <div>
                            <i className="bi bi-grid-3x3-gap-fill"></i>
                            <span className="menu-title">Overview</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <div>
                            <i className="fa fa-user"></i>
                            <span className="menu-title">Profile</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <div>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            <span className="menu-title">Home</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <div>
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                            <span className="menu-title">My Schedule</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <div>
                            <i className="fa fa-bell" aria-hidden="true"></i>
                            <span className="menu-title">Subscription</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <div>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            <span className="menu-title">Account Settings</span>
                        </div>
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <div>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span className="menu-title"> Sign Out</span>
                        </div>
                    </a>
                </li>
            </ul>
            <p className='test-dev'>test-dev</p>
        </nav>
    )
}