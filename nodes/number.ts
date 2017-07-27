import { NumberFieldComponent }  from '../front/components/number/script';
import { Field }  from './field';

export class cmsNumber extends Field {
  _value : number;

  constructor(opts : any , value : number ){
    super(opts._name,NumberFieldComponent,opts);
    this._value = 0;
  }
}
