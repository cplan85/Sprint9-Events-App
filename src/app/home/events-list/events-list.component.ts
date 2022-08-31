import { AppEvent } from './../interfaces/appEvents';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  showEvents: boolean = false;

  @Input() mapEvents!: AppEvent[];

  constructor() { }

  ngOnInit(): void {
  }

  toggleEvents() {
    this.showEvents = !this.showEvents;
    //console.log(this.mapEvents)
  }

}
