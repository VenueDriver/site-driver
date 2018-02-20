import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export declare class ServerService {
    private http;
    constructor(http: Http);
    request(verb: string, endpoint: string, data?: any, h?: Array<any>): Observable<any>;
    post(endpoint: string, data: any, headers: Array<any>): Observable<any>;
    get(endpoint: string): Observable<any>;
}
