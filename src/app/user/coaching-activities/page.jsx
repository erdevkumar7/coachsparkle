"use client";
import "../_styles/dashboard.css";
import "../_styles/coaching_activities.css";

export default function Activities() {
  return (
    <div className="main-panel">
      <div className="content-wrapper favourite-user-warp">
        <div className="d-flex justify-content-between gap-4">
          <div className="status-bar d-flex align-items-center gap-1">
            <div>
              <img
                src="/coachsparkle/assets/images/glance-img-one.png"
                alt="coachsparkle"
              />
            </div>
            <div>
              <h4 className="coaching-tittle-text">Coaching Requests</h4>
              <span>
                <strong>04</strong>
              </span>
            </div>
          </div>
          <div className="status-bar d-flex align-items-center gap-1">
            <div>
              <img
                src="/coachsparkle/assets/images/glance-img-three.png"
                alt="coachsparkle"
              />
            </div>
            <div>
              <h4 className="coaching-tittle-text">In progress</h4>
              <span>
                <strong>03</strong>
              </span>
            </div>
          </div>
          <div className="status-bar d-flex align-items-center gap-1">
            <div>
              <img
                src="/coachsparkle/assets/images/match-three.png"
                alt="coachsparkle"
              />
            </div>
            <div>
              <h4 className="coaching-tittle-text">Completed</h4>
              <span>
                <strong>02</strong>
              </span>
            </div>
          </div>
          <div className="status-bar d-flex align-items-center gap-1">
            <div>
              <img
                src="/coachsparkle/assets/images/match-four.png"
                alt="coachsparkle"
              />
            </div>
            <div>
              <h4 className="coaching-tittle-text">Canceled / Missed</h4>
              <span>
                <strong>02</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="coaching-status">
          <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
            <div>
              <h3>Coaching Requests (04)</h3>
            </div>
            <div className="sorting-data d-flex align-items-center gap-2">
              <span>Sort By:</span>
              <select>
                <option>Most Recent</option>
              </select>
              <select>
                <option>12</option>
              </select>
              <a href="#">Bulk Edit</a>
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap py-4 px-4">
            <div className="row gap-4">
              <div className="col-md-4 coaching-content p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">Coaching request received</h4>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-x0hvl5-MuiSvgIcon-root"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="MoreHorizOutlinedIcon"
                  >
                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
                  </svg>
                </div>
                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill">
                    New Coaching Request
                  </button>
                </div>
                <div className="respond-add">
                  <img
                    src="/coachsparkle/assets/images/professional-img.png"
                    alt="Coach Image"
                    className="coach-img"
                  />
                  <div>
                    <p className="favourite-text-tittle">Gary Sims</p>
                    <p className="life-add-text">
                      Life and Confidence Coach at&nbsp;<b>Comex Pte. Ltd</b>.
                    </p>
                    <div className="star-add-pointer">
                      <i className="bi bi-star-fill"></i>
                      <p>5.0</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 view-request">
                  <button className="btn btn-primary button-note">
                    View request
                  </button>
                  <button className="btn btn-outline-secondary button-msg">
                    Message
                  </button>
                </div>
              </div>

              <div className="col-md-4 coaching-content p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">Pending Free Trial</h4>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-x0hvl5-MuiSvgIcon-root"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="MoreHorizOutlinedIcon"
                  >
                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
                  </svg>
                </div>
                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill accepted">
                    Accepted
                  </button>
                </div>
                <div className="respond-add">
                  <img
                    src="/coachsparkle/assets/images/professional-img.png"
                    alt="Coach Image"
                    className="coach-img"
                  />
                  <div>
                    <p className="favourite-text-tittle">Jane Lee</p>
                    <p className="life-add-text">
                      Life and Confidence Coach at&nbsp;<b>Comex Pte. Ltd</b>.
                    </p>
                    <div className="star-add-pointer">
                      <i className="bi bi-star-fill"></i>
                      <p>5.0</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 view-request">
                  <button className="btn btn-primary button-note">
                    Book Free Trial
                  </button>
                  <button className="btn btn-outline-secondary button-msg">
                    Message
                  </button>
                </div>
              </div>

              <div className="col-md-4 coaching-content p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">Coach Matched</h4>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-x0hvl5-MuiSvgIcon-root"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="MoreHorizOutlinedIcon"
                  >
                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
                  </svg>
                </div>
                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill ai-matched">
                    AI Matched
                  </button>
                </div>
                <div className="respond-add">
                  <img
                    src="/coachsparkle/assets/images/professional-img.png"
                    alt="Coach Image"
                    className="coach-img"
                  />
                  <div>
                    <p className="favourite-text-tittle">Steven Tan</p>
                    <p className="life-add-text">
                      Life and Confidence Coach at&nbsp;<b>Comex Pte. Ltd</b>.
                    </p>
                    <div className="star-add-pointer">
                      <i className="bi bi-star-fill"></i>
                      <p>5.0</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 view-request">
                  <button className="btn btn-primary button-note">
                    View Profile
                  </button>
                  <button className="btn btn-outline-secondary button-msg">
                    Message
                  </button>
                </div>
              </div>

              <div className="col-md-4 coaching-content p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">
                    coaching request received, Coach responded
                  </h4>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-x0hvl5-MuiSvgIcon-root"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="MoreHorizOutlinedIcon"
                  >
                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
                  </svg>
                </div>
                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill matched">
                    Matched
                  </button>
                </div>
                <div className="respond-add">
                  <img
                    src="/coachsparkle/assets/images/professional-img.png"
                    alt="Coach Image"
                    className="coach-img"
                  />
                  <div>
                    <p className="favourite-text-tittle">Amy snicks</p>
                    <p className="life-add-text">
                      Life and Confidence Coach at&nbsp;<b>Comex Pte. Ltd</b>.
                    </p>
                    <div className="star-add-pointer">
                      <i className="bi bi-star-fill"></i>
                      <p>5.0</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 view-request">
                  <button className="btn btn-primary button-note">
                    View Profile
                  </button>
                  <button className="btn btn-outline-secondary button-msg">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="coaching-progress-status">
            <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
              <div>
                <h3>Coaching In Progress (02)</h3>
              </div>
              <div className="sorting-data d-flex align-items-center gap-2">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ExpandMoreOutlinedIcon"
                >
                  <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4">
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Session Booked</h4>
                    <span className="session">1 Session left</span>
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      Confirmed
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Breakthrough Package With User Display Name
                      </span>
                      <span className="d-block time">
                        Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)
                      </span>
                      <img
                        src="/coachsparkle/images/zoom.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note">
                      View Session
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Session Rescheduled</h4>
                    <span className="session">1 Session left</span>
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      In Progress
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Custom Package With User Display Name
                      </span>
                      <span className="d-block time">
                        Tuesday, July 9, 3:00 PM - 4:00 PM (GMT+8)
                      </span>
                      <img
                        src="/coachsparkle/images/teams.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note">
                      View Session
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Session In Progress</h4>
                    <span className="session">2 Sessions left</span>
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      In Progress
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Confidence Jump Start Package With User Display Name
                      </span>
                      <span className="d-block time">
                        Thursday, July 11, 10:00 AM - 11:00 AM (GMT+8)
                      </span>
                      <img
                        src="/coachsparkle/images/people.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note">
                      Manage Session
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 meditation-package">
          <div className="coaching-progress-status">
            <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
              <div>
                <h3>Completed Coaching (02)</h3>
              </div>
              <div className="sorting-data d-flex align-items-center gap-2">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ExpandMoreOutlinedIcon"
                >
                  <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4">
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Pending review</h4>
                    {/* <span className="session">1 Session left</span> */}
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      Completed
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Meditation Package With Jenny Sim
                      </span>
                      <span className="d-block time">
                        Completed Friday, July 9
                      </span>
                      <img
                        src="/coachsparkle/images/zoom.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note">
                      Leave a Review
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Pending review</h4>
                    {/* <span className="session">1 Session left</span> */}
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      Completed
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Cross-fit Package With Bruce Toh
                      </span>
                      <span className="d-block time">
                        Completed Friday, July 9
                      </span>
                      <img
                        src="/coachsparkle/images/zoom.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note">
                      Leave a Review
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Pending review</h4>
                    {/* <span className="session">1 Session left</span> */}
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      Completed
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Meditation Package With Jenny Sim
                      </span>
                      <span className="d-block time">
                        Completed Friday, July 9
                      </span>
                      <img
                        src="/coachsparkle/images/zoom.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note">
                      Leave a Review
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 canceled-missed">
          <div className="coaching-progress-status">
            <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
              <div>
                <h3>Coaching In Progress (02)</h3>
              </div>
              <div className="sorting-data d-flex align-items-center gap-2">
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ExpandMoreOutlinedIcon"
                >
                  <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4">
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Session canceled</h4>
                    <span className="session">1 Session left</span>
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      Canceled
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Breakthrough Package With Adam Bell
                      </span>
                      <span className="d-block time">
                        Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)
                      </span>
                      <img
                        src="/coachsparkle/images/zoom.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary button-note">
                      Reschedule Session
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Session Rescheduled</h4>
                    <span className="session">1 Session left</span>
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      Missed
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Custom Package With User Display Name
                      </span>
                      <span className="d-block time">
                        Tuesday, July 9, 3:00 PM - 4:00 PM (GMT+8)
                      </span>
                      <img
                        src="/coachsparkle/images/teams.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary button-note">
                      View Session
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
                  </div>
                </div>
                <div className="col-md-4 coaching-progress p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Session In Progress</h4>
                    <span className="session">2 Sessions left</span>
                  </div>
                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill">
                      In Progress
                    </button>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3 content">
                    <div>
                      <img
                        src="/coachsparkle/assets/images/coaching-img.png"
                        alt="coachsparkle"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">
                        Confidence Jump Start Package With User Display Name
                      </span>
                      <span className="d-block time">
                        Thursday, July 11, 10:00 AM - 11:00 AM (GMT+8)
                      </span>
                      <img
                        src="/coachsparkle/images/people.png"
                        alt="coachsparkle"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary button-note">
                      Manage Session
                    </button>
                    <button className="btn btn-outline-secondary button-msg">
                      Message
                    </button>
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
