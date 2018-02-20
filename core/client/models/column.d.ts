import { Field } from './field';
export declare class Column extends Field {
    _child: Array<any>;
    _value: number;
    constructor(opts: any, child?: Array<any>);
}
