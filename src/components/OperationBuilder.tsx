import React from "react";
import { v4 as uuidv4 } from 'uuid';
import {OperationJSON, Operator, Constant, Argument } from '../types'

// Components
import ValueChoice from './ValueChoice'
import OperatorChoice from './OperatorChoice'

// Functions
import evaluateOperation from '../functions/evaluateOperation'

// Material UI
import Button from '@mui/material/Button';

// Material Icons
import AddIcon from '@mui/icons-material/Add';

type Props = {
  arguments: Argument[];
}

const data: OperationJSON = {
  operator: "0",
  objId: uuidv4(),
  values: [
    { uuid: 'b62f88f7-f47a-4f95-9458-be9c78ba5ce6', argument: true, objId: uuidv4(), not: false },
    {
      operator: "1",
      objId: uuidv4(),
      values: [
        { uuid: '93c0b0ec-a8bd-4ac8-9970-d9e32f3d32f9', argument: true, objId: uuidv4(), not: false },
        { uuid: '0', argument: false, objId: uuidv4(), not: false },
        {
          operator: "2",
          objId: uuidv4(),
          values: [
            { uuid: '1', argument: false, objId: uuidv4(), not: false },
            { uuid: '93c0b0ec-a8bd-4ac8-9970-d9e32f3d32f9', argument: true, objId: uuidv4(), not: false },
            { uuid: '2', argument: false, objId: uuidv4(), not: false },
            { uuid: '07c82525-c5c0-4bf1-b490-6ddabfbd92f5', argument: true, objId: uuidv4(), not: false },
            {
              operator: "3",
              objId: uuidv4(),
              values: [
                { uuid: '3', argument: false, objId: uuidv4(), not: false }
              ],
            }
          ],
        },
      ],
    },
  ],
};

const operaotrsDev: Operator[] = [
  {uuid: "0", operator: "AND"},
  {uuid: "1", operator: "OR"},
  {uuid: "2", operator: "AND"},
  {uuid: "3", operator: "OR"},
  {uuid: "4", operator: "OR"}
];

const constantsDev: Constant[] = [
  {uuid: "0", value: "false"},
  {uuid: "1", value: "false"},
  {uuid: "2", value: "true"},
  {uuid: "3", value: "true"}
];

export default function OperationBuilder(props: Props): JSX.Element {
  const [operators, setOperators] = React.useState<any[]>(operaotrsDev);  //dev testing
  const [constants, setConstants] = React.useState<any[]>(constantsDev);  //dev testing
  const [json, setJson] = React.useState<any>(data);  //dev testing

  
  function addOperator(objId?:string):void {
    const newObjId = uuidv4();
    const newOperatorId = uuidv4();
    const newNestedJson = {
      operator: newOperatorId,
      objId: newObjId,
      values: []
    }

    function deepAddOperator (json: OperationJSON, objId?: string) {
      if(json.objId === objId){
        json.values.push(newNestedJson)
      } else {
        json.values[json.values.length-1] = deepAddOperator(json.values[json.values.length-1], objId);
      }
      return json;
    }

    if(!json.operator){
      setOperators([
        {uuid: newOperatorId, operator: "AND"}
      ]);
      setJson(newNestedJson)
      return;
    }

    setOperators([...operators,
      {uuid: newOperatorId, operator: "AND"}
    ]);
    let temp = Object.assign({}, json, {})
    temp = deepAddOperator(temp, objId);
    console.log('result deepAddOperator', temp)
    setJson(temp);

  } 

  function changeOperator(newOperator:string, uuid:string):void {
    console.log('changeOperator', newOperator, uuid)
    const temp = [...operators];
    const index = temp.findIndex(function(arg) {
      return arg.uuid === uuid
    });
    temp[index] = {uuid, operator: newOperator};
    setOperators(temp);
  } 

  function removeOperator(objId:string):void {
    function deepRemoveOperator(json:OperationJSON,objId:string){
      if (json.values[json.values.length-1].operator && json.values[json.values.length-1].objId === objId) {
        json.values.pop();
      } else {
        json.values[json.values.length-1] = deepRemoveOperator(json.values[json.values.length-1], objId);
      }
      return json
    }

    if (json.operator && json.objId === objId) {
      setJson({});
      setOperators([]);
      setConstants([]);
    } else {
      let temp = Object.assign({}, json, {})
      temp = deepRemoveOperator(temp, objId)
      setJson(temp);
    }
  } 

  function addValue(objId:string):void {
    const newUuid = uuidv4();
    const newElem = { uuid: newUuid, argument: false, objId: uuidv4(), not: false };
    setConstants([...constants,  {uuid: newUuid, value: "false"}])

    function deepAddValue(json:OperationJSON, objId:string){
      if(json.objId === objId) {
        if(json.values.length === 0) {
          json.values = [newElem];
        } else {
          for(let i = 0; i < json.values.length; i++){
          if(json.values[i+1] && json.values[i+1].operator) {
              json.values= [
                ...json.values.slice(0, i+1),
                newElem,
                ...json.values.slice(i+1)
              ]
              break;
            } else if (!json.values[i+1] && json.values[i].operator) {
              json.values= [
                newElem,
                ...json.values
              ]
              break;
            } else if (!json.values[i+1]) {
              json.values= [
                ...json.values,
                newElem
              ]
              break;
            }
          }
        }
      } else if (json.values) {
        for(let i = 0; i < json.values.length; i++){
          json.values[i] = deepAddValue(json.values[i], objId);
        }
      }
      return json
    }

    let temp = Object.assign({}, json, {})
    temp = deepAddValue(temp, objId)
    setJson(temp);
  } 

  function removeValue(objId:string, type: string, uuid: string):void {
    
    function deepRemoveValue(json:OperationJSON, objId:string){
      let index = -1;
      if (json.values){
        index = json.values.findIndex( (item: { objId: string; }) => item.objId === objId);
        if(index !== -1){
          json.values = json.values.filter( (item: { objId: string; }) => item.objId !== objId);
        } else {
          json.values[json.values.length-1] = deepRemoveValue(json.values[json.values.length-1], objId);
        }
      }
      return json
    }

    let temp = Object.assign({}, json, {})
    temp = deepRemoveValue(temp, objId)
    setJson(temp);

    if (type === 'constant'){
      removeConstant(uuid);
    }
  } 

  function changeConstant(newConstant:string, uuid:string):void {
    console.log('changeConstant', newConstant, uuid)
    const temp = [...constants];
    const index = temp.findIndex(function(elem) {
      return elem.uuid === uuid
    });
    temp[index] = {uuid, value: newConstant};
    setConstants(temp);
  } 

  function removeConstant(uuid:string):void {
    let temp = [...constants];
    temp = temp.filter(function(elem) {
      return elem.uuid !== uuid
    });
    setConstants(temp);
  } 

  function changeArgument(newVal:string, objId:string):void {
    console.log('changeArgument', newVal, objId);

    function deepChangeArgument(json:OperationJSON, objId:string, newVal:string){
      if (typeof(json) === 'string') return json
      if(json.objId === objId) json.uuid = newVal;
      else if (json.values) {
        for(let i = 0; i < json.values.length; i++){
          json.values[i] = deepChangeArgument(json.values[i], objId, newVal);
        }
      }
      return json
    }

    let temp = Object.assign({}, json, {})
    temp = deepChangeArgument(temp, objId, newVal)

    setJson(temp);
  } 

  function changeType(newVal:string, objId:string):void {
    function deepChangeType(json:any, objId:string, newVal:string, argument: boolean){
      if(json.objId === objId) {
        json.uuid = newVal;
        json.argument = argument;
      }
      else if (json.values) {
        for(let i = 0; i < json.values.length; i++){
          json.values[i] = deepChangeType(json.values[i], objId, newVal, argument);
        }
      }
      return json
    }

    function deepGetConstantUuid(json:OperationJSON, objId:string):string{
      for(let i = 0; i < json.values.length; i++){
        if(json.values[i].objId === objId){
          return json.values[i].uuid;
        }
      }
      return deepGetConstantUuid(json.values[json.values.length-1], objId);
    }

    let temp = Object.assign({}, json, {})
    if (newVal === 'constant') {
      let newUuid = uuidv4();
      setConstants([...constants,  {uuid: newUuid, value: "false"}])
      temp = deepChangeType(temp, objId, newUuid, false)
      setJson(temp);
    } else {
      let constantUuidToRemove = deepGetConstantUuid(temp, objId);
      removeConstant(constantUuidToRemove);
      temp = deepChangeType(temp, objId, '', true)
    }
    setJson(temp);
  } 

  function changeNot(objId:string):void {
    function deepChangeNot(json:any, objId:string){
      if(json.objId === objId) json.not = !json.not;
      else if (json.values) {
        for(let i = 0; i < json.values.length; i++){
          json.values[i] = deepChangeNot(json.values[i], objId);
        }
      }
      return json
    }

    let temp = Object.assign({}, json, {})
    temp = deepChangeNot(temp, objId)

    setJson(temp);
  } 


  const makeDom = (json: OperationJSON): string | any => {
    let dom = []

    if(json.values){
      const parentObjId = (json as OperationJSON).objId;

      dom.push([<div className="q1" key={`q1-${parentObjId}`}>(</div>])
      dom.push(
        <div className="q2" key={`q2-${parentObjId}`} >
          <OperatorChoice
            operatorUuid={(json as OperationJSON).operator}
            objId={parentObjId}
            operators={operators}
            onChange={changeOperator}
            removeOperator={removeOperator}
          />
        </div>
      )
      if(json?.values.length === 0 || (json?.values?.length === 1 && json.values[0]?.operator) ){
        dom.push(
          <div className="q9" key={`add-value-${parentObjId}`}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={()=>{addValue(parentObjId)}}
            >
              value
            </Button>
          </div>
        )
        dom.push(
          <div className="q9" key={`add-operator-${parentObjId}`}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={()=>{addOperator(parentObjId)}}
            >
              operator
            </Button>
          </div>
        )
      }
      for (let i = 0; i < json.values.length; i++){
        const item: any = json.values[i];
        if (Object.keys(item).includes('argument')){
          dom.push(<div className="q10" key={`div-${item.objId}`}>
            <ValueChoice
              arguments={props.arguments}
              constants={constants}
              type={item.argument ? 'argument' : 'constant'}
              uuid={item.uuid}
              objId={item.objId}
              key={`val-${item.objId}`}
              onChange={item.argument ? changeArgument : changeConstant}
              removeValue={removeValue}
              not={item.not}
              changeNot={changeNot}
              handleTypeChange={changeType}
            />
          </div>
          )
          if( (!json.values[json.values.length-1].operator && i >= json.values.length-1) || 
              ( json.values[json.values.length-1].operator && i >= json.values.length-2) ) {
            dom.push(
              <div className="q9" key={`add-value-${parentObjId}`}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={()=>{addValue(parentObjId)}}
                >
                  value
                </Button>
              </div>
            )
          }
          if( !json.values[json.values.length-1].operator && i >= json.values.length-1 ) {
            dom.push(
              <div className="q9" key={`add-operator-${parentObjId}`}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={()=>{addOperator(parentObjId)}}
                >
                  operator
                </Button>
              </div>
            )
          }
        } else if (Object.keys(item).includes('operator')) {
          dom.push(<div className="q4" key={`q4-${parentObjId}`}>{makeDom(item)}</div>)
        }
      } 
      dom.push(<div className="q7" key={`q7-${parentObjId}`}>)</div>)
    }

    return dom;
  };

  const stringifier = (json: any | OperationJSON | string | boolean): string => {
    const operator = operators.find((elem: { uuid: string })=>elem.uuid === (json as OperationJSON).operator)?.operator;
    let value = Object.keys(json).includes('argument') && json.argument ? 
      props.arguments.find((elem: { uuid: string })=>elem.uuid === (json as any).uuid)?.value || '...'
      :
      constants.find((elem: { uuid: string })=>elem.uuid === (json as any).uuid)?.value;

    if (json.not) value = `NOT(${value})`;

    if (!(json as any).operator) return value;
    return `(${(json as OperationJSON).values.map(item => typeof item === 'object' ? stringifier(item) : String(item)).join(` ${operator} `)})`;
  };


  return (
    <div
      className="operation-builder flex-column"
    >
      {
        !json.operator &&
        <div>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={()=>{addOperator()}}
          >
            operator
          </Button>
        </div>
      }

      <div>
        { makeDom(json) }
      </div>
      <div>
        { stringifier(json) }
      </div>
      <div>
      <strong>Eval: </strong> { ''+evaluateOperation(stringifier(json)) }
      </div>
    </div>
  )
}
