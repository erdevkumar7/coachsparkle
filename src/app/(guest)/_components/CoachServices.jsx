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
//     'Leadership',
//     'Career Growth',
//     'Startup',
//     'Career',
//     'Interview',
//     'Strategy',
//     'UX Design',
// ];

export default function CoachServices({services, onChange}) {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
       const selected = typeof value === 'string' ? value.split(',') : value;
         setPersonName(selected);

         const selectedIds = services.filter(service => selected.includes(service.service)).map(service => service.id);

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
                            return <span>Enter your services</span>;
                        }
                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                >
                    {services.map((service) => (
                        <MenuItem key={service.id} value={service.service}>
                            <Checkbox checked={personName.includes(service.service)} />
                            <ListItemText primary={service.service} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
