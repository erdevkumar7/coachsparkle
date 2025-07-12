"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Button from "@mui/material/Button";
import ZoomIcon from "@mui/icons-material/VideoCall";
import TeamsIcon from "@mui/icons-material/PeopleAlt";
import GoogleIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

export default function BookingCalendar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [moreEvents, setMoreEvents] = useState([]);
  const [modalDate, setModalDate] = useState("");

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setAnchorEl(info.jsEvent.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const handleMoreClick = (arg) => {
    const events = arg.allSegs.map(seg => seg.event);
    setMoreEvents(events);
    setModalDate(arg.date.toDateString());
    setShowMoreModal(true);
    return false;
  };

  const handleModalClose = () => {
    setShowMoreModal(false);
    setMoreEvents([]);
  };

  const getIcon = (mode) => {
    switch (mode) {
      case "zoom":
        return <ZoomIcon fontSize="small" />;
      case "teams":
        return <TeamsIcon fontSize="small" />;
      case "google":
        return <GoogleIcon fontSize="small" />;
      default:
        return <PersonIcon fontSize="small" />;
    }
  };

  const events = [
    {
      title: "13:00 Confidence Jumpstart",
      start: "2025-07-08T13:00:00",
      extendedProps: { status: "confirmed", mode: "google", user: "John" },
    },
    {
      title: "13:00 Confidence Jumpstart",
      start: "2025-07-11T13:00:00",
      extendedProps: { status: "pending", mode: "teams", user: "Priya" },
    },
    {
      title: "15:00 Confidence Jumpstart",
      start: "2025-07-11T15:00:00",
      extendedProps: { status: "pending", mode: "zoom", user: "Priya" },
    },
    {
      title: "16:00 Confidence Jumpstart",
      start: "2025-07-11T16:00:00",
      extendedProps: { status: "pending", mode: "zoom", user: "Priya" },
    },
    {
      title: "13:00 Confidence Jumpstart",
      start: "2025-07-17T13:00:00",
      extendedProps: { status: "pending", mode: "teams", user: "Ravi" },
    },
    {
      title: "13:00 Confidence Jumpstart",
      start: "2025-07-21T13:00:00",
      extendedProps: { status: "zoom", mode: "zoom", user: "Priya" },
    },
    {
      title: "13:00 Confidence Jumpstart",
      start: "2025-07-24T13:00:00",
      extendedProps: { status: "confirmed", mode: "google", user: "Amit" },
    },
  ];

  const getEventClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-success text-white rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1";
      case "pending":
        return "bg-warning text-dark rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1";
      case "zoom":
        return "bg-secondary text-white rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1";
      default:
        return "bg-light text-dark rounded-pill px-2 py-1";
    }
  };

  return (
    <div className="booking-section">
      <div className="d-flex justify-content-between align-items-center mb-3 booking-header">
        <div>
          <h5 className="mb-1">Bookings (Calendar Overview)</h5>
          <a href="#" className="ms-auto text-primary text-decoration-underline">Sync Google / Outlook Calendar</a>
          <div className="text-muted small">This Month: 3 Sessions Scheduled, 2 Sessions Pending and 1 Session Completed</div>
        </div>
        <button className="btn btn-primary">Add New Session</button>
      </div>

      {/* Legend */}
      <div className="d-flex flex-wrap gap-3 mb-2 small align-items-center">
        <span><span className="dot bg-success me-1"></span>Confirmed</span>
        <span><span className="dot bg-warning me-1"></span>Pending</span>
        <span><span className="dot bg-danger me-1"></span>Completed</span>
        <span><span className="dot bg-info me-1"></span>Canceled</span>
        <span><span className="dot bg-dark me-1"></span>Today</span>
      </div>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        moreLinkClick={handleMoreClick}
        dayMaxEvents={2}
        headerToolbar={{
          left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        eventContent={(arg) => {
          const { status, mode } = arg.event.extendedProps;
          const className = getEventClass(status);
          return (
            <div className={className}>
              {getIcon(mode)}
              <span className="small fw-semibold">{arg.event.title}</span>
            </div>
          );
        }}
        height="auto"
      />

      {/* Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div className="p-3" style={{ width: "260px" }}>
          <div className="d-flex align-items-center text-primary mb-2">
            <InfoOutlinedIcon fontSize="small" />
            <Typography className="ms-1 fw-semibold">Session Info</Typography>
          </div>
          <div className="mb-2">
            <Typography variant="body2"><strong>Session Title:</strong> {selectedEvent?.title}</Typography>
            <Typography variant="body2"><strong>User Name:</strong> {selectedEvent?.extendedProps.user}</Typography>
            <Typography variant="body2"><strong>Date:</strong> {selectedEvent?.start?.toLocaleDateString()}</Typography>
            <Typography variant="body2"><strong>Time (Duration):</strong> N/A</Typography>
            <Typography variant="body2"><strong>Mode:</strong> {selectedEvent?.extendedProps.mode}</Typography>
            <Typography variant="body2"><strong>Status:</strong> {selectedEvent?.extendedProps.status}</Typography>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={handleClose}>Cancel</Button>
          </div>
        </div>
      </Popover>

      {/* Custom Modal */}
      {showMoreModal && (
        <div className="custom-modal-overlay" onClick={handleModalClose}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="m-0">Sessions on {modalDate}</h6>
              <button className="btn-close" onClick={handleModalClose}></button>
            </div>
            {moreEvents.map((ev, idx) => (
              <div key={idx} className="mb-2 border-bottom pb-2">
                <div className={getEventClass(ev.extendedProps.status)}>
                  {getIcon(ev.extendedProps.mode)}
                  <strong>{ev.title}</strong>
                </div>
                <div className="text-muted small mt-1">
                  {ev.start?.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
