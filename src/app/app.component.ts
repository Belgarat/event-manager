import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Users } from './models/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  user: Users;
  public admin: boolean = false;

  constructor(private authService: AuthService){

  }

  ngOnInit() {
      this.user = this.authService.get();
      if(this.user){
        this.admin = true;
      }
  }
  

}
