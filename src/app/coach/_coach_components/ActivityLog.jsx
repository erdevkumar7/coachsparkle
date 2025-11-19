"use client";

import { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [show, setShow] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recentCoachActivitylog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.activities) {
          setLogs(data.activities);
        }
      })
      .catch((err) => console.log("API error:", err));
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
        <button className="activity-log-btn" onClick={() => setShow(true)}>
          View All <EastIcon className="mui-icons" />
        </button>
      </div>

      {show && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">All Activity Logs</h5>
                <button
                  className="btn-close"
                  onClick={() => setShow(false)}
                ></button>
              </div>

              <div className="modal-body">
                {logs.length === 0 && <p>No activity logs available.</p>}

                {logs.map((log, index) => (
                  <p key={index}>
                    - {log.message} ({log.time_ago})
                  </p>
                ))}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
