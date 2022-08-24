import { Component, AfterViewInit,ElementRef, ViewChild, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  currentLat: number = 41.40378416042038;
  currentLong: number = 2.1747936849217937;

  constructor() { }

  ngOnInit(): void {

    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords)

      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
    });
    
  }

  ngAfterViewInit(): void {

  

    (mapboxgl as any).accessToken = environment.mapboxToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
//mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
style: 'mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc', // style URL
center: [this.currentLong, this.currentLat], // starting position [lng, lat]
zoom: 12, // starting zoom
projection: {name: 'globe' }// display the map as a 3D globe
});
map.on('style.load', () => {
map.setFog({}); // Set the default atmosphere style
});


  }
 
}
