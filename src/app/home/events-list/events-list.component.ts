import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  showEvents: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleEvents() {
    this.showEvents = !this.showEvents;
  }

}
