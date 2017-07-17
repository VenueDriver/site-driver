import { SliderFieldComponent }  from '../front/components/slider/script';
import { Field }  from './field';


export class Slider extends Field {
  _child : Array<any>;
  _filter : Array<any>;

  constructor(opts : any, value : string = "") {
    super(opts._name,SliderFieldComponent,opts);
    this._child = (opts._child) ? opts._child : [];
    this._filter = opts._filter;
  }

}
