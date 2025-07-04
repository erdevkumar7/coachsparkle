'use client';
export default function CoachingListDetailPackage({ packages }) {

  return (
    <>
      <div className="session-wrapper">
        {packages.map((pkg, index) => (
          <div className="session-card" key={index}>
            <img
              src={pkg?.media_file ? pkg?.media_file : '/coachsparkle/images/package1.png'}
              alt="Team Image" className="top-image" />
            <div className="session-content">
              <h2>{pkg?.title}</h2>
              <div className="icons-row">
                📍 {pkg?.delivery_mode?.mode_name}   |  
                👤 {pkg?.session_format?.name}   |  
                📅 Jun - Aug 2025
              </div>
              <div className="icons-row">
                🗓️ {pkg?.session_count} Sessions   |  
                ⏱️ {pkg?.session_duration} Min/Session
              </div>
              <div className="icons-row">
                🧠 {pkg?.focus}
              </div>
              <p className="session-description">
                {pkg?.short_description}
              </p>
              <ul className="session-list">
                {pkg?.description ? <li>{pkg?.description}</li> : ''}
              </ul>
              <div className="price">{pkg?.price} / {pkg?.price_model?.name}</div>
              <a href="#" className="book-btn">View Details and Booking Now!</a>
            </div>
          </div>
        ))}

        {/* <div className="session-card">
          <img src={/coachsparkle/images/package1.png} alt="Team Image" className="top-image" />
          <div className="session-content">
            <h2>Confidence Jumpstart Session</h2>
            <div className="icons-row">
              📍 Online   |  
              👤 1-on-1 coaching   |  
              📅 Jun - Aug 2025
            </div>
            <div className="icons-row">
              🗓️ 4 Sessions   |  
              ⏱️ 60 Min/Session
            </div>
            <div className="icons-row">
              🧠 Confidence, Goal Clarity, Custom Action Plan
            </div>
            <p className="session-description">
              A one-time deep-dive session to assess your confidence blocks, set clear goals, and walk away with a custom action plan.
            </p>
            <ul className="session-list">
              <li>A deep-dive session to identify your personal confidence blocks</li>
              <li>A guided reflection to set clear, achievable confidence goals</li>
              <li>A customized action plan tailored to your specific needs and lifestyle</li>
              <li>Bonus: 5-day follow-up email check-in for accountability and support.</li>
            </ul>
            <div className="price">$290 / Package</div>
            <a href="#" className="book-btn">View Details and Book Now!</a>
            <div className="slots-left">Only 4 slots left!</div>
            <div className="note">Best for first timers and those preparing for key life or career transition</div>
          </div>
        </div> */}

      </div>
    </>
  )
}