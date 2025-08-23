import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function CoachTrials({ value, onChange }) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="free-trial-session"
        name="free-trial-session"
        value={value > 0 ? "yes" : value === 0 ? "no" : "all"}
        onChange={(e) => {
          const selected = e.target.value;
          if (selected === "yes") {
            onChange(1);
          } else if (selected === "no") {
            onChange(0);
          } else {
            onChange(null);
          }
        }}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
}
