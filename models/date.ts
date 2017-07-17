import { DateFieldComponent }  from '../front/components/date/script';
import { Field }  from './field';

export class cmsDate extends Field {
  _value : any;

  constructor(opts : any ){
    super(opts._name,DateFieldComponent,opts);
    this._value = opts._value || (new Date()).getTime();
  }
}
