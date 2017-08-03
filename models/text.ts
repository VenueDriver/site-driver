import { TextNodeComponent }  from '../front/components/text/script';
import { Field }  from './field';

export class Text extends Field {
  _value : string;
  _use_textarea : boolean;

  constructor(opts : any, value : string = "") {
    super(opts._name,TextNodeComponent,opts);
    this._value = opts._value || "";
    this._use_textarea = (opts.hasOwnProperty("_use_textarea")) ? opts._use_textarea : false;
  }

}
