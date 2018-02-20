import { RowComponent }  from '../front/components/row/script';
import { Field }  from './field';

export class Row extends Field {
  _child : Array<any>;

  constructor(opts : any , child : Array<any> = []){
    super(opts._name || "",RowComponent,opts);
    this._child = child;
  }
}
