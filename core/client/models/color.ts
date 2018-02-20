import { ColorFieldComponent }  from '../front/components/color/script';
import { Field }  from './field';

export class Color extends Field {
  _value : any;

  constructor(opts : any , value : number ){
    super(opts._name,ColorFieldComponent,opts);
    this._value = opts._value || "#cc0000";
  }
}
