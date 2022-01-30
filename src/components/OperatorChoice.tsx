import React from "react";
import { Operator } from '../types/'

// Material UI
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// Material Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Operation = any; 
type Props = {
  operatorUuid: string;
  operators: Operator[];
  objId: string;
  onChange: (value: Operation, uuid: string) => void;
  removeOperator: (uuid: string) => void;
}

export default function OperatorChoice(props: Props): JSX.Element {
    const operator = props.operators.find(elem=>elem.uuid === props.operatorUuid)?.operator;
    return (
      <div>
        <FormControl 
          className="operator-choice"
        >
          <InputLabel>Operator</InputLabel>
          <Select
            value={operator}
            onChange={(event)=>{props.onChange(event?.target?.value, props.operatorUuid)}}
            label="Operator"
          >
            <MenuItem value={'AND'}>AND</MenuItem>
            <MenuItem value={'OR'}>OR</MenuItem>
            <MenuItem value={'XOR'}>XOR</MenuItem>
          </Select>
        </FormControl>
        <IconButton 
          className="icon-button"
          color="primary" 
          aria-label="remove operator" 
          onClick={()=>props.removeOperator(props.objId)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    )
  }