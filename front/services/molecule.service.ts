import { Injectable , OnInit } from '@angular/core';
import { Http, Response , RequestOptions , Headers } from '@angular/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs/Observable';
import { aloop as asyncLoop } from '../helpers/utils';

// INTERFACES
import { CellInterface } from '../../models/interfaces';
import * as nodes from '../../models/nodes';

@Injectable()

export class MoleculeService implements OnInit {

  constructor(private _server : ServerService){

  }

  ngOnInit(){
    console.log("init molecule service");
  }

  saveCell(cell){
    return new Promise((resolve,reject)=>{
      this.validateCell(cell).then(()=>{
        this._server.post( "/cell/save", cell, [] ).subscribe((data)=>{
          resolve(data);
        },
        (error)=>{
          console.log("Observable error",error);
        })
      });
    })
  }

  createCell(name : string){
    let newCell : CellInterface = {
      _name : '',
      _type : name,
      _path : [],
      _value : [],
      _ngComponentName : 'CellComponent',
      _can :{
        _edit_value : false,
        _edit : false,
        _show : true,
        _dragg : false,
        _delete : false
      }
    };
    return newCell;
  }

  removeCell(cell : CellInterface){
    return new Promise((resolve,reject)=>{
      this._server.post( "/cell/remove", cell, [] ).subscribe((data)=>{
        resolve(data);
      },
      (error)=>{
        console.log("Observable error",error);
      })
    });
  }

  getCell(name){
    return new Promise((resolve,reject)=>{
      this._server.get( "/cell/get/"+name ).subscribe((data)=>{
        resolve(data);
      },(error)=>{
        reject(error);
      })
    })
  }

  getCellList() : Promise<CellInterface[]> {
    return new Promise((resolve,reject)=>{
      this._server.get( "/cell/get/all" ).subscribe((data)=>{
        resolve(data);
      },(error)=>{
        reject(error);
      })
    });
  }

  appendComponent(molecule : any){
    return new Promise((resolve,reject)=>{
      if(nodes.hasOwnProperty(molecule._ngComponentName)){
        molecule._ngComponent = nodes[molecule._ngComponentName];
        resolve(molecule);
      }else{
        reject(false);
      }
    });
  }

  validateCell(cell) {
    return new Promise((resolve,reject)=>{
      resolve(true);
    });
  }

}
