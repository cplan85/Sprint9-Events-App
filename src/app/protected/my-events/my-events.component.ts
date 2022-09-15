import { AppEvent } from './../../home/interfaces/appEvents';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  

  myEvents: AppEvent[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.user.events? this.myEvents = this.authService.user.events : null
  }

}
