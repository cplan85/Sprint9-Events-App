import { Component } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.scss']
})
export class MapScreenComponent {

test = false;

constructor(private placesService: PlacesService) { }

get isUserLocationReady() {

  return this.placesService.isUserLocationReady;
}

}
