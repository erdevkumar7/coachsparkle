// components/CanceledMissedSection.jsx
import React from "react";

export default function CanceledMissed({ title, count, canceledMissed }) {
  return (
    <div className="mt-5 canceled-missed">
      <div className="coaching-progress-status">
        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
          <div>
            <h3>
              {title} ({count < 10 ? `0${count}` : count})
            </h3>
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
            {canceledMissed.map((session, index) => (
              <div key={index} className="col-md-4 coaching-progress p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">{session.sessionTitle}</h4>
                  <span className="session">{session.sessionCount}</span>
                </div>

                <div className="mb-3 status-div">
                  <button className="border px-3 py-1 rounded-pill">
                    {session.status}
                  </button>
                </div>

                <div className="d-flex align-items-start gap-2 mb-3 content">
                  <div>
                    <img
                      src={session.userImage}
                      alt="coachsparkle"
                      className="rounded-circle"
                    />
                  </div>
                  <div>
                    <span className="fw-semibold d-block name">
                      {session.packageTitle}
                    </span>
                    <span className="d-block time">{session.time}</span>
                    {session.platformIcon && (
                      <img src={session.platformIcon} alt="platform" />
                    )}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary button-note">
                    {session.primaryAction}
                  </button>
                  <button className="btn btn-outline-secondary button-msg">
                    {session.secondaryAction}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
