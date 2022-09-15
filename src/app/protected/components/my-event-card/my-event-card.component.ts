import { AppEvent } from './../../../home/interfaces/appEvents';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-event-card',
  templateUrl: './my-event-card.component.html',
  styleUrls: ['./my-event-card.component.scss']
})
export class MyEventCardComponent implements OnInit {

  @Input() event!: AppEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
