export default function UpcomingSessions() {
  return (
    <>
      <h3 className="text-lg font-semibold quick-text">Upcoming Sessions</h3>
      <div className="session">
        <div className="session-date">
          <span className="day">30</span>
          <span className="month">AUG</span>
        </div>
        <img
          src="/coachsparkle/assets/images/sessions-img-one.png"
          alt="Lina Stratus"
          className="avatar"
        />
        <div className="session-info">
          <div className="name">Lina Stratus</div>
          <div className="time">5:00 PM</div>
        </div>
      </div>

      <div className="session">
        <div className="session-date">
          <span className="day">15</span>
          <span className="month">OCT</span>
        </div>
        <img
          src="/coachsparkle/assets/images/sessions-img-two.png"
          alt="Matthew Saw"
          className="avatar"
        />
        <div className="session-info">
          <div className="name">Matthew Saw</div>
          <div className="time">7:00 PM</div>
        </div>
      </div>

      <div className="session">
        <div className="session-date">
          <span className="day">20</span>
          <span className="month">DEC</span>
        </div>
        <img
          src="/coachsparkle/assets/images/sessions-img-three.png"
          alt="Dercy Sho"
          className="avatar"
        />
        <div className="session-info">
          <div className="name">Dercy Sho</div>
          <div className="time">10:00 AM</div>
        </div>
      </div>

      <div className="manage-btn">
        <button>
          Manage Bookings <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </>
  );
}
