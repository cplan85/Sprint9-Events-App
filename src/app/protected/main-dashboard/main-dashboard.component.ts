import { User } from './../../auth/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {


 user: any = {
  name: 'John Doe',
  email: 'jDoe@gmail.com',
  userName: 'Jdoe',
  events: [],
  maps: [],
  friends: [],
 }

  constructor() { }

  ngOnInit(): void {
  }

}
