import * as nodes from '../nodes';
import { aloop as asyncLoop } from '../../front/helpers/utils';

export class Molecule {

  _value : any;

  constructor(obj : any) {

    for(let key in obj){
      this[key] = obj[key];
    }

  }


  parse(obj = this){
    return new Promise((resolve,reject)=>{
      resolve(true);
      // this.dataToNg(obj).catch(reject).then((parsed)=>{
      //   obj = parsed;
      //   resolve(obj);
      // })
    });
  }


  insert(obj : any){
    return new Promise((resolve,reject)=>{
      if(Array.isArray(this._value)){
        this._value.push(obj);
        this.parse().then(resolve).catch(reject);
      }else{
        console.log("Target value is not an Array");
        reject("Target value is not an Array");
      }
    })
  }


  _parseDataLayer(molecule : any) {
    return new Promise<any>((resolve,reject)=>{
      if(nodes.hasOwnProperty(molecule._ngClass)){
        let parsedMolecule  = new nodes[molecule._ngClass](molecule);
        resolve(parsedMolecule);
      }else{
        reject("No class for "+molecule._ngClass);
      }
    });
  }


  dataToNg(molecule : any) {
    return new Promise<any>((resolve,reject)=>{
      molecule = Object.assign({},molecule);
      this._parseDataLayer(molecule).then((parsedLayer)=>{

        if(Array.isArray(parsedLayer._value)){

          let i = 0;
          asyncLoop(
            ()=> i >= parsedLayer._value.length,

            (next,end)=>{
              let currentLayer = parsedLayer._value[i];
              this.dataToNg(currentLayer).then((subLayer)=>{
                parsedLayer._value[i] = subLayer;
                i++;
                next();
              }).catch((error)=> end(error))
            },

            (error)=>{
              if(error){
                // CHANGE ERROR FOR AN ERROR COMPONENT
                // SO THIS WILL NOT BLOCK THE FLOW
                reject(error);
              }else{
                resolve(parsedLayer);
              }
            }
          );
        }else{
          resolve(parsedLayer);
        }

      }).catch(reject);
    })
  }



}
