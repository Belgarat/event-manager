import {Router, CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private authService: AuthService){};

    canActivate(){
        //console.log("Auth",this.authService.isAuth());
        if (this.authService.isAuth() === false) {
            this.router.navigate(['/login']);
            return false;
        }else {
            return true;
        }
    }
}