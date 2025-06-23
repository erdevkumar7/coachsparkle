// "use client";

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function CoachCalendar() {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="booking-calendar">
//       <label>Select Date & Time</label>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleChange}
//         showTimeSelect
//         timeFormat="HH:mm"
//         timeIntervals={30} // 30-minute slots
//         dateFormat="MMMM d, yyyy h:mm aa"
//         placeholderText="Choose a date and time"
//         minDate={new Date()} // only future dates
//       />
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CoachCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        // <div className="booking-calendar">
        //   <label className="mb-2 block font-medium">Select Date & Time</label>
        //   <DatePicker
        //     selected={selectedDate}
        //     onChange={(date) => setSelectedDate(date)}
        //     inline
        //     showTimeSelect
        //     timeFormat="HH:mm"
        //     timeIntervals={30}
        //     dateFormat="MMMM d, yyyy h:mm aa"
        //     minDate={new Date()}
        //   />
        // </div>


        <div className="booking-calendar" style={{margin: 'auto', marginTop: '25px'}}>      
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
            />
        </div>
    );
}

