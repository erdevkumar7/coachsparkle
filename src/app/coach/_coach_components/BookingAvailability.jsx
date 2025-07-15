'use client';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; // theme css

import { format } from 'date-fns';

export default function BookingAvailabilityPicker({ formData, setFormData, isProUser }) {
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
            booking_availability: formatted,
        }));
        // ✅ Close the calendar after selection
        setShowPicker(false);

    };

    // console.log('range', range)
    return (
        <>
            <input
                type="text"
                id="booking_availability"
                name="booking_availability"
                readOnly
                value={formData.booking_availability}
                onClick={() => setShowPicker(!showPicker)}
                placeholder="Select Availablity"
                disabled={!isProUser}
                className={`form-control ${!isProUser ? "disabled-bg" : ""
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
        </>
    );
}
