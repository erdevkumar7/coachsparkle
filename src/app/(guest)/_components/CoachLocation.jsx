import * as React from 'react';
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
//     'Singapore',
//     'Alaska',
//     'Egypt',
//     'France',
//     'New York',
//     'Spain',
//     'Italy',
//     'India',
//     'Nigeria',
//     'Portugal',
// ];

export default function MultipleSelectCheckmarks({countries, onChange}) {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const selected = typeof value === 'string' ? value.split(',') : value;
         setPersonName(selected);

         const selectedIds = countries.filter(country => selected.includes(country.country_name)).map(country => country.country_id);

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
                            return <span>Enter your location</span>;
                        }
                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                >
                    {countries.map((country) => (
                        <MenuItem key={country.country_id} value={country.country_name}>
                            <Checkbox checked={personName.includes(country.country_name)} />
                            <ListItemText primary={country.country_name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
