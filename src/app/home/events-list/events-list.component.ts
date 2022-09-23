import { PlacesService } from './../../services/places.service';
import { MapService } from 'src/app/services/map.service';
import { AppEvent } from './../interfaces/appEvents';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  showEvents: boolean = false;
  currentCity: string = '';

  @Input() mapEvents!: AppEvent[];

  constructor(private mapService: MapService,
    private placesService: PlacesService) { }

  ngOnInit(): void {
    this.placesService.getLocationName().subscribe(resp => {
      console.log(resp.features[0])
      this.currentCity=resp.features[0].context[3].text;
     })
  }

  toggleEvents() {
    this.showEvents = !this.showEvents;
    this.mapService.resetCurrentMarker();
    //console.log(this.mapEvents)
  }

}
