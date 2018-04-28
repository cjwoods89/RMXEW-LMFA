import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class WundergroundService {

    private baseUrl: string = 'http://api.wunderground.com/api/';
    private publicKey: string = '9ee1b04b6d831b5b/';

  constructor(private http: Http) { }

    getAlerts(endpoint:string): Observable<any[]> {
        let apiUrl = `${this.baseUrl}${this.publicKey}${endpoint}.json`;
        console.log(apiUrl);
        return this.http.get(apiUrl)
          .map(this.extractData)   // "maps" the success- show the results
          .catch(this.handleError);
    }

    getGeoLocation(endpoint:string): Observable<any[]> {
        let apiUrl = `${this.baseUrl}${this.publicKey}${endpoint}.json`;
        console.log(apiUrl);
        return this.http.get(apiUrl)
          .map(this.extractData)   // "maps" the success- show the results
          .catch(this.handleError);
    }

    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if(error.status === 0){
                errMsg = "Error connecting to API"
            }else{
                const errorJSON = error.json();
                errMsg = `${errorJSON.code} - ${errorJSON.message}`;
            }
        }

        return Observable.throw(errMsg);
    }

}
