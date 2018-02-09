import { TextMoleculeInterface } from './interface';
import Molecule = require('@molecule-driver/molecule');

class TextMolecule extends Molecule implements TextMoleculeInterface  {

  _type : string = "text";

  constructor(data : any){
    super(data);

    /* Value must be a string. */
    if(typeof this._value != 'string'){
      throw new Error("Expected '_value' to be of type 'string' for molecule " + JSON.stringify(this));
    }

  }

}

export = TextMolecule;
