"use client";
import React, { useState, useEffect } from "react";
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
import Cookies from "js-cookie";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookingCalendar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [moreEvents, setMoreEvents] = useState([]);
  const [modalDate, setModalDate] = useState("");
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');
  const router = useRouter();

  // Fetch data from API
  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/CoachConfirmedBooking`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "all" }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const transformedEvents = transformApiDataToEvents(data.data);
        setEvents(transformedEvents);
      } else {
        throw new Error(data.message || "Failed to fetch booking data");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching booking data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to transform API data to calendar events
  const transformApiDataToEvents = (apiData) => {
    const events = [];

    apiData.forEach(dateGroup => {
      dateGroup.packages.forEach(pkg => {
        pkg.users.forEach(user => {
          const event = {
            id: `${user.id}-${pkg.package_id}-${dateGroup.date}`, // Create a unique ID
            title: pkg.title,
            start: `${dateGroup.date}T${user.slot_time_start}:00`,
            extendedProps: {
              status: getStatusText(user.status),
              user: `${user.first_name} ${user.last_name}`,
              profile_image: user.profile_image,
              email: user.email,
              packageId: pkg.package_id,
              coachId: pkg.coach_id,
              userId: user.id,
              rawStatus: user.status,
              bookingId: user.booking_id // Assuming API returns booking_id
            }
          };
          events.push(event);
        });
      });
    });

    return events;
  };

  // Convert status number to text
  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 0: return "pending";
      case 1: return "confirmed";
      case 2: return "completed";
      case 3: return "canceled";
      default: return "pending";
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/change-booking-status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: selectedEvent.extendedProps.bookingId,
            status: newStatus
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Update the event status in the local state
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === selectedEvent.id 
              ? {
                  ...event,
                  extendedProps: {
                    ...event.extendedProps,
                    status: getStatusText(newStatus),
                    rawStatus: newStatus
                  }
                }
              : event
          )
        );
        
        // Update the selected event
        setSelectedEvent(prev => ({
          ...prev,
          extendedProps: {
            ...prev.extendedProps,
            status: getStatusText(newStatus),
            rawStatus: newStatus
          }
        }));
        
        toast.success("Status updated successfully!");
        setShowEditDialog(false); // Close the edit dialog after successful update
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(`Error updating status: ${err.message}`);
      console.error("Error updating status:", err);
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setAnchorEl(info.jsEvent.currentTarget);
  };

  const handleViewClick = () => {
    setShowViewDialog(true);
    setShowEditDialog(false);
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setShowEditDialog(true);
    setShowViewDialog(false);
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setShowViewDialog(false);
    setShowEditDialog(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  // Calculate statistics for the summary
  const calculateStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthEvents = events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear;
    });

    const scheduled = monthEvents.filter(e => e.extendedProps.rawStatus === 1).length;
    const pending = monthEvents.filter(e => e.extendedProps.rawStatus === 0).length;
    const completed = monthEvents.filter(e => e.extendedProps.rawStatus === 2).length;
    const canceled = monthEvents.filter(e => e.extendedProps.rawStatus === 3).length;

    return { scheduled, pending, completed, canceled };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="booking-section">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-section">
        <div className="alert alert-danger" role="alert">
          Error loading booking data: {error}
        </div>
      </div>
    );
  }

  // Render Action Buttons based on status and mode (view/edit)
  const renderActionButtons = (isEditMode = false) => {
    if (!isEditMode) {
      // View Mode - Only show Message button
      return (
        <button 
          className="action-btn btn-outline-primary" 
          onClick={() => {
            handleDialogClose();
            router.push(`/coach/messages/3?user_id=${selectedEvent.extendedProps.userId}`);
          }}
        >
          Message
        </button>
      );
    }

    // Edit Mode - Show status-specific buttons + Message
    return (
      <>
        {selectedEvent.extendedProps.rawStatus === 0 && ( // Pending
          <>
            <button 
              className="action-btn btn-outline-primary" 
              onClick={() => handleStatusChange(1)} // Confirm
            >
              Confirm
            </button>
            <button 
              className="action-btn btn-outline-primary" 
              onClick={() => handleStatusChange(3)} // Cancel
            >
              Cancel Session
            </button>
          </>
        )}
        
        {selectedEvent.extendedProps.rawStatus === 1 && ( // Confirmed
          <>
            {/* <button 
              className="action-btn btn-outline-primary" 
              onClick={() => handleStatusChange(2)} // Complete
            >
              Complete Session
            </button> */}
            <button 
              className="action-btn btn-outline-primary" 
              onClick={() => handleStatusChange(3)} // Cancel
            >
              Cancel Session
            </button>
          </>
        )}
        
        {/* {selectedEvent.extendedProps.rawStatus === 3 && ( // Canceled
          <button className="action-btn btn-outline-primary">
            Reschedule
          </button>
        )} */}
        
        {/* Always show Message button in edit mode too */}
        <button 
          className="action-btn btn-outline-primary" 
          onClick={() => {
            handleDialogClose();
            router.push(`/coach/messages/3?user_id=${selectedEvent.extendedProps.userId}`);
          }}
        >
          Message
        </button>
      </>
    );
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
        <div className="d-flex justify-content-between mt-2 align-items-center confirmed-pending-tab">
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
          <button className="add-new-btn" onClick={() => router.push(`/coach/service-packages`)}>Add New Session</button>
        </div>
      </div>
      <div className="text-muted small mb-3">
        This Month: {stats.scheduled} Sessions Scheduled, {stats.pending} Sessions Pending and {stats.completed} Sessions Completed
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
          const { status } = arg.event.extendedProps;
          const { className, style } = getEventClass(status);
          return (
            <div className={className} style={style}>
              <span className="small fw-semibold">{arg.event.title}</span>
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
              <strong>Email:</strong> {selectedEvent?.extendedProps.email}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong>{" "}
              {selectedEvent?.start?.toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Time:</strong>{" "}
              {selectedEvent?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {selectedEvent?.extendedProps.status}
            </Typography>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button size="small" onClick={handleViewClick}>
              View
            </Button>
            <Button size="small" onClick={handleEditClick}>Edit</Button>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Popover>

      {/* View Dialog */}
      {selectedEvent && showViewDialog && (
        <div className="custom-dialog-overlay" onClick={handleDialogClose}>
          <div className="custom-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close position-absolute top-0 end-0 m-3" onClick={handleDialogClose}></button>

            <div className="custom-dialog-body p-5 mt-4">
              <div className="d-flex justify-content-between align-items-start mb-2 gap-3 custom-border">
                <div>
                  <h3 className="fw-bold mb-1">{selectedEvent.title} With {selectedEvent.extendedProps.user}</h3>
                  <p>
                    {selectedEvent.start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })},
                    {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className="badge bg-secondary">{selectedEvent.extendedProps.status.toUpperCase()}</span>
              </div>

              <div className="d-flex align-items-center mb-3 custom-border">
                <img src={selectedEvent.extendedProps.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} alt="User" className="rounded-circle me-3" width="40" height="40" />
                <div>
                  <div className="fw-semibold">{selectedEvent.extendedProps.user}</div>
                  <div className="text-muted small">{selectedEvent.extendedProps.email}</div>
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
                {renderActionButtons(false)} {/* View mode - only Message button */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {selectedEvent && showEditDialog && (
        <div className="custom-dialog-overlay" onClick={handleDialogClose}>
          <div className="custom-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close position-absolute top-0 end-0 m-3" onClick={handleDialogClose}></button>

            <div className="custom-dialog-body p-5 mt-4">
              <div className="d-flex justify-content-between align-items-start mb-2 gap-3 custom-border">
                <div>
                  <h3 className="fw-bold mb-1">{selectedEvent.title} With {selectedEvent.extendedProps.user}</h3>
                  <p>
                    {selectedEvent.start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })},
                    {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className="badge bg-secondary">{selectedEvent.extendedProps.status.toUpperCase()}</span>
              </div>

              <div className="d-flex align-items-center mb-3 custom-border">
                <img src={selectedEvent.extendedProps.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} alt="User" className="rounded-circle me-3" width="40" height="40" />
                <div>
                  <div className="fw-semibold">{selectedEvent.extendedProps.user}</div>
                  <div className="text-muted small">{selectedEvent.extendedProps.email}</div>
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
                {renderActionButtons(true)} {/* Edit mode - all action buttons */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get event class based on status
function getEventClass(status) {
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

    case "completed":
      return {
        className: "text-white rounded-2 px-2 py-1 d-inline-flex align-items-center justify-content-between gap-1 w-100",
        style: { backgroundColor: "#009BFA" },
      };

    case "canceled":
      return {
        className: "text-white rounded-2 px-2 py-1 d-inline-flex align-items-center justify-content-between gap-1 w-100",
        style: { backgroundColor: "#DC3545" },
      };

    default:
      return {
        className: "text-dark rounded-2 px-2 py-1 w-100",
        style: { backgroundColor: "#f8f9fa" },
      };
  }
}