import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

import { getCoachType, getSubCoachType } from "@/app/api/guest";

export default function CoachCategory({ value = [], onChange }) {
  const [coachTypes, setCoachTypes] = React.useState([]);
  const [subCoachTypes, setSubCoachTypes] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const types = await getCoachType();
      setCoachTypes(types);

      const subTypeMap = {};
      for (const type of types) {
        const subtypes = await getSubCoachType(type.id);
        subTypeMap[type.id] = subtypes;
      }
      setSubCoachTypes(subTypeMap);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value: selectedIds },
    } = event;
    onChange(selectedIds);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="grouped-multiselect-checkbox-label" sx={{m:0}}>
        Select Categories
      </InputLabel>
      <Select
        labelId="grouped-multiselect-checkbox-label"
        id="grouped-multiselect-checkbox"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Select Categories" />}
        renderValue={(selected) =>
          selected
            .map((id) => {
              for (const typeId in subCoachTypes) {
                const sub = subCoachTypes[typeId]?.find((s) => s.id === id);
                if (sub) return sub.subtype_name;
              }
              return id;
            })
            .join(", ")
        }
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
      >
        {coachTypes.flatMap((type) => [
          <ListSubheader key={`header-${type.id}`}>
            {type.type_name}
          </ListSubheader>,
          ...(subCoachTypes[type.id]?.map((sub) => (
            <MenuItem key={sub.id} value={sub.id}>
              <Checkbox checked={value.includes(sub.id)} />
              <ListItemText primary={sub.subtype_name} />
            </MenuItem>
          )) || []),
        ])}
      </Select>
    </FormControl>
  );
}
