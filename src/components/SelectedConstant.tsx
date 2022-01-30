import React from "react";

// Material UI
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  value: string;
  onChange: (value: SelectChangeEvent<string>) => void;
}

export default function Constant(props: Props): JSX.Element {
  return (
    <div
      className="flex-column"
    >
      <FormControl 
        className="main-input"
      >
        <InputLabel>Type</InputLabel>
        <Select
          value={props?.value}
          onChange={props.onChange}
          label="Type"
        >
          <MenuItem value={'false'}>false</MenuItem>
          <MenuItem value={'true'}>true</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}