import { PlacesService } from 'src/app/services/places.service';
import { Feature } from './../../interfaces/places';
import { MapService } from './../../../services/map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  panelOpenState = false;

  public selectedId: string = '';

  constructor(private placesService: PlacesService,
    private mapService: MapService) { }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places( ): Feature[] {
   // console.log('my places',this.placesService.places)
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng,lat])
  }

}