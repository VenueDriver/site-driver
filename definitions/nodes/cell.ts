import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { CellComponent } from '../../front/components/cell/script'; // IMPORT NG COMPONENT
import { CellInterface } from './../interfaces'; // IMPORT INTERFACE
import { NodeInterface } from '../interfaces/Inode';


export class Cell extends Molecule implements CellInterface {

  // THIS CLASS NAME
  _ngClass : string = "Cell";
  _type : string = "cell";
  _label : string = "Cell";
  _name : string = "Cell";
  _ngComponent = CellComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : (CellInterface|NodeInterface)[] ;
  _default_value : (CellInterface|NodeInterface)[] ;

  _options : any = {
    _convert_array_to_keys : false,
    _additional_css_classes : ''
  };

  constructor(obj : CellInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

    if(!Array.isArray(this._value)){
      this._value = [];
    }

    if(obj._name){
      this._label = obj._name;
      this._name = obj._name;
    }

  }

}
