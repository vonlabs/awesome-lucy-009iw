import React from "react";
type Args = { [argname: string]: boolean };
type Operation = any; /* ...todo:
a system for defining logical operations 
(not, and, or... more if you want) that can be passed:
 - selected args by name: (X and Y)
 - constant values not dependent on args: (true and X)
 - other operations: ((X and Y) or Z) 
 */

function evaluateOperation(operation: Operation, args: Args): boolean {
  /* ...todo: implement an evaluator for your operations, 
  given some args */
}

function OperationBuilder(props: {
  value: Operation;
  onChange: (value: Operation) => void;
}): JSX.Element {
  /* ...todo: an ugly gui for creating operations */
}

export default function App() {
  return (
    <div>
      {/* todo: use <OperationBuilder> and have an interface
      for entering arguments and seeing the result */}
    </div>
  );
}