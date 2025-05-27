"use client";

export default function MainContent({user}) {

  return (
    <div className="container-fluid page-body-wrapper">
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
      </nav>

      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h3 className="font-weight-bold quick-text-add">
                    Hi {user?.first_name}, <br/>
Ready to level up?
                  </h3>
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
                      <i className="bi bi-card-list"></i>
                      <div>
                        <p className="view-text">Find a Coach</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 stretch-card transparent">
                  <div className="card card-tale-custom shadow-sm rounded-4 p-3 border-0 two">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt"></i>
                      <div>
                        <p className="view-text">View Matches</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 stretch-card transparent">
                  <div className="card card-tale-custom shadow-sm rounded-4 p-3 border-0 three">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calendar-check"></i>
                      <div>
                        <p className="view-text">Schedule Session</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>





        </div>






      </div>
    </div>
  );
}
