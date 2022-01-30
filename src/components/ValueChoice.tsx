import React from "react";

import SelectedConstant from './SelectedConstant'
import SelectedArgument from './SelectedArgument'

// Material UI
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


// Material Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Operation = any; 
type Props = {
  arguments: Operation;
  constants: Operation;
  type: string;
  uuid: string;
  objId: any;
  onChange: Operation,
  removeValue: (objId:string, type: string, uuid: string) => void;
  not: boolean;
  changeNot: (objId:string) => void;
  handleTypeChange: Operation;
}

export default function ValueChoice(props: Props): JSX.Element {
    return (
      <div
        className="flex-row"
      >
        <FormControlLabel 
          className="not-operator"
          control={<Switch />} 
          label="Not" 
          checked={props.not}
          onClick={()=>{props.changeNot(props.objId)}}
        />
        <FormControl 
          className="type-input"
        >
          <InputLabel>Type</InputLabel>
          <Select
            value={props.type}
            onChange={(event)=>{props.handleTypeChange(event?.target?.value, props.objId)}}
            label="Type"
          >
            <MenuItem value={'constant'}>constant</MenuItem>
            <MenuItem value={'argument'}>argument</MenuItem>
          </Select>
        </FormControl>
        { 
          props.type === 'constant'  && 
          <SelectedConstant
            value={props.constants.find((elem: { uuid: string })=>elem.uuid === props.uuid).value}
            onChange={(event)=>{props.onChange(event?.target?.value, props.uuid)}}
          />
        }
        { 
          props.type === 'argument' && 
          <SelectedArgument
            value={props.arguments.find((elem: { uuid: string })=>elem.uuid === props.uuid)}
            arguments={props.arguments}
            onChange={(uuid)=>{props.onChange(uuid, props.objId)}}
          />
        }
        <IconButton 
          className="icon-button"
          color="primary" 
          aria-label="remove argument" 
          onClick={()=>props.removeValue(props.objId, props.type, props.uuid)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    )
  }