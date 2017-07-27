export class Field {
  _name : string;
  _typeComponent : any;
  _type : string;
  _required : boolean;
  _path : Array<number>;
  _editable_value : boolean;
  _editable_field : boolean;
  _delete_field   : boolean;
  _visible_field  : boolean;
  constructor(name : string , type : any , opts : any = {}){
    this._name = name || "";
    this._typeComponent = type;
    this._type = opts._type;
    this._path = [];
    this._required = opts._required;
    this._editable_value = opts._editable_value;
    this._editable_field = opts._editable_field;
    this._delete_field = opts._delete_field;
    this._visible_field = opts._visible_field;
  }
}
