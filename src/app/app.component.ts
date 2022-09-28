import { Router } from '@angular/router';
import { User } from './auth/interfaces/interfaces';
import { AuthService } from './auth/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

counter: number = 0;

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

    this.authService.addedEventSubject.subscribe((data) => {
      console.log(data, "observed data")
     this.counter = this.counter + 1;
    })

    this.authService.myEventsSubject.subscribe((data) => {
     if (this.counter > 0) this.counter = this.counter - 1;
    })

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
         //console.log(event.url)
         this.counter = 0;
      }
   })


    
    this.authService.validateToken().subscribe(data => {
  
    if(data) {this._user = this.authService.user }
    else {this._user = { uid: '',
    name: '',
    userName: '',
    password: '',
    email: ''
   }
    }
  
  })
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
