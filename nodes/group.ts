import { GroupComponent }  from '../front/components/group/script';
import { Field }  from './field';

export class Group extends Field {
  _child : Array<any>;
  _columns : number;

  constructor(opts : any , _child : Array<any> = []){
    super(opts._name,GroupComponent,opts);
    this._child = (opts._child) ? opts._child : [];
    this._columns = opts._columns || 12;
  }
}
