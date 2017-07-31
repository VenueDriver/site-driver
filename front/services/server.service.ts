import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { aloop as asyncLoop } from '../helpers/utils';

@Injectable()

export class ServerService {

  constructor(private http : Http){

  }

  request(verb : string , endpoint : string , data : any , h : Array<any>) : Observable<any>{
    let formData = new FormData();
    formData.append("data",JSON.stringify(data));

    let headers = new Headers();
    h.forEach((head : any)=>{
      headers.append(head.name , head.value);
    });

    let options = new RequestOptions({ headers: headers });
    return this.http[verb]( endpoint , data , options).map(
      (res:Response) => res.json()
    );
  }

  // POST TO SERVER
  post(endpoint : string , data : any , headers : Array<any>) : Observable<any> {
    return this.request("post",endpoint,data,headers)
  }

  // GET FROM SERVER
  get(endpoint : string , data : any , headers : Array<any>) : Observable<any> {
    return this.request("get",endpoint,data,headers)
  }

}
