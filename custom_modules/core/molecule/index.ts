import { MoleculeInterface } from './interface';

export class Molecule implements MoleculeInterface {

  _name : string = '';
  _id   : string = '';
  _type : string = 'molecule';
  _value : any = null;

  constructor(data : any){
    const readOnly = ['_type'];

    for(let key in data){
      if( readOnly.indexOf(key) == -1 ) this[key] = data[key];
    }
  }

}

module.exports = Molecule
