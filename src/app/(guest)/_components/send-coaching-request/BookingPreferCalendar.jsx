//this component is not in use we can delete or use
'use client';

import * as React from 'react';
import { Box, Popover, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BookingPreferCaledar({
  formData,
  setFormData,
}) {
  const [startDate, setStartDate] = React.useState(dayjs());

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleDone = () => {
  const formattedStart = startDate.format('YYYY-MM-DD');

  setFormData(prev => ({
    ...prev,
    booking_window: `${formattedStart}`
  }));

  handleClose();
};

  const open = Boolean(anchorEl);

  const formatRange = (start) => {
    return `${start.format('MMM D')}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        fullWidth
        className="range-picker-field"
        value={formatRange(startDate)}
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
            minDate={dayjs()}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
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

