import '../_styles/coach_sidebar.css';

export default function CoachSideBarComp() {

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">


        <div className="side-bar-left-top">
            <div className="flex items-center mt-4 side-top-bar">
                <img alt="profile" src="/coachsparkle/assets/images/faces/face-img.png" />
                <div>
                    <h5 className="font-medium">
                    James Vince <span className="text-green-500 text-sm"><i className="bi bi-check-circle-fill"></i></span>
                    </h5>
                    <p className="text-sm text-gray-500">Coach</p>
                </div>
            </div>
        </div>


    <ul className="nav">
        <li className="nav-item" onClick={() => router.push('/user/dashboard')}>
            <a className="nav-link" href="#" data-bs-toggle="collapse" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-grid-3x3-gap-fill"></i>
                    <span className="menu-title">Dashboard</span>
                </div>
            </a>
        </li>


        <li className="nav-item profile-tab" onClick={() => router.push('/user/profile')}>
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-person"></i>
                    <span className="menu-title">Profile</span>
                </div>
            </a>
        </li>


        <li className="nav-item" onClick={() => router.push('/user/profile')}>
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                <i className="bi bi-box-seam"></i>
                    <span className="menu-title">Service Packages</span>
                </div>
            </a>
        </li>

        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-duffle"></i>
                    <span className="menu-title">Coaching Activities</span>
                </div>
            </a>
        </li>

        
        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-calendar2-week"></i>
                    <span className="menu-title">Booking</span>
                </div>
            </a>
        </li>

        <li className="nav-item" onClick={() => router.push('/user/user-message')}>
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-chat-dots"></i>
                    <span className="menu-title message-text">
                    Message + Coaching <br /> Requests 
                            </span>

                </div>
            </a>
        </li>



        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-star"></i>
                    <span className="menu-title">Reviews</span>
                </div>
            </a>
        </li>









        <li className="nav-item account-settings-tab" onClick={() => router.push('/user/account-setting')}>
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-gear"></i>
                    <span className="menu-title">Account Settings</span>
                </div>
            </a>
        </li>

        <li className="nav-item" onClick={() => router.push('/user/account-setting')}>
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                <i className="bi bi-heart"></i>
                    <span className="menu-title">Subscription Plan</span>
                </div>
            </a>
        </li>



        <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="bi bi-headset"></i>
                    <span className="menu-title">FAQs and Support</span>
                </div>
            </a>
        </li>


        <li className="nav-item sign-out">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <div>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="menu-title">Sign Out</span>
                </div>
            </a>
        </li>

    </ul>
</nav>
    )
}