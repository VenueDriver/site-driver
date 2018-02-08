import { TextMoleculeInterface } from './interface';
import * as Molecule from '@molecule-driver/molecule';

export class TextMolecule extends Molecule implements TextMoleculeInterface  {

  _type : string = "text";

  constructor(data : any){
    super(data);

    /* Value must be a string. */
    if(typeof this._value != 'string'){
      throw new Error("Expected '_value' to be of type 'string'. Value was reverted to '' for molecule ", this);
    }

  }

}

module.exports = TextMolecule;
