import { Injectable , OnInit } from '@angular/core';
import { Http, Response , RequestOptions , Headers } from '@angular/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs/Observable';
import { aloop as asyncLoop } from '../helpers/utils';

// INTERFACES
import { CellInterface , MoleculeInterface } from '../../definitions/interfaces';
import * as nodes from '../../definitions/nodes';
import { MoleculeParser } from '../helpers/molecule-parser';


@Injectable()

export class MoleculeService implements OnInit {

  parser : any;

  constructor(private _server : ServerService ){
    this.parser = new MoleculeParser();
  }

  ngOnInit(){
    console.log("init molecule service");
  }

  validateMolecule(type,molecule) {
    return new Promise((resolve,reject)=>{
      resolve(true);
    });
  }

  saveMolecule(type,molecule){
    return new Promise((resolve,reject)=>{
      molecule = this.parser.toData(molecule);
      this.validateMolecule(type,molecule).then(()=>{
        this._server.post( `/${type}/save` , molecule, [] ).subscribe((data)=>{
          resolve(data);
        },
        (error)=>{
          console.log("Observable error",error);
        })
      });
    })
  }

  createMolecule(type,name : string){
    let newCell : CellInterface = {
      _name : '' ,
      _type : name.toLowerCase(),
      _label : name,
      _path : [] ,
      _value : [] ,
      _ngClass : 'Cell',
      _can :{
        _be_required : false,
        _edit_value : false,
        _edit : false,
        _show : true,
        _dragg : false,
        _delete : false
      }
    };
    return newCell;
  }

  removeMolecule(type,molecule : any){
    return new Promise((resolve,reject)=>{
      this._server.post( `/${type}/remove`, molecule, [] ).subscribe((data)=>{
        resolve(data);
      },
      (error)=>{
        console.log("Observable error",error);
      })
    });
  }

  getMolecule(type,name){
    return new Promise((resolve,reject)=>{
      this._server.get( `/${type}/get/${name}` ).subscribe((data)=>{
        this.parser.toNg(data).then(resolve).catch(reject);
      },(error)=>{
        reject(error);
      })
    })
  }

  getMoleculeList(type) {
    return new Promise<any>((resolve,reject)=>{
      this._server.get( `/${type}/get/all` ).subscribe((data)=>{
        let i = 0;
        asyncLoop(
          ()=> i >= data.length,
          (next,end)=>{
            this.parser.toNg(data[i]).then((parsedResult)=>{
              data[i] = parsedResult;
              i++;
              next();
            }).catch((error)=> end(error));
          },
          (err)=>{
            if(err){
              reject(err);
            }else{
              resolve(data);
            }
          }
        );
      },(error)=>{
        reject(error);
      })
    });
  }

  getAllMolecules(){
    return new Promise((resolve,reject)=>{
      this.getMoleculeList('cell').catch(reject).then((cells)=>{
        let fullList = cells.map(cell => cell);
        for(var key in nodes){
          if(["Cell"].indexOf(key)==-1){
            fullList.push(new nodes[key]({}));
          }
        }
        resolve(fullList);
      });
    })
  }

}
