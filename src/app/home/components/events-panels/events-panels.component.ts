import { PlacesService } from './../../../services/places.service';
import { MapService } from 'src/app/services/map.service';
import { AppEvent } from './../../interfaces/appEvents';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-events-panels',
  templateUrl: './events-panels.component.html',
  styleUrls: ['./events-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPanelsComponent implements OnInit {

  public selectedId: string = '';
  panelOpenState = false;

  constructor(private placesService: PlacesService,
    private mapService: MapService) { }

  ngOnInit(): void {
  }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places( ): AppEvent[] {
    // console.log('my places',this.placesService.places)
     return this.mapService.mapEvents;
   }
 
   flyTo(place: AppEvent) {
     this.selectedId = place.id!;
     const [lng, lat] = [place.long, place.lat];
     this.mapService.flyTo([lng,lat])
   }

}
