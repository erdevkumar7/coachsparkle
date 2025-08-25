"use client";
import { useUser } from "@/context/UserContext";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EastIcon from '@mui/icons-material/East';

export default function ActiveCoaching({ initialRequest, token }) {  
  const [allRequests, setAllRequests] = useState(initialRequest.data);
  const router = useRouter()
  const { user } = useUser();
  let isProUser = user.subscription_plan.plan_name == 'Pro' ? true : false;

  const visibleRequests = isProUser ? allRequests : allRequests.slice(0, 3);


  // console.log('initialRequest', initialRequest)


  return (
    <>
      <div>
        <h3 className="text-lg font-semibold">
          Active Coaching Requests and AI Matches{" "}
          <strong>{initialRequest.request_count < 10 ? `0${initialRequest.request_count}` : initialRequest.request_count}</strong>
        </h3>
        {!isProUser && (
          <span>Your current plan limits you to 5 requests and matches per month.</span>
        )}

      </div><hr />

      {!isProUser && (
        <div className="upgrade-warning" style={{
          backgroundColor: "#FEF8D3",
          border: "1px solid #F5E26B",
        }}>
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
                  <img
                    src={request?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                    alt="UserImg"
                    style={{ width: "50px", height: "50px", borderRadius: "50px" }} />
                  <div className="tracy-text">
                    <div className="name">{request.first_name} {request.last_name}</div>
                    <div className="sub-info">Location: {request.country}</div>
                  </div>
                </td>
                <td className="match">High Match</td>
                <td className="goal">{request.coaching_request_goal?.length > 25 ?
                  request.coaching_request_goal?.slice(0, 25) + "..." : request.coaching_request_goal}</td>
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
        <button className="view-btn" onClick={() => router.push('/coach/coaching-activities')}>
          View Requests
          <EastIcon className="mui-icons"/>
           {/* <i className="bi bi-arrow-right"></i> */}
        </button>
      </div>
    </>
  );
}
