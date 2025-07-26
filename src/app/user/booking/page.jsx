import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import BookingCalendar from "../_user_components/booking/BookingCalendar";
import "../_styles/booking.css";
import "../_styles/dashboard.css";

export default function Booking() {
  return (
    <div className="main-panel">
      <div className="px-5 user-booking-section">
        <BookingCalendar />
      </div>
    </div>
  );
}


