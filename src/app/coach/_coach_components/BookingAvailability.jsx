'use client';

import * as React from 'react';
import { Box, Popover, Typography, Button, Stack, Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import "../_styles/booking_availability_picker.css";

export default function BookingAvailabilityPicker({
  formData,
  setFormData,
  isProUser,
  error,
  sessionDuration = 60,
  bookingSlots = 1
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [phase, setPhase] = React.useState("IDLE");

  const [rangeStart, setRangeStart] = React.useState(null);
  const [rangeEnd, setRangeEnd] = React.useState(null);

  const [draftSelectedDay, setDraftSelectedDay] = React.useState(null);
  const [draftAvailability, setDraftAvailability] = React.useState({});

  const [errorMessage, setErrorMessage] = React.useState(null);

  const open = Boolean(anchorEl);


  const generateSlots = (duration) => {
    const slots = [];
    let start = dayjs().hour(0).minute(0);
    let end = dayjs().hour(24).minute(0);

    while (start.isBefore(end)) {
      slots.push(start.format("HH:mm"));
      start = start.add(duration, "minute");
    }
    return slots;
  };

  const getRangeDays = (start, end) => {
    const days = [];
    let cur = dayjs(start);
    const last = dayjs(end);

    while (cur.isBefore(last) || cur.isSame(last)) {
      days.push(cur.format("YYYY-MM-DD"));
      cur = cur.add(1, 'day');
    }

    return days;
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);

    setDraftAvailability(formData.booking_availability || {});
    setRangeStart(null);
    setRangeEnd(null);
    setDraftSelectedDay(null);
    setErrorMessage(null);
    setPhase("IDLE");
  };

  const handleClose = () => {
    setAnchorEl(null);

    setDraftAvailability({});
    setRangeStart(null);
    setRangeEnd(null);
    setDraftSelectedDay(null);
    setErrorMessage(null);
    setPhase("IDLE");
  };

  const canSwitchDay = () => {
    if (!draftSelectedDay) return true;

    const count = draftAvailability[draftSelectedDay]?.length || 0;

    if (count !== bookingSlots) {
      setErrorMessage(
        `Please select ${bookingSlots} slots for ${dayjs(draftSelectedDay).format("DD MMM")} before continuing.`
      );
      return false;
    }

    return true;
  };

  const handleDateClick = (date) => {
    const day = date.format("YYYY-MM-DD");

    if (phase === "IDLE") {
      setRangeStart(day);
      setPhase("START");
      return;
    }

    if (phase === "START") {
      if (day >= rangeStart) {
        setRangeEnd(day);
      } else {
        setRangeEnd(rangeStart);
        setRangeStart(day);
      }

      setPhase("SLOTS");
      setDraftSelectedDay(rangeStart || day);
      return;
    }

    if (phase === "SLOTS") {
      if (day < rangeStart || day > rangeEnd) return;
      if (!canSwitchDay()) return;

      setDraftSelectedDay(day);
      setErrorMessage(null);
    }
  };

  const isInRange = (d) => {
    if (!rangeStart || !rangeEnd) return false;
    return d >= rangeStart && d <= rangeEnd;
  };

  const toggleSlot = (day, time) => {
    setDraftAvailability(prev => {
      const daySlots = prev[day] || [];

      if (!daySlots.includes(time) && daySlots.length >= bookingSlots) {
        return prev;
      }

      return {
        ...prev,
        [day]: daySlots.includes(time)
          ? daySlots.filter(s => s !== time)
          : [...daySlots, time]
      };
    });

    setErrorMessage(null);
  };

  const handleBack = () => {
  setPhase("START");
  setDraftSelectedDay(null);
  setErrorMessage(null);
  setRangeEnd(null);
};


  const handleSave = () => {
    const days = getRangeDays(rangeStart, rangeEnd);

    const failed = days.filter(d => {
      const count = draftAvailability[d]?.length || 0;
      return count !== bookingSlots;
    });

    if (failed.length > 0) {
      const formatted = failed.map(d => dayjs(d).format("DD MMM")).join(", ");
      setErrorMessage(
        `Missing required slots for: ${formatted}. Please select ${bookingSlots} slots for each date before saving.`
      );
      return;
    }

    setFormData({
      booking_availability_start: rangeStart,
      booking_availability_end: rangeEnd,
      booking_availability: draftAvailability,
      booking_time: JSON.stringify(draftAvailability)
    });

    handleClose();
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box
          onClick={isProUser ? handleOpen : undefined}
          sx={{
            border: error ? "1px solid red" : "1px solid #ccc",
            px: 2, py: 1,
            borderRadius: 1,
            cursor: isProUser ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            minHeight: 38,
            bgcolor: isProUser ? "white" : "#f3f3f3"
          }}
        >
          {formData.booking_availability_start
            ? `${formData.booking_availability_start} → ${formData.booking_availability_end}`
            : "Select availability"}
        </Box>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          PaperProps={{
            sx: {
              p: 2,
              display: "flex",
              gap: 2,
              width: 820,
              minHeight: 520,
            }
          }}
        >

          <Box>
            <Typography fontWeight={600} mb={1}>
              {phase === "IDLE" && "Select start date"}
              {phase === "START" && "Select end date"}
              {phase === "SLOTS" && "Select a day to choose slots"}
            </Typography>

            <DateCalendar
              disablePast
              onChange={(v) => handleDateClick(v)}
              slotProps={{
                day: (o) => {
                  const d = o.day.format("YYYY-MM-DD");
                  const start = d === rangeStart;
                  const end = d === rangeEnd;
                  const mid = isInRange(d);
                  const disableOutside = phase === "SLOTS" && !mid;

                  return {
                    disabled: disableOutside,
                    sx: {
                      bgcolor: start || end
                        ? "#1976d2 !important"
                        : mid ? "#e3f2fd" : undefined,
                      color: start || end ? "white !important" : undefined,
                      borderRadius: mid ? 0 : 1,
                      opacity: disableOutside ? 0.3 : 1,
                      cursor: disableOutside ? "not-allowed" : "pointer"
                    }
                  };
                }
              }}
            />
          </Box>

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", borderLeft: "1px solid #ddd", pl: 2 }}>

            {phase !== "SLOTS" ? (
              <Typography sx={{ mt: 2, color: "gray" }}>
                Select a range first
              </Typography>
            ) : (
              <>
                <Typography fontWeight={600} mb={1}>
                  {draftSelectedDay ? dayjs(draftSelectedDay).format("DD MMM YYYY") : ""}
                </Typography>

                {errorMessage && (
                  <Alert severity="error" sx={{ mb: 1 }}>
                    {errorMessage}
                  </Alert>
                )}

                <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 420, pr: 1 }}>
                  {draftSelectedDay &&
                    generateSlots(sessionDuration).map(slot => {
                      const selected = draftAvailability[draftSelectedDay]?.includes(slot);

                      return (
                        <Box
                          key={slot}
                          onClick={() => toggleSlot(draftSelectedDay, slot)}
                          sx={{
                            py: 1,
                            px: 2,
                            mb: .5,
                            borderRadius: 1,
                            cursor: "pointer",
                            bgcolor: selected ? "#4caf50" : "#eef0f3",
                            color: selected ? "white" : "#444",
                            fontSize: "14px",
                            "&:hover": { opacity: 0.85 }
                          }}
                        >
                          {slot}
                        </Box>
                      );
                    })}
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button variant="outlined" onClick={handleBack}>
                    Back to Date Range
                  </Button>
                  <Button variant="contained" onClick={handleSave}>
                    Save Changes
                  </Button>
                </Stack>
              </>
            )}

          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
}
