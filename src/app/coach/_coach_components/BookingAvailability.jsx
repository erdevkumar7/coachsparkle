"use client";

import * as React from "react";
import { Box, Popover, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "../_styles/booking_availability.css";

export default function DateRangeSelector({
  formData,
  setFormData,
  isProUser,
}) {
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs().add(1, "day"));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    setFormData((prevFormData) => ({
      ...prevFormData,
      booking_availability_start: startDate.format("YYYY-MM-DD"),
      booking_availability_end: endDate.format("YYYY-MM-DD"),
    }));

    // console.log("Selected Start:", startDate.format("YYYY-MM-DD"));
    // console.log("Selected End:", endDate.format("YYYY-MM-DD"));
  };

  const open = Boolean(anchorEl);

  const formatRange = (start, end) => {
    return `${start.format("MMM D, YYYY")} - ${end.format("MMM D, YYYY")}`;
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
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{ sx: { p: 2, width: 400 } }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Start Date */}
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              if (newValue && newValue.isAfter(endDate)) {
                setEndDate(newValue.add(1, "day"));
              }
            }}
            minDate={dayjs()}
            disabled={!isProUser}
          />

          {/* End Date */}
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
            disabled={!isProUser}
          />

          <Box textAlign="right">
            <button
              className="btn btn-primary btn-sm rounded-pill px-4"
              onClick={handleClose}
            >
              Done
            </button>
          </Box>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
