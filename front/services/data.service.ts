import { Injectable , OnInit } from '@angular/core';
import { Http, Response , RequestOptions , Headers } from '@angular/http';
import { DragulaService } from 'ng2-dragula';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';
import {
  Group,
  Text,
  Column,
  Link,
  Row,
  cmsNumber,
  cmsDate,
  Color,
  Artist,
  Venue,
  List,
  ImageField,
  FileField,
  Slide,
  Slider,
  Event
} from '../../models/models';

const asyncLoop = (condition,work,end)=>{
  if ( condition() ){ end() }else{ work(()=>asyncLoop(condition,work,end),end)}
}


const types = {
  "Artist"  : Artist,
  "Color"   : Color,
  //"Column"  : Column,
  "Date"    : cmsDate,
  "Event"   : Event,
  "File"    : FileField,
  "Group"   : Group,
  "Image"   : ImageField,
  "Link"    : Link,
  "List"    : List,
  "Number"  : cmsNumber,
  //"row"   : Row,
  "Slide"   : Slide,
  "Slider"  : Slider,
  "Text"    : Text,
  "Venue"   : Venue
};

@Injectable()

export class DataService implements OnInit {

  current : any;
  availableTypes : any;
  sites : any;

  constructor(private http : Http,private dragulaService: DragulaService){
    this.availableTypes = Object.keys(types);
    this.sites = [];
    dragulaService.drop.subscribe((value) => {
      this.calculatePaths();
    });
  }

  ngOnInit(){
    this.getSitesList();
  }

  // POST TO SERVER
  postToServer(action : string , data : any , h : Array<any>){
    let headers = new Headers();
    h.forEach((head : any)=>{
      headers.append(head.name , head.value);
    })

    let options = new RequestOptions({ headers: headers });
    return this.http.post(action , data , options)
    .map((res:Response) => res.json());
  }


  userRole(){
    return new Promise((resolve,reject)=>{
      this.postToServer(
        "/user/role",
        {},
        [
          {name : "Content-Type", value : "multipart/form-data" }
        ]
      ).subscribe(data =>{
        resolve(data);
      });
    })
  }

  // SAVE DATA FOR AN ITEM
  save(data : any = this.current , next = (data) => null ){
    if(data=== null) data = this.current;
    this.parseFileFields(Object.assign({},data)).then((data)=>{
      let formData = new FormData();
      (<any>data)._child = JSON.stringify((<any>data)._child);
      Object.keys(data).forEach(key=>{
        formData.append(key,data[key]);
      });
      this.postToServer(
        "/site/save",
        formData,
        [
          //{name : "Content-Type", value : "multipart/form-data" }
        ]
      ).subscribe(data =>{
        console.log("site saved",data);
        next(data);
      });
    });
  }

  // NEW SITE
  newSite(data,next){
    this.save(data,next);
  }

  uploadFile(data,domain){
    return new Promise((resolve,reject)=>{
      let formData = new FormData();
      formData.append("_file",data._file);
      formData.append("_folder",domain);
      this.postToServer(
        "/upload/file",
        formData,
        [
          //{name : "Content-Type", value : "multipart/form-data" }
        ]
      ).subscribe(url =>{
        console.log("File uploaded",url);
        resolve(url);
      });
    });
  }

  parseFileFields(data,domain = false){
    if(!domain){ domain = data._domain }
    return new Promise((resolve,reject)=>{
      asyncLoop(
        ()=> false,

        (next,end)=>{

          let upload = (next)=>{
            this.uploadFile(data,domain).then((url)=>{
              console.log("Uploading file...");
              delete data._file;
              if(data.hasOwnProperty("_icon")){
                data._icon = (<any>url).url;
              }else{
                data._value = (<any>url).url;
              }
              next();
            });
          }

          let parseChild = (next)=>{
            if(data.hasOwnProperty("_child")){
              if(data._child.length > 0){
                let i = 0;

                asyncLoop(
                  ()=> i >= data._child.length,
                  (next,end)=>{
                    this.parseFileFields(data._child[i],domain).then(()=>{
                      i++;
                      next();
                    });
                  },
                  next
                );

              }else{
                next();
              }
            }else{
              next();
            }
          }

          if(data.hasOwnProperty("_file")){
            upload(()=>{
              parseChild(end);
            });
          }else{
            parseChild(end);
          }

        },

        ()=> resolve(data)
      );
    });
  }



  newField(data){
    if(!data.hasOwnProperty("_type")){
      data._type = data._typeComponent;
    }else{
      data._typeComponent = data._type;
    }
    return new types[data._typeComponent](data);
  }

  find( path , ref : any = this.current){
    if(path.length > 0){
      return this.find(path.filter((val,i) => i>0 ),ref._child[path[0]]);
    }else{
      return ref;
    }
  }

  // LOAD DATA FOR AN ITEM
  get(itemType,itemID){
    return new Promise((resolve,reject)=>{
      this.getSitesList().then((sites)=>{
        resolve((<any>sites).find((item)=> item._domain === itemID));
      });
    });
  }

  // SELECT ITEM
  select(itemType,itemID){
    return new Promise((resolve,reject)=>{
      this.get(itemType,itemID).then((site)=>{
        this.current = site;
        this.calculatePaths();
        resolve(this.current);
      })
    })
  }

  // UNSELECT ITEM
  unselect(){
    this.current = {_child : []};
  }

  // GET SELECTED ITEM
  selected(){
    return this.current;
  }

  getSitesList(){
    return new Promise(
      (resolve,reject)=>{
        let headers = new Headers();
        headers.append('Content-Type' , 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.get(`/site/list`)
        .map( (res:Response) =>res.json() )
        .subscribe((data) => {
            this.sites = data;
            this.parseTypes();
            resolve(this.sites);
        });
      }
    );
  }


  parseTypes(){
    let localParse = (elements)=>{
      for(let site of elements){
        if(site.hasOwnProperty('_child')){
          if(site._child.length > 0){
            localParse(site._child);
          }
        }
        site._typeComponent = this.newField(site)._typeComponent;
      }
    }
    this.sites.forEach((site)=>{
      localParse(site._child);
    });

  }


  // BIND DATA
  post(path : Array<number>,newData:any){
    path = path.map((el)=> el);
    let position = (path.length>0) ? this.find(path) : this.current;
    let newElement = this.newField(newData);
    position._child.push(newElement);
    this.calculatePaths();
  }

  // BIND DATA
  update(path : Array<number>,newData:any){
    path = path.map((el)=> el);
    let position = (path.length>0) ? this.find(path) : this.current;
    let newElement = this.newField(newData);
    for(let key of Object.keys(newElement)){
      position[key] = newElement[key];
    }
    this.calculatePaths();
  }

  findParent(path){
    return (path.length > 0) ? this.find(path) : this.current;
  }

  destroy(path){
    console.log(path);
    path = path.map((el)=>el);
    let i = path[path.length-1];
    path.pop();
    let element = this.find(path);
    element._child.splice(i,1);
    this.calculatePaths();
    console.log(this.selected());
  }

  calculatePaths(path : Array<number> = [],ref : any = this.current){
    if(ref.hasOwnProperty("_child")){
      ref._child.forEach((val,i)=>{
        let newPath = path.map((el)=>el);
        newPath.push(i);
        ref._child[i]._path = newPath;
          this.calculatePaths(newPath,val);
      });
    }
  }

}
