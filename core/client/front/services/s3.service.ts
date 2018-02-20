import { Injectable , OnInit } from '@angular/core';
import { Http, Response , RequestOptions , Headers } from '@angular/http';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';

const asyncLoop = (condition,work,end)=>{
  if ( condition() ){ end() }else{ work(()=>asyncLoop(condition,work,end),end)}
}


@Injectable()

export class S3Service implements OnInit {

  constructor(private http : Http ){

  }

  ngOnInit(){

  }

  _connect(url : string , data : any , h : Array<any>){
    let headers = new Headers();
    h.forEach((head : any)=>{
      headers.append(head.name , head.value);
    })

    let options = new RequestOptions({ headers: headers });
    return this.http.post(url , data , options)
    .map((res:Response) => res.json());
  }

  // LIST FILES AND FOLDERS
  folder(path){
    return new Promise((resolve,reject)=>{
      this._connect(
        "/media/s3/list",
        { path },
        [
          {name : "Content-Type", value : "application/json" }
        ]
      ).subscribe(data =>{
        resolve(data);
      });
    })
  }

  // CREATE FOLDER
  // ADD FILES
  create(path,file : any = false){
    return new Promise((resolve,reject)=>{
      let url = "/media/s3/add/folder";
      let headers = [];
      let data : any = {path};
      if(file){
        url = "/media/s3/add/file";
        (<any>data)._file = file;
        (<any>data)._folder = path;
        let formData = new FormData();
        Object.keys(data).forEach(key=>{
          formData.append(key,data[key]);
        });
        data = formData;
      }else{

        headers.push({name : "Content-Type", value : "application/json" });
      }
      this._connect(
        url,
        data,
        headers
      ).subscribe(data =>{
        resolve(data);
      });
    })
  }

  // DELETE FILES
  delete(path){
    return new Promise((resolve,reject)=>{
      this._connect(
        "/media/s3/remove",
        { path },
        [
          {name : "Content-Type", value : "application/json" }
        ]
      ).subscribe(data =>{
        resolve(data);
      });
    })
  }


}
