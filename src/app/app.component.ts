import { Router } from '@angular/router';
import { User } from './auth/interfaces/interfaces';
import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


 _user:  User ={ uid: '',
 name: '',
 userName: '',
 password: '',
 email: ''
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

  logout() {

    this.router.navigateByUrl('/auth/login');
    this.authService.logout();

  }


  title = 'sprint-9-events-app';
}
