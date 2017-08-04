import * as nodes from '../../definitions/nodes';
import { aloop as asyncLoop } from './utils';

export class MoleculeParser{


  constructor(){}

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


  toNg(molecule : any) {
    return new Promise<any>((resolve,reject)=>{
      molecule = Object.assign({},molecule);
      this._parseDataLayer(molecule).then((parsedLayer)=>{

        if(typeof parsedLayer._value === 'object'){

          let i = 0;
          asyncLoop(
            ()=> i >= parsedLayer._value.length,

            (next,end)=>{
              let currentLayer = parsedLayer._value[i];
              this.toNg(currentLayer).then((subLayer)=>{
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
