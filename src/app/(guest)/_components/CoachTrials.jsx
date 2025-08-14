import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function CoachTrials({ value, onChange }) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="free-trial-session"
        name="free-trial-session"
        value={value ?? ""}
        onChange={(e) => {
          const selected = e.target.value;
          if (selected === "yes") {
            onChange(1);
          } else if (selected === "no") {
            onChange(null);
          }
        }}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
}

