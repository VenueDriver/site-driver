import { MoleculeParser } from '../../front/helpers/molecule-parser';
import { NodeInterface } from '../interfaces/Inode';

export class Molecule implements NodeInterface {

  // DEFAULT VALUES IMPLEMENTING THE INTERFACE
  _name : string = '';
  _id   : string = '';
  _instance_of : string = '';
  _type : string = "molecule";
  _label : string = "Molecule";
  _value : any = null;
  _path : Array<number> = [];
  _default_value : any = null;
  _can : any = {
    _be_required : false,
    _edit_value  : true,
    _edit    : false,
    _drag   : false,
    _delete  : false,
    _show    : true
  };

  parser : MoleculeParser;

  constructor(obj : any) {

    for(let key in obj){
      this[key] = obj[key];
    }

    this.parser = new MoleculeParser();

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
