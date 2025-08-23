import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export default function SingleActiveRating({ value, onChange }) {
  const [activeIndex, setActiveIndex] = React.useState(value || null);

  const handleClick = (count) => {
    setActiveIndex(count);
    if (onChange) onChange(count);
  };

  return (
    <Box>
      {[1, 2, 3, 4, 5].map((count) => (
        <Box
          textAlign="left"
          key={count}
          mb={1}
          sx={{ cursor: "pointer" }}
          onClick={() => handleClick(count)}
        >
          <Rating
            readOnly
            value={count}
            max={count}
            sx={{ fontSize: 35 }}
            style={{ color: activeIndex === count ? "#faaf00" : "#e0e0e0" }}
          />
        </Box>
      ))}
    </Box>
  );
}
