import { NumberNodeComponent }  from '../front/components/number/script';
import { Field }  from './field';

export class cmsNumber extends Field {
  _value : number;

  constructor(opts : any , value : number ){
    super(opts._name,NumberNodeComponent,opts);
    this._value = 0;
  }
}
