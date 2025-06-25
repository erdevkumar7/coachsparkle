'use client';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function valuetext(value) {
    return `${value}°C`;
}

const MAX = 2000;
const MIN = 0;

export default function RangeSlider() {
    const [value, setValue] = useState([0, 2000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 250, p: 2 }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                min={MIN}
                max={MAX}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                valueLabelFormat={(val) => `$${val}`} // 👈 Add this
            />
        </Box>
    );
}