import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { BooleanNodeComponent } from '../../front/components/boolean/script'; // IMPORT NG COMPONENT
import { BooleanInterface } from './../interfaces'; // IMPORT INTERFACE


export class BooleanNode extends Molecule implements BooleanInterface{

  // THIS CLASS NAME
  _ngClass : string = "BooleanNode";
  _type : string = "boolean";
  _label : string = "Boolean";
  _ngComponent = BooleanNodeComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : boolean = false;
  _instance_of : string = '';
  _default_value : boolean = false;
  _options : any = {
    _additional_css_classes : ''
  };


  constructor(obj : BooleanInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
