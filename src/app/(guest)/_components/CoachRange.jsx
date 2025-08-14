'use client';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function valuetext(value) {
    return `${value}°C`;
}

const MAX = 2000;
const MIN = 0;

export default function RangeSlider({ value, onChange }) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

    return (
        <Box sx={{ width: 250, p: 2 }}>
      <Slider
        value={value}
        min={MIN}
        max={MAX}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaLabel={() => 'Price range'}
        valueLabelFormat={(val) => `$${val}`}
      />
        </Box>
    );
}