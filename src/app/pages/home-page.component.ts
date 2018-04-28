import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import { UserInfo } from "app/shared/user-info";

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

    constructor(private authService: AuthService, private router: Router) {
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
        this.zoom = 6;
    }
}
