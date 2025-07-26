'use client';

import * as React from 'react';
import { Box, Popover, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import '../_styles/booking_availability.css';

export default function DateTimeRangeSelector() {
  const [startDateTime, setStartDateTime] = React.useState(dayjs());
  const [endDateTime, setEndDateTime] = React.useState(dayjs().add(1, 'hour'));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formatRange = (start, end) => {
    return `${start.format('MMM D, h:mm A')} - ${end.format('MMM D, h:mm A')}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        fullWidth
        className="range-picker-field"
        value={formatRange(startDateTime, endDateTime)}
        onClick={handleOpen}
        readOnly
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{ sx: { p: 2, width: 400 } }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <DateTimePicker
            label="Start Date & Time"
            value={startDateTime}
            onChange={(newValue) => {
              setStartDateTime(newValue);
              if (newValue && newValue.isAfter(endDateTime)) {
                setEndDateTime(newValue.add(1, 'hour'));
              }
            }}
          />
          <DateTimePicker
            label="End Date & Time"
            minDateTime={startDateTime}
            value={endDateTime}
            onChange={(newValue) => setEndDateTime(newValue)}
          />
          <Box textAlign="right">
            <button className="btn btn-primary btn-sm rounded-pill px-4" onClick={handleClose}>
              Done
            </button>
          </Box>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}









// 'use client';
// import { useState } from 'react';
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';

// import { format } from 'date-fns';

// export default function BookingAvailabilityPicker({ formData, setFormData, isProUser }) {
//     const [showPicker, setShowPicker] = useState(false);
//     const [range, setRange] = useState([
//         {
//             startDate: new Date(),
//             endDate: new Date(),
//             key: 'selection',
//         },
//     ]);

//     const handleRangeChange = (ranges) => {
//         const { startDate, endDate } = ranges.selection;
//         setRange([ranges.selection]);

//         const formatted = `${format(startDate, 'yyyy-MM-dd')} - ${format(endDate, 'yyyy-MM-dd')}`;
//         setFormData((prev) => ({
//             ...prev,
//             booking_availability: formatted,
//         }));
//         // ✅ Close the calendar after selection
//         setShowPicker(false);

//     };

//     // console.log('range', range)
//     return (
//         <>
//             <input
//                 type="text"
//                 id="booking_availability"
//                 name="booking_availability"
//                 readOnly
//                 value={formData.booking_availability}
//                 onClick={() => setShowPicker(!showPicker)}
//                 placeholder="Select Availablity"
//                 disabled={!isProUser}
//                 className={`form-control ${!isProUser ? "disabled-bg" : ""
//                     }`}
//             />
//             {showPicker && (
//                 <div className="calendar-container" style={{ zIndex: 9999, position: 'absolute' }}>
//                     <DateRange
//                         ranges={range}
//                         onChange={handleRangeChange}
//                         moveRangeOnFirstSelection={false}
//                         editableDateInputs={true}
//                         minDate={new Date()}
//                     />
//                 </div>
//             )}
//         </>
//     );
// }
