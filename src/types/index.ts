export type Argument = {
    name: string;
    value: string;
    uuid: string
}

export type Operator = {
    uuid: string;
    operator: "AND" | "OR" | "XOR" | "";
}

export type Constant = {
    uuid: string;
    value: "false" | "true" | "";
}

export type Value = {
    objId: string;
    uuid: string;
    argument: boolean,
    not: boolean,
}

export type OperationJSON = {
    objId: string;
    operator: string;
    uuid?: string;
    //    values: OperationJSON[] | Value[]
    values: any[]
}