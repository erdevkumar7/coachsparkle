'use client';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { format } from 'date-fns';

export default function BookingWindowPicker({ formData, setFormData, isProUser }) {
    const [showPicker, setShowPicker] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const handleRangeChange = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setRange([ranges.selection]);

        const formatted = `${format(startDate, 'yyyy-MM-dd')} - ${format(endDate, 'yyyy-MM-dd')}`;
        setFormData((prev) => ({
            ...prev,
            booking_window: formatted,
        }));
        // ✅ Close the calendar after selection
        setShowPicker(false);

    };

    // console.log('range', range)
    return (
        <div className="form-group col-md-4">
            <label htmlFor="booking_window">Booking Window &nbsp;<InfoOutlinedIcon sx={{ color: '#40C0E7', fontSize: 20}}/></label>
            <input
                type="text"
                id="booking_window"
                name="booking_window"
                readOnly
                value={formData.booking_window}
                onClick={() => setShowPicker(!showPicker)}
                placeholder="Select Date Range"
                                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
            />
            {showPicker && (
                <div className="calendar-container" style={{ zIndex: 9999, position: 'absolute' }}>
                    <DateRange
                        ranges={range}
                        onChange={handleRangeChange}
                        moveRangeOnFirstSelection={false}
                        editableDateInputs={true}
                        minDate={new Date()}
                    />
                </div>
            )}
        </div>
    );
}
