import { ColumnComponent }  from '../front/components/col/script';
import { Field }  from './field';

export class Column extends Field {
  _child : Array<any>;
  _value : number;

  constructor(opts : any , child : Array<any> = []){
    super(opts._name || "",ColumnComponent,opts);
    this._child = child;
    this._value = opts._value;
  }
}
