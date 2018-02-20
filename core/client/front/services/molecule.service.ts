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

  index : any = {};

  parser : any;
  cache : any = {};

  constructor(private _server : ServerService ){
    this.parser = new MoleculeParser();
  }

  ngOnInit(){
    // console.log("init molecule service");
  }

  validateMolecule(molecule) {
    return new Promise((resolve,reject)=>{
      resolve(true);
    });
  }

  saveMolecule(query){
    return new Promise((resolve,reject)=>{
      let queryID = new Date().getTime();
      this.cache[queryID] = {query : query , action : "save"};
      query = this.cache[queryID].query;
      this.cache[queryID].id = queryID;
      query.data = this.parser.toData(query.data);
      this.validateMolecule(query.data).then(()=>{
        this._server.post( `/molecule/save` , query, [] ).subscribe((data)=>{
          this.cache[queryID].data = data;
          // this.updateResults().then(()=>{
            resolve(this.cache[queryID]);
          // }).catch(reject);
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
        type : [molecule._type],
        name : [molecule._name],
        id : molecule._id,
        data : molecule
      };
      let queryID = new Date().getTime();
      this.cache[queryID] = {query : query , action : "remove"};
      query = this.cache[queryID].query;
      this.cache[queryID].id = queryID;
      this._server.post( `/molecule/remove`, query, [] ).subscribe((data)=>{
        this.cache[queryID].data = data;
        // this.updateResults().then(()=>{
          resolve(this.cache[queryID]);
        // }).catch(reject);
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
      let queryID = JSON.stringify(query);
      if(!this.index.hasOwnProperty(queryID)){
        this.index[queryID] = {
          query : Object.assign({},query) ,
          id : queryID
        };
      }
      if(this.index[queryID].data){
        resolve(this.index[queryID].data.slice())
      }else{
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
                this.index[queryID].data = data;
                // console.log("Get, resolved");
                resolve(this.index[queryID].data.slice());
              }
            }
          );
        },(error)=>{
          reject(error);
        })
      }
    });
  }

  getAllMolecules(){
    return new Promise<any>((resolve,reject)=>{
      this.getMoleculeList({type : ['cell','generator']}).catch(reject).then((data)=>{
        let fullList = data.map(cell => cell);
        for(var key in nodes){
          fullList.push(new nodes[key]({}));
        }
        resolve(fullList);
      });
    })
  }

  // updateResults(){
  //   return new Promise((resolve,reject)=>{
  //     let cacheIDS = Object.keys(this.cache);
  //     let i = 0;
  //     asyncLoop(
  //       ()=> i >= cacheIDS.length,
  //       (next,end)=>{
  //         let cache = this.cache[cacheIDS[i]];
  //         if(cache.action === "get"){
  //           console.log("Update cache",i,"/",cacheIDS.length-1);
  //           this.getMoleculeList(cache.query).catch(reject).then(()=>{
  //             i++;next();
  //           });
  //         }else{
  //           i++;
  //           next();
  //         }
  //       },
  //       ()=>{
  //         console.log("update results end");
  //         resolve();
  //       }
  //     );
  //   });
  // }

}
