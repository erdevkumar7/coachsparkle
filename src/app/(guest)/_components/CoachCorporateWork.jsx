import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function CoachCorporateWork({ value, onChange }) {
  return (
<FormControl>
      <RadioGroup
        aria-labelledby="is_corporate"
        name="is_corporate"
        value={value === 1 ? "yes" : value === 0 ? "no" : "all"}
        onChange={(e) => {
          const selected = e.target.value;
          if (selected === "yes") {
            onChange(1);
          } else if (selected === "no") {
            onChange(0);
          } else {
            onChange(null);
          }
        }}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
}
