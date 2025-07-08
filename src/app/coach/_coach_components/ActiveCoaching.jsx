import React, { useState } from "react";

export default function ActiveCoaching() {
  const [isProUser, setIsProUser] = useState(false);

  const allRequests = [
    {
      name: "User Display Name",
      image: "/coachsparkle/assets/images/coaching-img.png",
      location: "Location, City",
      match: "High Match",
      goal: "Improve Public Speaking",
    },
    {
      name: "User Display Name",
      image: "/coachsparkle/assets/images/coaching-img.png",
      location: "Location, City",
      match: "High Match",
      goal: "Build Confidence",
    },
    {
      name: "User Display Name",
      image: "/coachsparkle/assets/images/coaching-img.png",
      location: "Location, City",
      match: "High Match",
      goal: "Career Change",
    },
  ];

  const visibleRequests = isProUser ? allRequests : allRequests.slice(0, 3);

  return (
    <>
    <div>
      <h3 className="text-lg font-semibold">
        Active Coaching Requests and AI Matches{" "}
        <strong>{allRequests.length.toString().padStart(2, "0")}</strong>
      </h3>
       {!isProUser && (
         <span>Your current plan limits you to 5 requests and matches per month.</span>
       )}

    </div><hr/>

      {!isProUser && (
        <div className="upgrade-warning">
          <p>
            You've reached your free plan limit of 3 coaching requests.
            <br />
            Upgrade to pro coach plan to unlock unlimited coaching matches and
            real-time alerts.
          </p>
          <button className="upgrade-btn">Upgrade To Pro</button>
        </div>
      )}

      <div className="coaching-card">
        <table>
          <thead>
            <tr>
              <th style={{ paddingLeft: "20px" }}>User Name</th>
              <th>% Match</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            {visibleRequests.map((request, index) => (
              <tr key={index} className="coaching-all-match">
                <td className="user-info">
                  <img src={request.image} alt="Coach Photo" />
                  <div className="tracy-text">
                    <div className="name">{request.name}</div>
                    <div className="sub-info">{request.location}</div>
                  </div>
                </td>
                <td className="match">{request.match}</td>
                <td className="goal">{request.goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="details-add-btn">
        {!isProUser && (
          <>
            <p className="locked-info-text">
              Don’t leave potential clients waiting. Upgrade to Pro Coach Plan
              for unlimited matches, priority AI insights, and more tools to
              grow your coaching business!
            </p>
            <button className="view-btn">
              Unlock Full Access <i className="bi bi-arrow-right"></i>
            </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </>
        )}
        <button className="view-btn">
          View Requests <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </>
  );
}
