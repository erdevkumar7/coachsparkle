import Pagination from "@/components/Pagination";
import React from "react";

export default function PendingRequest({
  title,
  count,
  pendingRequest,
  currentPage,
  lastPage,
  onPageChange,
}) {
  return (
    <div className="coaching-status">
      <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
        <div>
          <h3>
            {title} ({count})
          </h3>
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
          {pendingRequest.map((item, index) => (
            <div className="col-md-4 coaching-content p-3" key={index}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="mb-0">{item.title}</h4>
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
                <button
                  className={`border px-3 py-1 rounded-pill ${item.statusClass}`}
                >
                  {item.statusText}
                </button>
              </div>

              <div className="respond-add">
                <img src={item.image} alt="Coach Image" className="coach-img" />
                <div>
                  <p className="favourite-text-tittle">{item.coachName}</p>
                  <p className="life-add-text">{item.description}</p>
                  <div className="star-add-pointer">
                    <i className="bi bi-star-fill"></i>
                    <p>{item.rating}</p>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 view-request">
                <button className="btn btn-primary button-note">
                  {item.primaryAction}
                </button>
                <button className="btn btn-outline-secondary button-msg">
                  {item.secondaryAction}
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
