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

        if(Array.isArray(parsedLayer._value)){

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



  toData(molecule : any){
    let moleculeCopy = Object.assign({},molecule);
    const deleteProp = (element,prop)=>{
      if(element.hasOwnProperty(prop)){
        delete element[prop];
      }
      return element;
    }
    const emptyProp = (element,prop)=>{
      if(element.hasOwnProperty(prop)){
        element[prop] = null;
      }
      return element;
    }

    const removeProperties = ['parser'];
    const emptyProperties = ['_ngComponent'];

    let cleanLayer = (data)=>{
      Object.keys(data).forEach((key)=>{
        if(typeof data[key] == 'function' || removeProperties.indexOf(key)>-1){
          data = deleteProp(data,key);
        };
        if(emptyProperties.indexOf(key)>-1){
          data = emptyProp(data,key);
        }
      });
      if(data.hasOwnProperty("_value")){
        if(Array.isArray(data._value)){
          let arrayCopy = data._value.map(el=>el);
          arrayCopy.forEach((value,i) => {
            arrayCopy[i] = this.toData(arrayCopy[i]);
          });
          data._value = arrayCopy;
        }
      }
      
      return data;
    }


    return cleanLayer(moleculeCopy);

  }
}
