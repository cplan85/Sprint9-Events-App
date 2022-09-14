import { User } from './auth/interfaces/interfaces';
import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


 _user!:  User;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.validateToken() ) {
      this._user = this.authService.user
    } 
  }


  title = 'sprint-9-events-app';
}
