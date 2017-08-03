// IMPORT NG COMPONENT
import { TextNodeComponent } from '../../front/components/text/script';
// IMPORT INTERFACE
import { TextInterface } from './../interfaces';


export class TextNode {

  // THIS CLASS NAME
  _ngClass : string = "TextNode";
  _ngComponent : TextNodeComponent;
  _type : string = "Node";


  constructor(obj : TextInterface) {

    // TRANSFER PROPERTIES FROM THE INTERFACE TO THE CLASS
    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
