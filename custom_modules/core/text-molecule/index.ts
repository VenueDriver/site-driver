import { TextMoleculeInterface } from './interface';
import { Molecule } from '@molecule-driver/molecule';

export class TextMolecule extends Molecule implements TextMoleculeInterface  {

  _value = '';

  constructor(data : any){
    super(data);
  }

}

module.exports = TextMolecule;
