import React from "react";
import ArgumentBuilder from './components/ArgumentBuilder'
import OperationBuilder from './components/OperationBuilder'
import { Argument } from './types'

import './styles.css';


/* ...todo:
a system for defining logical operations 
(not, and, or... more if you want) that can be passed:
 - selected args by name: (X and Y)
 - constant values not dependent on args: (true and X)
 - other operations: ((X and Y) or Z) 
 */


/*
todo: use <OperationBuilder> and have an interface
for entering arguments and seeing the result
*/

export default function App() {
  const [args, setArguments] = React.useState<Argument[]>([]);

  function onChangeArg (value: Argument[]): void {
    setArguments(value);
  }

  return (
    <div 
      className="app-container"
    >
      <ArgumentBuilder 
        value={args} 
        onChange={onChangeArg}
      />
      <OperationBuilder 
        arguments={args.filter(function(arg){ 
          return arg.name !== '';
        })} 
      />
    </div>
  );
}