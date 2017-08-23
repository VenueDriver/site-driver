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

  validateMolecule(molecule) {
    return new Promise((resolve,reject)=>{
      resolve(true);
    });
  }

  saveMolecule(query){
    return new Promise((resolve,reject)=>{
      query.data = this.parser.toData(query.data);
      this.validateMolecule(query.data).then(()=>{
        this._server.post( `/molecule/save` , query, [] ).subscribe((data)=>{
          resolve(data);
        },
        (error)=>{
          console.log("Observable error",error);
        })
      });
    })
  }

  removeMolecule(molecule : any){
    return new Promise((resolve,reject)=>{
      let query = {
        type : molecule._type,
        name : molecule._name,
        id : molecule._id
      };
      this._server.post( `/molecule/remove`, query, [] ).subscribe((data)=>{
        resolve(data);
      },
      (error)=>{
        console.log("Observable error",error);
      })
    });
  }

  getMoleculeList(query) {
    return new Promise<any>((resolve,reject)=>{
      if(typeof query === "string"){
        query = {
          type : [query]
        }
      }
      this._server.post( `/molecule/get` , query , [] ).subscribe((data)=>{
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
    return new Promise<any>((resolve,reject)=>{
      this.getMoleculeList({type : 'cell'}).catch(reject).then((cells)=>{
        let fullList = cells.map(cell => cell);
        for(var key in nodes){
          fullList.push(new nodes[key]({}));
        }
        resolve(fullList);
      });
    })
  }

}
