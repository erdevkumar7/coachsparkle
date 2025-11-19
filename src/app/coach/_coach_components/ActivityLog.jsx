"use client";
import EastIcon from '@mui/icons-material/East';
import { useEffect, useState } from 'react';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recentCoachActivitylog`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    })
      .then((res) => res.json())
    .then((data) => {
      if (data.success && data.activities) {
        setLogs(data.activities);
      }
    })
    .catch(err => console.log("API error:", err));
}, []);

  const latestThree = logs.slice(0, 3);
  return (
    <>
    <div>
      <h3 className="text-lg font-semibold quick-text">Activity Log</h3>
    </div>
    <div>
        {latestThree.length === 0 && <p>No recent activity.</p>}

        {latestThree.map((log, index) => (
          <p key={index}>
            - {log.message} ({log.time_ago})
          </p>
        ))}
      </div>
               <div className="log-btn">
        <button className="activity-log-btn" onClick={() => setShowPopup(true)}>
          View All
          <EastIcon className="mui-icons" />
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="text-lg font-semibold">All Activities</h3>

            <div className="mt-3">
              {logs.map((log, index) => (
                <p key={index}>
                  - {log.message} ({log.time_ago})
                </p>
              ))}
            </div>

            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
