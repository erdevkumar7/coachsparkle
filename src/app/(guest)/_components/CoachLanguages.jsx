import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

// const names = [
//     'English',
//     'German',
//     'Arabic',
//     'Hindi',
//     'French',
//     'Spanish',
//     'Italian',
// ];

export default function CoachLanguages({allLanguages, onChange}) {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

         const selected = typeof value === 'string' ? value.split(',') : value;
         setPersonName(selected);

         const selectedIds = allLanguages.filter(lang => selected.includes(lang.language)).map(lang => lang.id);

         onChange(selectedIds);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>

                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}

                    renderValue={(selected) => {
                                                if (selected.length === 0) {
                            return <span>Enter your languages</span>;
                        }
                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                >
                    {allLanguages.map((lang) => (
                        <MenuItem key={lang.id} value={lang.language}>
                            <Checkbox checked={personName.includes(lang.language)} />
                            <ListItemText primary={lang.language} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
