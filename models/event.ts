import { EventFieldComponent }  from '../front/components/event/script';
import { Field }  from './field';

export class Event extends Field {
  _value : any;
  _filter : any;

  constructor(opts : any ){
    super(opts._name,EventFieldComponent,opts);
    this._filter = opts._filter;
  }
}
