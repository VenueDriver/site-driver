import { FileFieldComponent }  from '../front/components/file-field/script';
import { Field }  from './field';

export class FileField extends Field {
  _value : string;

  constructor(opts : any , _child : Array<any> = []){
    super(opts._name,FileFieldComponent,opts);
    this._value = opts._value || '';
  }
}
