import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import BookingCalendar from "../_coach_components/booking/BookingCalendar";
import "../_styles/coach_bookingcalendar.css";

export default function Booking() {
  return (
    <div className="main-panel">
      <div className="px-5 booking-top-inner">
        <BookingCalendar />
      </div>
    </div>
  );
}

