import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { TextNodeComponent } from '../../front/components/text/script'; // IMPORT NG COMPONENT
import { TextInterface } from './../interfaces'; // IMPORT INTERFACE


export class TextNode extends Molecule {

  // THIS CLASS NAME
  _ngClass : string = "TextNode";
  _ngComponent = TextNodeComponent;
  _type : string = "Node";


  constructor(obj : TextInterface) {

    super(obj);

  }

}
