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
import Link from "next/link";
import Image from "next/image";


export default function BookingCalendar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [moreEvents, setMoreEvents] = useState([]);
  const [modalDate, setModalDate] = useState("");
  const [showCustomDialog, setShowCustomDialog] = useState(false);


  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setAnchorEl(info.jsEvent.currentTarget);
  };

  const handleViewClick = () => {
  setShowCustomDialog(true);
  setAnchorEl(null);
};

const handleDialogClose = () => {
  setShowCustomDialog(false);
};


  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const handleMoreClick = (arg) => {
    const events = arg.allSegs.map((seg) => seg.event);
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
        return (
          <Image
            src="/coachsparkle/images/zoom.png"
            alt="Zoom"
            width={20}
            height={16}
          />
        );
      case "teams":
        return (
          <Image
            src="/coachsparkle/images/teams.png"
            alt="Teams"
            width={16}
            height={16}
          />
        );
      case "google":
        return (
          <Image
            src="/coachsparkle/images/google-meet.png"
            alt="Google"
            width={16}
            height={16}
          />
        );
      default:
        return "";
    }
  };

  const events = [
    {
      title: "Confidence Jumpstart",
      start: "2025-07-08T13:00:00",
      extendedProps: { status: "confirmed", mode: "google", user: "John" },
    },
    {
      title: "Confidence Jumpstart",
      start: "2025-07-11T13:00:00",
      extendedProps: { status: "pending", mode: "teams", user: "Priya" },
    },
    {
      title: "Confidence Jumpstart",
      start: "2025-07-11T15:00:00",
      extendedProps: { status: "pending", mode: "zoom", user: "Priya" },
    },
    {
      title: "Confidence Jumpstart",
      start: "2025-07-11T16:00:00",
      extendedProps: { status: "pending", mode: "zoom", user: "Priya" },
    },
    {
      title: "Confidence Jumpstart",
      start: "2025-07-17T13:00:00",
      extendedProps: { status: "pending", mode: "teams", user: "Ravi" },
    },
    {
      title: "Confidence Jumpstart",
      start: "2025-07-21T13:00:00",
      extendedProps: { status: "zoom", mode: "zoom", user: "Priya" },
    },
    {
      title: "Confidence Jumpstart",
      start: "2025-07-24T13:00:00",
      extendedProps: { status: "confirmed", mode: "google", user: "Amit" },
    },
  ];

const getEventClass = (status) => {
  switch (status) {
    case "confirmed":
      return {
        className: "text-white rounded-2 px-2 py-1 d-inline-flex align-items-center justify-content-between gap-1 w-100",
        style: { backgroundColor: "#00A81C" },
      };

    case "pending":
      return {
        className: "text-white rounded-2 px-2 py-1 d-inline-flex align-items-center justify-content-between gap-1 w-100",
        style: { backgroundColor: "#DB6E00" },
      };

    case "zoom":
      return {
        className: "text-black rounded-2 px-2 py-1 d-inline-flex align-items-center justify-content-between gap-1 w-100",
        style: { backgroundColor: "#B6C1CA" },
      };

    default:
      return {
        className: "text-dark rounded-2 px-2 py-1 w-100",
        style: { backgroundColor: "#f8f9fa" },
      };
  }
};


  return (
    <div className="booking-section">
      <div className="mb-3 booking-header">
        <div className="d-flex justify-content-start gap-3 align-items-center quick-text">
          <div>
            <h5 className="mb-1">Bookings (Calendar Overview)</h5>
          </div>
          <div>
            <i
              className="bi bi-arrow-repeat"
              style={{ color: "#009BFA", fontSize: "17px" }}
            ></i>
            &nbsp;
            <Link href="#" className="sync">
              Sync Google / Outlook Calendar
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2 align-items-center">
          <div className="d-flex flex-wrap gap-3 small align-items-center booking-status">
            <span>
              <span className="dot confirm me-1"></span>Confirmed
            </span>
            <span>
              <span className="dot pending me-1"></span>Pending
            </span>
            <span>
              <span className="dot complete me-1"></span>Completed
            </span>
            <span>
              <span className="dot cancel me-1"></span>Canceled
            </span>
            <span>
              <span className="dot today me-1"></span>Today
            </span>
          </div>
          {/* <button className="add-new-btn">Add New Session</button> */}
        </div>
      </div>
      <div className="text-muted small mb-3">
        This Month: 3 Sessions Scheduled, 2 Sessions Pending and 1 Session
        Completed
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dayMaxEvents={1}
        headerToolbar={{
          left: "prev title next",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        eventContent={(arg) => {
          const { status, mode } = arg.event.extendedProps;
          const { className, style } = getEventClass(status);
          return (
            <div className={className} style={style}>
              <span className="small fw-semibold">{arg.event.title}</span>
              {getIcon(mode)}
            </div>
          );
        }}
        height="auto"
        allDaySlot={false}
      />

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
            <Typography variant="body2">
              <strong>Session Title:</strong> {selectedEvent?.title}
            </Typography>
            <Typography variant="body2">
              <strong>User Name:</strong> {selectedEvent?.extendedProps.user}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong>{" "}
              {selectedEvent?.start?.toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Time (Duration):</strong> N/A
            </Typography>
            <Typography variant="body2">
              <strong>Mode:</strong> {selectedEvent?.extendedProps.mode}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {selectedEvent?.extendedProps.status}
            </Typography>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button size="small" onClick={handleViewClick}>
              View
            </Button>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Popover>

{selectedEvent && showCustomDialog && (
  <div className="custom-dialog-overlay" onClick={handleDialogClose}>
    <div className="custom-dialog" onClick={(e) => e.stopPropagation()}>
      <button className="btn-close position-absolute top-0 end-0 m-3" onClick={handleDialogClose}></button>

      <div className="custom-dialog-body p-5 mt-4">
        <div className="d-flex justify-content-between align-items-start mb-2 gap-3 custom-border">
          <div>
            <h3 className="fw-bold mb-1">Breakthrough Package With {selectedEvent.extendedProps.user}</h3>
            <p>
              Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)
            </p>
          </div>
          <button className="px-4 py-1">Edit</button>
        </div>


        <div className="d-flex align-items-center mb-3 custom-border">
          <img src="/coachsparkle/images/person.png" alt="User" className="rounded-circle me-3" width="40" height="40" />
          <div>
            <div className="fw-semibold">{selectedEvent.extendedProps.user}</div>
            <div className="text-muted small">Location, City</div>
          </div>
        </div>

        <div className="d-flex align-items-start mb-3 custom-border">
          <img src="/coachsparkle/images/zoom-fill.png" alt="Zoom" className="me-3" width="40" height="40" />
          <div>
            <div className="fw-semibold">Join Zoom Meeting</div>
            <a href="https://zoom.us/12312312345" className="text-primary small">
              https://zoom.us/12312312345
            </a>
          </div>
        </div>

        <div className="mb-3 custom-border">
          <div className="fw-bold mb-1">Notes</div>
          <ul className="small ps-3 mb-0">
            <li>Coaching worksheets + voice note support between sessions allowed</li>
            <li>24 hour notice cancellation policy</li>
          </ul>
        </div>

        <div className="d-grid gap-2">
          <button className="action-btn btn-outline-primary">Reschedule</button>
          <button className="action-btn btn-outline-primary">Cancel Session</button>
          <button className="action-btn btn-outline-primary">Message</button>
        </div>
      </div>
    </div>
  </div>
)}


      {/* {showMoreModal && (
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
      )} */}
    </div>
  );
}
