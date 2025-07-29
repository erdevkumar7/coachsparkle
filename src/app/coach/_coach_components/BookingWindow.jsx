'use client';

import * as React from 'react';
import { Box, Popover, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import '../_styles/booking_window.css';

export default function BookingWindowPicker({
  formData,
  setFormData,
  isProUser,
}) {
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs().add(1, 'hour'));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleDone = () => {
  const formattedStart = startDate.format('YYYY-MM-DD');
  const formattedEnd = endDate.format('YYYY-MM-DD');

  setFormData(prev => ({
    ...prev,
    booking_window: `${formattedStart} - ${formattedEnd}`
  }));

  handleClose();
};

  const open = Boolean(anchorEl);

  const formatRange = (start, end) => {
    return `${start.format('MMM D')} - ${end.format('MMM D')}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        fullWidth
        className="range-picker-field"
        value={formatRange(startDate, endDate)}
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
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              if (newValue && newValue.isAfter(endDate)) {
                setEndDate(newValue.add(1, 'hour'));
              }
            }}
          />
          <DatePicker
            label="End Date"
            minDate={startDate}
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
          <Box textAlign="right">
            <button className="btn btn-primary btn-sm rounded-pill px-4" onClick={handleDone}>
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

// export default function BookingWindowPicker({ formData, setFormData, isProUser }) {
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
//             booking_window: formatted,
//         }));
//         // ✅ Close the calendar after selection
//         setShowPicker(false);

//     };

//     // console.log('range', range)
//     return (
//         <>
//             <input
//                 type="text"
//                 id="booking_window"
//                 name="booking_window"
//                 readOnly
//                 value={formData.booking_window}
//                 onClick={() => setShowPicker(!showPicker)}
//                 placeholder="Select Date Range"
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
