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

      </div>
    </>
  )
}