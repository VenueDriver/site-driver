import { MoleculeParser } from '../../front/helpers/molecule-parser';

export class Molecule {

  _value : any;
  parser : MoleculeParser = new MoleculeParser();

  constructor(obj : any) {

    for(let key in obj){
      this[key] = obj[key];
    }

  }

  insert(obj : any){
    return new Promise((resolve,reject)=>{
      if(Array.isArray(this._value)){
        this.parser.toNg(obj).then((ngObj)=>{
          this._value.push(ngObj);
          resolve(this);
        }).catch(reject);
      }else{
        console.log("Target value is not an Array");
        reject("Target value is not an Array");
      }
    })
  }

}
