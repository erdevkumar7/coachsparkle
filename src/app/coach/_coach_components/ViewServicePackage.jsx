export default function ViewServicePackage({pkg}) {

    return (
        <div className="session-card">
            <img
                src={pkg?.media_file ? pkg?.media_file : `/coachsparkle/images/package1.png`}
                alt="Team Image" className="top-image" />
            <div className="session-content">
                <h2>{pkg?.title}</h2>
                <div className="icons-row">
                    📍 {pkg?.delivery_mode?.mode_name} &nbsp; | &nbsp;
                    👤 {pkg?.session_format?.name} &nbsp; | &nbsp;
                    📅 Jun - Aug 2025
                </div>
                <div className="icons-row">
                    🗓️ {pkg?.session_count} Sessions &nbsp; | &nbsp;
                    ⏱️ {pkg?.session_duration} Min/Session
                </div>
                <div className="icons-row">
                    🧠 {pkg?.focus}
                </div>
                <p className="session-description">
                    {pkg?.short_description}
                </p>
                <div className="price">{pkg?.price} / {pkg?.price_model?.name}</div>
                <a href="#" className="book-btn">View Details</a>
            </div>
        </div>
    )
}