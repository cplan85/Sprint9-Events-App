import { AuthService } from './../../auth/services/auth.service';
import { User } from './../../auth/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {


 user: User = {
  uid: '',
  name: 'John Doe',
  email: 'jDoe@gmail.com',
  userName: 'Jdoe',
  events: [],
  maps: [],
 }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.user = this.authService._user;
    console.log(this.user, "My user")
  }

}
