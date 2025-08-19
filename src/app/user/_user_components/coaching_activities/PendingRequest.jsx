import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";

export default function PendingRequest({ request }) {
  const pendingRequest = request.data;
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // const pendingRequest = [
  //   {
  //     title: "Coaching Request sent",
  //     statusText: "Awaiting response",
  //     statusClass: "",
  //     image: "/coachsparkle/assets/images/professional-img.png",
  //     coachName: "Male / Female",
  //     description: "Life and Confidence Coach at <b>Comex Pte. Ltd</b>.",
  //     rating: "5.0",
  //     primaryAction: "View Request",
  //     secondaryAction: "Message",
  //   },
  //   {
  //     title: "Pending Free Trial",
  //     statusText: "Accepted",
  //     statusClass: "accepted",
  //     image: "/coachsparkle/assets/images/professional-img.png",
  //     coachName: "Jane Lee",
  //     description: "Life and Confidence Coach at <b>Comex Pte. Ltd</b>.",
  //     rating: "5.0",
  //     primaryAction: "Book Free Trial",
  //     secondaryAction: "Message",
  //   },
  //   {
  //     title: "Coach Matched",
  //     statusText: "AI Matched",
  //     statusClass: "ai-matched",
  //     image: "/coachsparkle/assets/images/professional-img.png",
  //     coachName: "Steven Tan",
  //     description: "Life and Confidence Coach at <b>Comex Pte. Ltd</b>.",
  //     rating: "5.0",
  //     primaryAction: "View Profile",
  //     secondaryAction: "Message",
  //   },
  //   {
  //     title: "coaching request received, Coach responded",
  //     statusText: "Matched",
  //     statusClass: "matched",
  //     image: "/coachsparkle/assets/images/professional-img.png",
  //     coachName: "Amy snicks",
  //     description: "Life and Confidence Coach at <b>Comex Pte. Ltd</b>.",
  //     rating: "5.0",
  //     primaryAction: "View Profile",
  //     secondaryAction: "Message",
  //   },
  // ];


  const ITEMS_PER_PAGE = 3;
  const paginatedRequests = pendingRequest.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setLastPage(Math.ceil(pendingRequest.length / ITEMS_PER_PAGE));
  }, [pendingRequest]);


  return (
    <div className="coaching-status">
      <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
        <div>
          <h3>
            Pending Coaching ({pendingRequest.length})
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
                  {/* {item.statusText} */}
                  Awaiting response
                </button>
              </div>

              <div className="respond-add">
                <img src={item.profile_image} alt="Coach Image" className="coach-img" style={{width:'50px', height: '50px', borderRadius: '50%'}} />
                <div>
                  <p className="favourite-text-tittle">{item.first_name} {item.last_name}</p>
                  <p className="life-add-text">
                    {item.coaching_category}
                    {item.company_name && <>at <b>{item.company_name}</b></>}

                  </p>
                  <div className="star-add-pointer">
                    <i className="bi bi-star-fill"></i>
                    <p>{item.rating}</p>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 view-request">
                <button className="btn btn-primary button-note">
                  {/* {item.primaryAction} */}
                  View Request
                </button>
                <button className="btn btn-outline-secondary button-msg">
                  {/* {item.secondaryAction} */}
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
