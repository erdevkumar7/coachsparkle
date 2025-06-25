import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function CoachDeliveryMode() {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel value="online" control={<Radio />} label="Online" />
        <FormControlLabel value="in-person" control={<Radio />} label="In-Person" />
        <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
      </RadioGroup>
    </FormControl>
  );
}
