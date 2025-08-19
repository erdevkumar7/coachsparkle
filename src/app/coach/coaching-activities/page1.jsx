"use client";
import CoachingRequests from "../_coach_components/coachingactivity/CoachingRequests";
import CoachingProgress from "../_coach_components/coachingactivity/CoachingProgress";
import CompletedCoaching from "../_coach_components/coachingactivity/CompletedCoaching";
import StatusBar from "../_coach_components/coachingactivity/StatusBar";
import "../_styles/coach_coaching_activities.css";
import Link from "next/link";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CanceledMissed from "../_coach_components/coachingactivity/CanceledMissed";
import { useState } from "react";

export default function CoachingActivities() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestClick = (request) => {
    if (request.buttonNote === "View request") {
      setSelectedRequest(request);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const requests = [
    {
      img: "/coachsparkle/assets/images/glance-img-one.png",
      title: "Coaching Requests",
      count: "04",
    },
    {
      img: "/coachsparkle/assets/images/glance-img-three.png",
      title: "In progress",
      count: "03",
    },
    {
      img: "/coachsparkle/assets/images/match-three.png",
      title: "Completed",
      count: "02",
    },
    {
      img: "/coachsparkle/assets/images/match-four.png",
      title: "Canceled / Missed",
      count: "02",
    },
  ];

  const coachingRequests = [
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Coaching request received",
      status: "New Coaching Request",
      name: "Enver Tan",
      location: "Singapore, Singapore",
      time: "Received 2 hours ago",
      note: "Looking for help with career advice",
      buttonNote: "View request",
    },
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "User accepted free trial",
      status: "Accepted",
      name: "User display Name",
      location: "Location, City",
      time: "Accepted 4 hours ago",
      note: `Looking for help with public speaking for a job
interview.`,
      buttonNote: "Schedule Trial",
    },
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Coaching Request Matched",
      status: "AI Matched",
      name: "User display Name",
      location: "Location, City",
      time: "Matched on 15 Jul",
      note: `Looking for help with public speaking for a job
interview.`,
      buttonNote: "View Goals",
    },
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Inquiry received",
      status: "New Inquiry",
      name: "User display Name",
      location: "Location, City",
      time: "Received on 16 Jul",
      note: `Looking for help with public speaking for a job
interview...`,
      buttonNote: "View Inquiry",
    },
  ];

  const inprogress = [
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Session Booked",
      sessions: "1 Session left",
      status: "Active",
      name: "Breakthrough Package With User Display Name",
      time: "Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)",
      app: "/coachsparkle/images/zoom.png",
      buttonNote: "View Session",
    },
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Session Rescheduled",
      sessions: "1 Session left",
      status: "In Progress",
      name: "Custom Package With User Display Name",
      time: "Tuesday, July 9, 3:00 PM - 4:00 PM (GMT+8)",
      app: "/coachsparkle/images/teams.png",
      buttonNote: "View Session",
    },
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Session In Progress",
      sessions: "2 Sessions left",
      status: "In Progress",
      name: "Confidence Jump Start PackageWith User Display Name",
      time: "Thursday, July 11, 10:00 AM - 11:00 AM (GMT+8)",
      app: "/coachsparkle/images/people.png",
      buttonNote: "Manage Session",
    },
  ];

  const completed = [
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Pending Review",
      status: "Completed",
      name: "Meditation PackageWith User Display Name",
      time: "Completed Friday, July 9",
      buttonNote: "Request Review",
    },
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Review completed",
      status: "Completed",
      name: "Meditation PackageWith User Display Name",
      time: "Completed Saturday, July 10",
      buttonNote: "View Review",
    },
  ];

  const canceled = [
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Session Canceled",
      sessions: "1 Session left",
      status: "Canceled",
      name: "Breakthrough Package With User Display Name",
      time: "Monday, July 7, 1:00 PM - 2:00 PM (GMT+8)",
      app: "/coachsparkle/images/zoom.png",
      buttonNote: "Reschedule Session",
    },
    {
      image: "/coachsparkle/assets/images/coaching-img.png",
      heading: "Session Missed",
      sessions: "1 Session left",
      status: "Missed",
      name: "Breakthrough Package With User Display Name",
      time: "Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)",
      app: "/coachsparkle/images/zoom.png",
      buttonNote: "Manage Session",
    },
  ];

  return (
    <div className="main-panel">
      <div className="new-content-wrapper coach-wrap">
        <div className=" d-flex justify-content-between gap-4">
          {requests.map((request, index) => (
            <StatusBar
              key={index}
              img={request.img}
              title={request.title}
              count={request.count}
            />
          ))}
        </div>
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
                {coachingRequests.map((coachingRequest, index) => (
                  <CoachingRequests
                    key={index}
                    image={coachingRequest.image}
                    heading={coachingRequest.heading}
                    status={coachingRequest.status}
                    name={coachingRequest.name}
                    location={coachingRequest.location}
                    time={coachingRequest.time}
                    note={coachingRequest.note}
                    buttonNote={coachingRequest.buttonNote}
                    onClick={() => handleRequestClick(coachingRequest)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="coaching-progress-status">
            <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
              <div>
                <h3>Coaching In Progress (03)</h3>
              </div>
              <div className="sorting-data d-flex align-items-center gap-2">
                <ExpandMoreOutlinedIcon />
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4">
                {inprogress.map((progress, index) => (
                  <CoachingProgress
                    key={index}
                    image={progress.image}
                    heading={progress.heading}
                    sessions={progress.sessions}
                    status={progress.status}
                    name={progress.name}
                    time={progress.time}
                    app={progress.app}
                    buttonNote={progress.buttonNote}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="completed-status">
            <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
              <div>
                <h3>Completed Coaching (02)</h3>
              </div>
              <div className="sorting-data d-flex align-items-center gap-2">
                <ExpandMoreOutlinedIcon />
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4">
                {completed.map((complete, index) => (
                  <CompletedCoaching
                    key={index}
                    image={complete.image}
                    heading={complete.heading}
                    status={complete.status}
                    name={complete.name}
                    time={complete.time}
                    buttonNote={complete.buttonNote}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="coaching-progress-status">
            <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
              <div>
                <h3>Canceled / Missed (02)</h3>
              </div>
              <div className="sorting-data d-flex align-items-center gap-2">
                <ExpandMoreOutlinedIcon />
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap py-4 px-4">
              <div className="row gap-4">
                {canceled.map((cancel, index) => (
                  <CanceledMissed
                    key={index}
                    image={cancel.image}
                    heading={cancel.heading}
                    sessions={cancel.sessions}
                    status={cancel.status}
                    name={cancel.name}
                    time={cancel.time}
                    app={cancel.app}
                    buttonNote={cancel.buttonNote}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && selectedRequest && (
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
    </div>
  );
}
