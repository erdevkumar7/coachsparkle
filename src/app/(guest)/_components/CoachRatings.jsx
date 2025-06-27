import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

export default function SingleActiveRating() {
  const [activeRating, setActiveRating] = React.useState({ index: null, value: 0 });

  const handleChange = (index, value) => {
    setActiveRating({ index, value });
  };

  return (
    <Box>
      {[1, 2, 3, 4, 5].map((maxValue, idx) => (
        <Box textAlign="left" key={idx} mb={0}>
          <Rating
            name={`rating-${idx}`}
            max={maxValue}
            value={activeRating.index === idx ? activeRating.value : 0}
            onChange={(event, newValue) => handleChange(idx, newValue)}
            sx={{ fontSize: 50 }}
          />
        </Box>
      ))}
    </Box>
  );
}
