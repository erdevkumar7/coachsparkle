import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

export default function CoachCategory() {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="grouped-multiselect-checkbox-label">Select Options</InputLabel>
      <Select
        labelId="grouped-multiselect-checkbox-label"
        id="grouped-multiselect-checkbox"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput label="Select Options" />}
        renderValue={(selected) => selected.join(', ')}
      >
        <ListSubheader>Career & Professional Coaches</ListSubheader>
        <MenuItem value="Career Coach">
          <Checkbox checked={selectedOptions.includes('Career Coach')} />
          <ListItemText primary="Career Coach" />
        </MenuItem>
        <MenuItem value="Executive Coach">
          <Checkbox checked={selectedOptions.includes('Executive Coach')} />
          <ListItemText primary="Executive Coach" />
        </MenuItem>
        <MenuItem value="Business Coach">
          <Checkbox checked={selectedOptions.includes('Business Coach')} />
          <ListItemText primary="Business Coach" />
        </MenuItem>
        <MenuItem value="Interview Coach">
          <Checkbox checked={selectedOptions.includes('Interview Coach')} />
          <ListItemText primary="Interview Coach" />
        </MenuItem>
        <MenuItem value="Resume/LinkedIn Coach">
          <Checkbox checked={selectedOptions.includes('Resume/LinkedIn Coach')} />
          <ListItemText primary="Resume/LinkedIn Coach" />
        </MenuItem>
        <MenuItem value="Public Speaking Coach">
          <Checkbox checked={selectedOptions.includes('Public Speaking Coach')} />
          <ListItemText primary="Public Speaking Coach" />
        </MenuItem>
        <MenuItem value="Sales Coach">
          <Checkbox checked={selectedOptions.includes('Sales Coach')} />
          <ListItemText primary="Sales Coach" />
        </MenuItem>

        <ListSubheader>Personal Development & Life Coaches</ListSubheader>
        <MenuItem value="Life Coach">
          <Checkbox checked={selectedOptions.includes('Life Coach')} />
          <ListItemText primary="Life Coach" />
        </MenuItem>
        <MenuItem value="Confidence Coach">
          <Checkbox checked={selectedOptions.includes('Confidence Coach')} />
          <ListItemText primary="Confidence Coach" />
        </MenuItem>
        <MenuItem value="Mindset Coach">
          <Checkbox checked={selectedOptions.includes('Mindset Coach')} />
          <ListItemText primary="Mindset Coach" />
        </MenuItem>
        <MenuItem value="Motivational Coach">
          <Checkbox checked={selectedOptions.includes('Motivational Coach')} />
          <ListItemText primary="Motivational Coach" />
        </MenuItem>
        <MenuItem value="Productivity Coach">
          <Checkbox checked={selectedOptions.includes('Productivity Coach')} />
          <ListItemText primary="Productivity Coach" />
        </MenuItem>
        <MenuItem value="Creativity Coach">
          <Checkbox checked={selectedOptions.includes('Creativity Coach')} />
          <ListItemText primary="Creativity Coach" />
        </MenuItem>
      </Select>
    </FormControl>
  );
}
