'use client';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import clsx from 'clsx';
import './availabilitystartend.css';

export default function AvailabilityStartEndCalendar({ value, onChange }) {
  const [range, setRange] = React.useState(value || [null, null]);

  const handleSelect = (date) => {
    if (!range[0] || (range[0] && range[1])) {
      setRange([date, null]);
      onChange([date, null]);
    } else if (range[0] && !range[1]) {
      let start = range[0];
      let end = date;

      if (dayjs(end).isBefore(start)) {
        [start, end] = [end, start];
      }

      setRange([start, end]);
      onChange([start, end]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={range[1] || range[0]}
        onChange={handleSelect}
        slotProps={{
          day: (ownerState) => {
            const date = ownerState.day;
            const isStart = range[0] && dayjs(date).isSame(range[0], 'day');
            const isEnd = range[1] && dayjs(date).isSame(range[1], 'day');
            const isInRange =
              range[0] &&
              range[1] &&
              dayjs(date).isAfter(range[0], 'day') &&
              dayjs(date).isBefore(range[1], 'day');

            return {
              className: clsx({
                'start-date': isStart,
                'end-date': isEnd,
                'in-range': isInRange,
              }),
            };
          },
        }}
      />
      {range[0] && !range[1] && (
        <Typography variant="body2" color="error">
          Select End date too
        </Typography>
      )}
    </LocalizationProvider>
  );
}
