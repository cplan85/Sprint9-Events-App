import { Router } from '@angular/router';
import { User } from './auth/interfaces/interfaces';
import { AuthService } from './auth/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;


 _user:  User ={ uid: '',
 name: '',
 userName: '',
 password: '',
 email: '',
 events: [],
}

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.authService.LoggedIn.subscribe((data) => {
      if(data) {this._user = this.authService.user }
      else {this._user = { uid: '',
      name: '',
      userName: '',
      password: '',
      email: ''
     }
      }


     })
  
  }

  logOutandCloseNav() {
    this.logout();
    this.sidenav.toggle()
  }

  logout() {

    this.router.navigateByUrl('/auth/login');
    this.authService.logout();

  }


  title = 'sprint-9-events-app';
}
