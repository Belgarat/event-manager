import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService){};

    canActivate(){
        //console.log("Auth",this.authService.isAuth());
        return this.authService.isAuth();
    }
}