import { ListFieldComponent }  from '../front/components/list/script';
import { Field }  from './field';

export class List extends Field {
  _child : Array<any>;
  _useComponents : Array<any>;

  constructor(opts : any , child : Array<any> = []){
    super(opts._name,ListFieldComponent,opts);
    this._child = (opts._child) ? opts._child : [];
    this._useComponents = opts._useComponents;
  }
}
