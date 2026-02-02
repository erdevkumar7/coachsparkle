"use client";

import { useState, useEffect } from "react";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Link from "next/link";

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coaches/ai-recommendations`);

        const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/coaches/ai-recommendations`;
        // console.log('Fetching AI recommendations from:', fetchUrl); // Log the full URL

        // const token = localStorage.getItem("token"); // adjust key if needed

        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const token = getCookie("token");

        // console.log('the real for user id - curent token is:', token); // Log the token
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.recommendations) {
          setRecommendations(data.recommendations);
        } else {
          throw new Error(data.message || 'Failed to load recommendations');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching AI recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="card matched-add">
        <h3>AI Matched Recommendations</h3>
        <div className="loading-spinner">
          <p>Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card matched-add">
        <h3>AI Matched Recommendations</h3>
        <div className="error-message">
          <p>Error loading recommendations: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card matched-add">
      <h3>AI Matched Recommendations12</h3>

      {recommendations.length > 0 ? (
        recommendations.map((coach) => (
          <div key={coach.id} className="coach">
            <div className="info">
              <img
                src={coach.photo || "/coachsparkle/assets/images/professional-img.png"}
                alt={`${coach.name} Image`}
                className="coach-img"
                onError={(e) => {
                  e.target.src = "/coachsparkle/assets/images/professional-img.png";
                }}
              />
              <div className="name-text">
                <p>{coach.name}</p>
                <span>
                  <i className="bi bi-star-fill"></i> {coach.rating || '5.0'}
                </span>
              </div>
            </div>
            <div className="action-buttons">
              <Link href={`/coach-detail/${coach.id}`}>
                <button className="msg-btn">Book</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="no-recommendations">
          <p>No recommendations available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;