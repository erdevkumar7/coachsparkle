"use client";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

import React, { useState } from "react";

export default function QuickSnapshot() {
  const [isProUser, setIsProUser] = useState(false);

  const LockedCard = ({ title, image}) => (
    <div className="card locked-card">
      <div className="glance-box locked">
        <img src={image} className="glance-img" />
        <div className="new-add-coming">
          <p className="title">
            {title}<i className="bi bi-lock-fill text-warning ms-1"></i>
          </p>
          <p className="count">**</p>
        </div>
        <div className="tooltip-box">
          <InfoOutlineIcon/>
          Upgrade To Pro Coach Plan To Unlock This Metric
        </div>
      </div>
    </div>
  );

  return (
    <>
      <h3 className="text-lg font-semibold mb-4 quick-text">Quick Snapshot</h3>
      <div className="grid">
        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-one.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">New Coaching Request</p>
              <p className="count">03</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-two.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Confirmed Booking</p>
              <p className="count">02</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-three.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Upcoming Sessions (05)</p>
              <span>Aug 15, 8:00PM</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-six.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Unread messages</p>
              <span>06</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-five.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Total Earnings</p>
              <span>$3,560</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="glance-box">
            <img
              src="/coachsparkle/assets/images/snapshot-img-eight.png"
              className="glance-img"
            />
            <div className="new-add-coming">
              <p className="title">Average Rating</p>
              <p className="count">4.0</p>
            </div>
          </div>
        </div>

        {isProUser ? (
          <>
            <div className="card">
              <div className="glance-box">
                <img
                  src="/coachsparkle/assets/images/snapshot-img-four.png"
                  className="glance-img"
                />
                <div className="new-add-coming">
                  <p className="title">Service Performance</p>
                  <span>54.6% Avg</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="glance-box">
                <img
                  src="/coachsparkle/assets/images/snapshot-img-seven.png"
                  className="glance-img"
                />
                <div className="new-add-coming">
                  <p className="title">Profile Views</p>
                  <p className="count">15</p>
                  <span className="this-month-text">
                    this month Increased by 20%
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="glance-box">
                <img
                  src="/coachsparkle/assets/images/snapshot-img-nine.png"
                  className="glance-img"
                />
                <div className="new-add-coming">
                  <p className="title">No. of Favorite</p>
                  <p className="count">10</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <LockedCard
              title="Service Performance"
              image={"/coachsparkle/assets/images/snapshot-img-four.png"}
            />
            <LockedCard
              title="Profile Views"
              image={"/coachsparkle/assets/images/snapshot-img-seven.png"}
            />
            <LockedCard
              title="No. of Favorite"
              image={"/coachsparkle/assets/images/snapshot-img-nine.png"}
              buttonText={"Upgrade To Pro Coach Plan To Unlock This Metric"}
            />
          </>
        )}
      </div>

      {!isProUser && (
        <div className="cta">
          <button>
            Upgrade to Pro Coach Plan <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      )}
    </>
  );
}
