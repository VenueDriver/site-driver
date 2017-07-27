import { ImageFieldComponent }  from '../front/components/image-field/script';
import { Field }  from './field';

export class ImageField extends Field {
  _value : string;

  constructor(opts : any , _child : Array<any> = []){
    super(opts._name,ImageFieldComponent,opts);
    this._value = opts._value || '';
  }
}
