import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { NumberNodeComponent } from '../../front/components/number/script'; // IMPORT NG COMPONENT
import { NumberInterface } from './../interfaces'; // IMPORT INTERFACE


export class NumberNode extends Molecule implements NumberInterface{

  // THIS CLASS NAME
  _ngClass : string = "NumberNode";
  _type : string = "number";
  _label : string = "Number";
  _ngComponent = NumberNodeComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : number ;
  _instance_of : string = '';
  _default_value : number;
  _options : any = {
    _additional_css_classes : ''
  };


  constructor(obj : NumberInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
