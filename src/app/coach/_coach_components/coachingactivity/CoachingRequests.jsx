'use client';
import { FRONTEND_BASE_URL } from "@/utiles/config";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Link from "next/link";
import { useState } from "react";

export default function CoachingRequests({ pendingRequest }) {
  const [showModal, setShowModal] = useState(false);
  const getRequests = pendingRequest.data
  // console.log('request', getRequests)

  const handleViewRequest = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <div className="mt-5">
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
              <Link href="#">Bulk Edit</Link>
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap py-4 px-4">
            <div className="row gap-4">
              {getRequests.map((rqst, indx) => (
                <div key={indx} className="col-md-4 coaching-content p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-0">Coaching request received</h4>
                    <MoreHorizOutlinedIcon sx={{ color: '#A9A9A9' }} />
                  </div>

                  <div className="mb-3 status-div">
                    <button className="border px-3 py-1 rounded-pill" style={{
                      backgroundColor: "#FFA500",
                      color: "#FFFFFF",
                      borderColor: "#FFA500",
                    }}>
                      New Coaching Request
                    </button>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div>
                      <img
                        src={rqst?.profile_image ||
                          `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                        }
                        alt="coachsparkle" className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                    </div>
                    <div>
                      <span className="fw-semibold d-block name">{rqst.first_name} {rqst.last_name}</span>
                      <span className="d-block location">{rqst.country}</span>
                      <span className="d-block time">Received 2 hours ago</span>
                      <p className="mt-2 mb-0 note">Looking for help with career advice</p>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <button className="btn btn-primary button-note" onClick={handleViewRequest}>View request</button>
                    <button className="btn btn-outline-secondary button-msg">Message</button>
                  </div>
                </div>))}
            </div>
          </div>
        </div>
      </div>


      {showModal && (
        <div className="request-modal-overlay">
          <div className="request-modal">
            <div className="request-modal-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Coaching Request Details</h5>
              <button className="request-close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="request-modal-main-body">
              <div className="request-modal-body">
                <h6>1. Coaching Details</h6>
                <p>
                  <strong>Type of Coaching:</strong> Wellness & Health Coaches
                </p>
                <p>
                  <strong>Sub Coaching Category:</strong> Fitness Coach
                </p>
                <p>
                  <strong>Preferred Mode of Delivery:</strong> Online
                </p>
                <p>
                  <strong>Location:</strong> Singapore
                </p>
                <p>
                  <strong>Goal or Objective of Coaching/Learning:</strong> Improve
                  confidence, Career advancement, Academic improvement
                </p>
              </div>
              <div className="request-modal-body">
                <h6>2. Communication Preferences</h6>
                <p>
                  <strong>Language Preference:</strong> English, German
                </p>
                <p>
                  <strong>Preferred Communication Channel:</strong> Video Call
                </p>
              </div>
              <div className="request-modal-body">
                <h6>3. Additional Fields</h6>
                <p>
                  <strong>Target Age Group or Demographic:</strong> Adults
                </p>
                <p>
                  <strong>Preferred Coaching/Teaching Style:</strong> Free-Flow
                </p>
                <p>
                  <strong>Budget Range:</strong> (Not specified)
                </p>
                <p>
                  <strong>Preferred Schedule:</strong> (Not specified)
                </p>
                <p>
                  <strong>Gender Preference of Coach:</strong> Female
                </p>
                <p>
                  <strong>Coach Experience Level:</strong> Highly Experienced
                </p>
                <p>
                  <strong>Only Certified Coach:</strong> Yes
                </p>
                <p>
                  <strong>Urgency or Preferred Start Date:</strong> Flexible
                </p>
                <p>
                  <strong>Special Requirements (If Any):</strong> Optional
                </p>
              </div>
              <div className="request-modal-body">
                <h6>4. Contact Information</h6>
                <p>
                  <strong>Preferred Contact Mode:</strong> Email / Phone
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
