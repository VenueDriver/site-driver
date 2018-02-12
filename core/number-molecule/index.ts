import { NumberMoleculeInterface } from './interface';
import Molecule = require('@molecule-driver/molecule');

class NumberMolecule extends Molecule implements NumberMoleculeInterface  {

  _type : string = "number";

  constructor(data : any){
    super(data);

    /* Value must be a string. */
    if(typeof this._value != 'number'){
      throw new Error("Expected '_value' to be of type 'number' for molecule " + JSON.stringify(this));
    }

  }

}

export = NumberMolecule;
