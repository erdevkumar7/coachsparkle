import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function CoachDeliveryMode({deliveryMode, value, onChange}) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        {deliveryMode.map((mode) => (
          <FormControlLabel
            key={mode.id}
            value={mode.id}
            control={<Radio />}
            label={mode.mode_name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
