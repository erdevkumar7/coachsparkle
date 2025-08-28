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
  error
}) {
  const [startDate, setStartDate] = React.useState(
    formData.booking_window_start 
      ? dayjs(formData.booking_window_start)
      : dayjs()
  );
  const [endDate, setEndDate] = React.useState(
    formData.booking_window_end 
      ? dayjs(formData.booking_window_end)
      : dayjs().add(1, 'day')
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateFormData = (newStartDate, newEndDate) => {
    const formattedStart = newStartDate.format('YYYY-MM-DD');
    const formattedEnd = newEndDate.format('YYYY-MM-DD');

    setFormData({
      booking_window_start: formattedStart,
      booking_window_end: formattedEnd
    });
  };

  const handleDateChange = (newValue, isStartDate = false) => {
    if (isStartDate) {
      setStartDate(newValue);
      if (newValue && newValue.isAfter(endDate)) {
        const newEndDate = newValue.add(1, 'day');
        setEndDate(newEndDate);
        updateFormData(newValue, newEndDate);
      } else {
        updateFormData(newValue, endDate);
      }
    } else {
      setEndDate(newValue);
      updateFormData(startDate, newValue);
    }
  };

  const open = Boolean(anchorEl);

  const formatRange = (start, end) => {
    if (!start || !end) return "Select date range";
    return `${start.format('MMM D, YYYY')} - ${end.format('MMM D, YYYY')}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        fullWidth
        className={`range-picker-field ${error ? "is-invalid" : ""}`}
        value={formatRange(startDate, endDate)}
        onClick={handleOpen}
        readOnly
        error={!!error}
        helperText={error?.message}
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
            onChange={(newValue) => handleDateChange(newValue, true)}
            minDate={dayjs()}
            disabled={!isProUser}
          />
          <DatePicker
            label="End Date"
            minDate={startDate}
            value={endDate}
            onChange={(newValue) => handleDateChange(newValue, false)}
            disabled={!isProUser}
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