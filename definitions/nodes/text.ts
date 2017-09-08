import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { TextNodeComponent } from '../../front/components/text/script'; // IMPORT NG COMPONENT
import { TextInterface } from './../interfaces'; // IMPORT INTERFACE


export class TextNode extends Molecule implements TextInterface{

  // THIS CLASS NAME
  _ngClass : string = "TextNode";
  _type : string = "text";
  _label : string = "Text";
  _ngComponent = TextNodeComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : string = '';
  _default_value : string;
  _options : any = {
    _use_textarea : false,
    _additional_css_classes : ''
  };


  constructor(obj : TextInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
