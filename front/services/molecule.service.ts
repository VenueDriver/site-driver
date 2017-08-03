import { Injectable , OnInit } from '@angular/core';
import { Http, Response , RequestOptions , Headers } from '@angular/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs/Observable';
import { aloop as asyncLoop } from '../helpers/utils';

// INTERFACES
import { CellInterface , MoleculeInterface } from '../../definitions/interfaces';
import { Molecule } from '../../definitions/nodes/molecule';

@Injectable()

export class MoleculeService implements OnInit {

  constructor(private _server : ServerService ){
  }

  ngOnInit(){
    console.log("init molecule service");
  }

  validateCell(cell) {
    return new Promise((resolve,reject)=>{
      resolve(true);
    });
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
    console.log(Molecule);
    let newCell : CellInterface = {
      _name : '',
      _type : name,
      _path : [],
      _value : [],
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
        new Molecule({}).parse(data).then(resolve).catch(reject);
      },(error)=>{
        reject(error);
      })
    })
  }

  getCellList() : Promise<CellInterface[]> {
    return new Promise((resolve,reject)=>{
      this._server.get( "/cell/get/all" ).subscribe((data)=>{
        let i = 0;
        asyncLoop(
          ()=> i >= data.length,
          (next,end)=>{
            new Molecule({}).parse(data[i]).then((parsedResult)=>{
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

}
