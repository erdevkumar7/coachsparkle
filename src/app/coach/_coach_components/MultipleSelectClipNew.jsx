import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id, selectedIds, theme) {
  return {
    fontWeight: selectedIds.includes(id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChipNew({ value, onChange, options }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{
      m: 1,
      width: 300,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'gray',
        },
        '&:hover fieldset': {
          borderColor: 'darkgray',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'gray',
        },
      },
    }}>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((id) => {
              const lang = options.find((lang) => lang.id === id);
              return <Chip key={id} label={lang?.language || id} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((lang) => (
          <MenuItem
            key={lang.id}
            value={lang.id}
            style={getStyles(lang.id, value, theme)}
          >
            {lang.language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
