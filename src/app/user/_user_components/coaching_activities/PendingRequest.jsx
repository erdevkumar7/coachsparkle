"use client";

import { getUserPendingCoachingClient } from "@/app/api/user-client";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default function PendingRequest({ initialRequest, token }) {
  // console.log('requestData',request)
  // const pendingRequest = request.data;
  const [pendingRequest, setPendingRequest] = useState(initialRequest.data);
  const [currentPage, setCurrentPage] = useState(initialRequest.pagination.current_page);
  const [lastPage, setLastPage] = useState(initialRequest.pagination.last_page);
  const [loading, setLoading] = useState(false);


  const fetchPageData = async (page) => {
    setLoading(true);
    const res = await getUserPendingCoachingClient(page, token);
    if (res?.data) {
      setPendingRequest(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
    setLoading(false);
  };



  return (
    <div className="coaching-status">
      <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
        <div>
          <h3>
            Pending Coaching ({initialRequest.request_count})
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

        {loading ? (
          // <div className="row gap-4">
          //       <p>Loading...</p> 

          // </div>
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="col-md-4 coaching-content p-3 m-2" key={i}>
                <div className="placeholder-glow p-2" >
                  <div className="placeholder col-8 mb-2" style={{ height: "30px" }}></div>
                  <div className="placeholder col-12 mb-5" style={{ height: "100px" }}></div>
                  <div className="placeholder col-6" style={{ height: "30px" }}></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="row gap-3 m-2">
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
                  <img src={item.profile_image} alt="Coach Image" className="coach-img" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
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
          </div>)}

        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={fetchPageData}
        />
      </div>
    </div>
  );
}
