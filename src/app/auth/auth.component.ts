import { Component, Injectable, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  @Input() username: string;
  @Input() password: string;

  ngOnInit() {
  }

  constructor( private authService: AuthService){
  }

  login(): any{
    this.authService.lblogin(this.username,this.password);
    //location.reload();
  }

  logout(): any{
    this.authService.logout();
    location.reload();
  }

  isAuth(): boolean{
    return this.authService.isAuth()  ;
  }

}
