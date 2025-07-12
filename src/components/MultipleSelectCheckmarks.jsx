import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    disablePortal: true,
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelectCheckmarks({ value, onChange, options }) {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        onChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <FormControl
            sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: 'darkgray' },
                    '&.Mui-focused fieldset': { borderColor: 'gray' },
                },
            }}
        >
            <Select
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selectedIds) =>
                    selectedIds
                        .map((id) => options.find((lang) => lang.id === id)?.language)
                        .join(', ')
                }
                MenuProps={MenuProps}
            >
                {options.map((lang) => (
                    <MenuItem key={lang.id} value={lang.id}>
                        <Checkbox checked={value.includes(lang.id)} />
                        <ListItemText primary={lang.language} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
