import { Injectable , OnInit } from '@angular/core';
import { Http, Response , RequestOptions , Headers } from '@angular/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs/Observable';
import { aloop as asyncLoop } from '../helpers/utils';


@Injectable()

export class MoleculeService implements OnInit {

  constructor(private _server : ServerService){

  }

  ngOnInit(){
    console.log("init");
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

  getCell(name){

  }

  getCellList(){

  }

  validateCell(cell) {
    return new Promise((resolve,reject)=>{
      resolve(true);
    });
  }

}
