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
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('FullScreenComponent');

    (mapboxgl as any).accessToken = environment.mapboxToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
//mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
style: 'mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc', // style URL
center: [2.1747936849217937, 41.40378416042038], // starting position [lng, lat]
zoom: 12, // starting zoom
projection: {name: 'globe' }// display the map as a 3D globe
});
map.on('style.load', () => {
map.setFog({}); // Set the default atmosphere style
});

  }
 
}
