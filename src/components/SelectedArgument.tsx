import React from "react";
import { Argument } from '../types'

// Material UI
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';


type Props = {
  value: any;
  arguments: Argument[];
  onChange: (value: string) => void;
}

export default function SelectedArgument (props: Props): JSX.Element {
  const [selectedUuid, setSelectedUuid] = React.useState<string>('');

  React.useEffect(() => {
    if(selectedUuid !== '') pushNewValueFromUuid(selectedUuid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.arguments]);

  function pushNewValueFromUuid(uuid:string):void {
    const index = props.arguments.findIndex(function(arg) {
      return arg.uuid === uuid
    });
    props.onChange(props.arguments[index].uuid)
  } 

  return (
    <div
      className="flex-column"
    >
      <Tooltip title={props.arguments.length === 0 ? 'Lack of named arguments disables this input' : ''}>
        <FormControl 
          className="main-input"
          disabled={props.arguments.length === 0}
        >
          <InputLabel>Argument</InputLabel>
          <Select
            value={props?.value?.uuid || ''}
            onChange={(event)=>{
              const uuid = event?.target?.value;
              setSelectedUuid(uuid);
              pushNewValueFromUuid(uuid);
            }}
            label="Argument"
          >
            {
              props.arguments.map((arg) => 
                <MenuItem 
                  value={arg.uuid}
                  key={`operation-argument-${arg.uuid}`}
                >
                  {arg.name}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>
      </Tooltip>
      
    </div>
  )
}