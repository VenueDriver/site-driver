import { MoleculeInterface } from './interface';

export class Molecule implements MoleculeInterface {

  _name : string = '';
  _id   : string = '';
  _type : string = '';
  _value : any = null;

  constructor(data : any){
    for(let key in data){
      this[key] = data[key];
    }
  }

}
