import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import { UserInfo } from "app/shared/user-info";
import {WundergroundService} from "app/shared/wunderground.service";
import {ReverseGeocoderService} from "app/shared/reverse-geocoder.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    userInfo: Observable<UserInfo>;
    isLoggedIn = new BehaviorSubject(false);

    // Start Position
    lat: number = 38.0992564;
    lng: number = -96.4897536;
    zoom: number = 4;
    locationChosen = false;

    // WUnderground API
    errorMessage: any;
    alerts: any;
    alertsArray: [];
    city: string;
    state: string;
    wuEndpoint: string = 'alerts/q/';

    // ReverseGeocoder API
    geocodeInfo: any;
    geoEndpoint: string = 'geolookup/q/';

    constructor(
        private authService: AuthService,
        private router: Router,
        private wuService: WundergroundService,
        private geocode: ReverseGeocoderService)
        {
            this.userInfo = authService.userInfo;
            this.userInfo
                .map(userInfo => !userInfo.isAnonymous)
                .subscribe(this.isLoggedIn);
        }

    navigateToLogin(e) {
        this.router.navigate(['/login']);
        e.preventDefault();
    }

    navigateToRegister(e) {
        this.router.navigate(['/register']);
        e.preventDefault();
    }

    onChoseLocation(event){
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
        this.locationChosen = true;
        this.zoom = 5;
        this.getGeocode();
        this.getAlerts();
    }

    getGeocode(){
        let endpoint = this.geoEndpoint + this.lat + ',' + this.lng
        this.wuService.getGeoLocation(endpoint)
        .subscribe(
            geocodeInfo => {
              this.geocodeInfo = geocodeInfo;
              this.state = this.geocodeInfo.location.state;
              this.city = this.geocodeInfo.location.city;
            },
            error =>  {
              this.errorMessage = <any>error;
              console.log(this.errorMessage)
            }
        );

    }

    getAlerts(){
        let endpoint = this.wuEndpoint + this.state + '/' +this.city
        console.log(endpoint)
        this.wuService.getAlerts(endpoint)
        .subscribe(
            alerts => {
              this.alerts = alerts;
              this.alertsArray = alerts.alerts;
              console.log(this.alertsArray);
            },
            error =>  {
              this.errorMessage = <any>error;
              console.log(this.errorMessage)
            }
        );
    }

}
