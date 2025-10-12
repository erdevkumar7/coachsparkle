// 'use client';
// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parseISO } from "date-fns";

// const processApiData = (apiData) => {
//   if (!apiData) return { available: [], unavailable: [], booked: [] };

//   const availableDates = [];
//   const unavailableDates = [...(apiData.unavailable || [])];
//   const bookedDates = Object.keys(apiData.booked || {});

//   if (apiData.available && Array.isArray(apiData.available)) {
//     apiData.available.forEach(range => {
//       if (Array.isArray(range) && range.length === 2) {
//         const startDate = parseISO(range[0]);
//         const endDate = parseISO(range[1]);

//         let currentDate = new Date(startDate);

//         while (currentDate <= endDate) {
//           const dateStr = format(currentDate, "yyyy-MM-dd");
//           availableDates.push(dateStr);
//           currentDate.setDate(currentDate.getDate() + 1);
//         }
//       }
//     });
//   }

//   return { available: availableDates, unavailable: unavailableDates, booked: bookedDates };
// };

// export default function CoachDetailCalendar({ calendarData }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [processedData, setProcessedData] = useState({
//     available: [],
//     unavailable: [],
//     booked: []
//   });

//   useEffect(() => {
//     if (calendarData) {
//       const processed = processApiData(calendarData);
//       setProcessedData(processed);
//     }
//   }, [calendarData]);

//   const getDayClassName = (date) => {
//     const dateStr = format(date, "yyyy-MM-dd");
//     const { available, unavailable, booked } = processedData;

//     // Priority: unavailable -> booked -> available
//     if (unavailable.includes(dateStr)) return "day-red";
//     if (booked.includes(dateStr)) return "day-blue";
//     if (available.includes(dateStr)) return "day-green";

//     return "";
//   };

//   return (
//     <DatePicker
//       selected={selectedDate}
//       onChange={(date) => setSelectedDate(date)}
//       inline
//       dayClassName={(date) => getDayClassName(date)}
//       calendarClassName="custom-calendar"
//     />
//   );
// }

'use client';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Chip } from '@mui/material';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import dayjs from 'dayjs';
import { format, parseISO } from 'date-fns';

const processApiData = (apiData) => {
  if (!apiData) return { available: [], unavailable: [], booked: [] };

  const availableDates = [];
  const unavailableDates = [...(apiData.unavailable || [])];
  const bookedDates = Object.keys(apiData.booked || {});

  if (apiData.available && Array.isArray(apiData.available)) {
    apiData.available.forEach(range => {
      if (Array.isArray(range) && range.length === 2) {
        const startDate = parseISO(range[0]);
        const endDate = parseISO(range[1]);

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          availableDates.push(format(currentDate, "yyyy-MM-dd"));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
  }

  return { available: availableDates, unavailable: unavailableDates, booked: bookedDates };
};

function StyledDay(props) {

  const {
    highlightedDates = {},
    day,
    outsideCurrentMonth,
    // MUI specific props that should NOT go to DOM
    disableHighlightToday,
    showDaysOutsideCurrentMonth,
    isAnimating,
    onDaySelect,
    isFirstVisibleCell,
    isLastVisibleCell,
    today, // Extract this to prevent DOM error
    selected,
    focused,
    // DOM props that are safe to pass
    ...other
  } = props;

    // console.log('children', children)

  const dateStr = day.format('YYYY-MM-DD');
   const dayNumber = day.date();
  const isAvailable = highlightedDates.available?.includes(dateStr);
  const isUnavailable = highlightedDates.unavailable?.includes(dateStr);
  const isBooked = highlightedDates.booked?.includes(dateStr);

  let dayStyle = {};

  // Priority: unavailable -> booked -> available
  if (isUnavailable) {
    dayStyle = {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      borderRadius: '50%',
      fontWeight: 'bold'
    };
  } else if (isBooked) {
    dayStyle = {
      backgroundColor: '#d1ecf1',
      color: '#0c5460',
      borderRadius: '50%',
      fontWeight: 'bold'
    };
  } else if (isAvailable) {
    dayStyle = {
      backgroundColor: '#d4edda',
      color: '#155724',
      borderRadius: '50%',
      fontWeight: 'bold'
    };
  }

  return (
    <Box
      {...other}
      sx={{
        ...dayStyle,
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: dayStyle.backgroundColor ?
            (isUnavailable ? '#f1b0b7' :
              isBooked ? '#bee5eb' :
                '#c3e6cb') : 'inherit'
        }
      }}
    >{dayNumber}</Box>
  );
}


export default function CoachDetailCalendar({ calendarData }) {
  const [processedData, setProcessedData] = React.useState({
    available: [],
    unavailable: [],
    booked: []
  });

  React.useEffect(() => {
    if (calendarData) {
      const processed = processApiData(calendarData);
      setProcessedData(processed);
    }
  }, [calendarData]);


  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          slots={{
            day: StyledDay,
          }}
          slotProps={{
            day: {
              highlightedDates: processedData,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}