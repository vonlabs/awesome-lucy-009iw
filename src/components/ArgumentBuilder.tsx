import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Argument } from '../types'

// Material UI
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


// Material Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


type Operation = any; 
type Props = {
  value: Argument[];
  onChange: (value: Operation) => void;
}

function basicArgument ():Argument {
  return ({
    name: '',
    value: 'false',
    uuid: uuidv4()
  })
}

function basicArgumentDev ():Argument[] {
  return ([
      {
          "name": "A",
          "value": "false",
          "uuid": "b62f88f7-f47a-4f95-9458-be9c78ba5ce6"
      },
      {
          "name": "B",
          "value": "true",
          "uuid": "93c0b0ec-a8bd-4ac8-9970-d9e32f3d32f9"
      },
      {
          "name": "C",
          "value": "false",
          "uuid": "07c82525-c5c0-4bf1-b490-6ddabfbd92f5"
      },
      {
          "name": "D",
          "value": "true",
          "uuid": "bc29c452-ed42-4fea-831e-3bd88cf3fd51"
      },
      {
        "name": "E",
        "value": "true",
        "uuid": "bc29c452-ed42-4fea-831e-3bd88cf3fd52"
      }
  ])
}

export default function ArgumentBuilder(props: Props): JSX.Element {
    // const [args, setArguments] = React.useState<Argument[]>([basicArgument()]);
    const [args, setArguments] = React.useState<Argument[]>(basicArgumentDev);  //dev testing

    React.useEffect(() => {
      props.onChange(args);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[args]);

    function handleArgumentChange(event: SelectChangeEvent<string>, index: number):void{
      const temp = [...args]
      temp[index] = {name: args[index].name, value: event?.target?.value, uuid: args[index].uuid }
      setArguments(temp)
    };

    function handleNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number):void{
      const temp = [...args]
      temp[index] = {name: event?.target?.value, value: args[index].value, uuid: args[index].uuid }
      setArguments(temp)
    };

    function addArguemnt():void{
      setArguments([...args, basicArgument()])
    };

    function removeArguemnt(removeIndex: number):void{
      const filtered = args.filter(function(value, index){ 
        return index !== removeIndex;
      });
      setArguments(filtered)
    };

    return (
      <div
        className="argument-builder flex-column"
      >
        {
            args.map((arg, index) => 
              <div
                className="flex-row"
                key={`argument-${arg.uuid}`}
                id={`argument-${arg.uuid}`}
              >
                <TextField 
                  label="Argument Name"
                  className="main-input"
                  variant="outlined" 
                  value={arg.name}
                  onChange={(event)=>handleNameChange(event, index)}
                />
                <FormControl>
                  <InputLabel>Argument</InputLabel>
                  <Select
                    className="bool-select"
                    value={arg.value}
                    onChange={(event)=>handleArgumentChange(event, index)}
                    label="Argument"
                  >
                    <MenuItem value={'false'}>false</MenuItem>
                    <MenuItem value={'true'}>true</MenuItem>
                  </Select>
                </FormControl>
                <IconButton 
                  className="icon-button"
                  color="primary" 
                  aria-label="remove argument" 
                  onClick={()=>removeArguemnt(index)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            )
        }

        <div
          className="flex-row"
        >
          <Button 
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addArguemnt}
          >
            argument
          </Button>
        </div>
      </div>
    )
  }