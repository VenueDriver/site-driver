import { LinkFieldComponent }  from '../front/components/link-field/script';
import { Field }  from './field';


export class Link extends Field {
  _value : any;
  _use_textarea : boolean;

  constructor(opts : any, value : string = "") {
    super(opts._name,LinkFieldComponent,opts);
    this._value = opts._value || { label : "" , url : ""};
  }

}
