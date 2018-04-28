import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ReverseGeocoderService {

    private baseUrl: string = 'http://nominatim.openstreetmap.org/reverse?format=json';
    private latEntry: string ='&lat=';
    private lngEntry: string = '&lon=';
    private endUrl: string = '&zoom=18&addressdetails=1'

  constructor(private http: Http) { }

    getCityState(lat:string, lng:string): Observable<any[]> {
        let apiUrl = `${this.baseUrl}${this.latEntry}${lat}${this.lngEntry}${lng}${this.endUrl}`;
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
