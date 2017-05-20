import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Event } from '../models/event.model'

@Injectable()
export class EventsService {
    public serviceName: string = "events";
    urlRoot: string = "http://5.249.154.109:3001/api/";

    constructor(private http: Http){
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    getEvent(id: number): Observable<any>{
      id = id;
      let urlQuery = '/'+id;
      return this.http.get(this.urlRoot+this.serviceName+urlQuery, {headers: this.getHeaders()})
                        .map((res:Response) => res.json())
    }

    findAll(): Observable<any>{
      return this.http.get(this.urlRoot+this.serviceName, {headers: this.getHeaders()})
                        .map((res:Response) => res.json())
    }
}
