"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../_styles/coach_calendar.css";
import { format, isWithinInterval, parseISO } from "date-fns";
import EastIcon from '@mui/icons-material/East';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CoachCalendar() {
  const router = useRouter();
  const token = Cookies.get('token');
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarData, setCalendarData] = useState({
    available: [],
    unavailable: [],
    booked: []
  });
  // console.log(calendarData)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch calendar data from API
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calendar-status-dashboard`, {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch calendar data');
        }

        const data = await response.json();
        
        if (data.success) {
          // Process the API response to match your component's expected format
          const processedData = processApiData(data.availability);
          setCalendarData(processedData);
        } else {
          throw new Error(data.message || 'Failed to fetch calendar data');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching calendar data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  // Process API data to convert date ranges to individual dates
  const processApiData = (apiData) => {
    const availableDates = [];
    const unavailableDates = [...apiData.unavailable];
    const bookedDates = Object.keys(apiData.booked || {});

    // Convert available date ranges to individual dates
    if (apiData.available && Array.isArray(apiData.available)) {
      apiData.available.forEach(range => {
        if (Array.isArray(range) && range.length === 2) {
          const startDate = parseISO(range[0]);
          const endDate = parseISO(range[1]);
          
          let currentDate = new Date(startDate);
          
          while (currentDate <= endDate) {
            const dateStr = format(currentDate, "yyyy-MM-dd");
            availableDates.push(dateStr);
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      });
    }

    // Add booked dates from the booked object
    // Note: The API response already has booked dates as keys in the booked object
    // so we're using Object.keys() to get them

    return {
      available: availableDates,
      unavailable: unavailableDates,
      booked: bookedDates
    };
  };

  const getDayClassName = (date) => {
    if (loading) return "day-loading";
    if (error) return "day-error";

    const dateStr = format(date, "yyyy-MM-dd");
    const { available, unavailable, booked } = calendarData;

    if (unavailable.includes(dateStr)) return "day-red";
    if (booked.includes(dateStr)) return "day-blue";
    if (available.includes(dateStr)) return "day-green";
    return "";
  };

  if (loading) {
    return (
      <div className="calendarDiv">
        <div className="calendar-container">
          <h3 className="text-lg font-semibold mb-4 quick-text">
            Master Calendar
          </h3>
          <div className="loading-calendar">Loading calendar...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="calendarDiv">
        <div className="calendar-container">
          <h3 className="text-lg font-semibold mb-4 quick-text">
            Master Calendar
          </h3>
          <div className="error-calendar">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="calendarDiv">
      <div className="calendar-container">
        <h3 className="text-lg font-semibold mb-4 quick-text">
          Master Calendar
        </h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          dayClassName={(date) => getDayClassName(date)}
          calendarClassName="custom-calendar"
        />

        <div className="manage" onClick={() => router.push('/coach/booking')}>
          <button className="manage-buttons">
            Manage Calendar <EastIcon className="mui-icons" />
          </button>
        </div>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="color-circle green"></span> Available
        </div>
        <div className="legend-item">
          <span className="color-circle red"></span> Unavailable
        </div>
        <div className="legend-item">
          <span className="color-circle blue"></span> Booked Sessions
        </div>
      </div>
    </div>
  );
}