import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { AppEvent } from '../interfaces/appEvents';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent implements AfterViewInit {

  @Input() event!: AppEvent;
  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomValue: number = 15;
  center: [number, number] = [2.1747936849217937, 41.40378416042038];

  constructor() { }

  ngAfterViewInit(): void {

    // (mapboxgl as any).accessToken = environment.mapboxToken;
     this.map = new mapboxgl.Map({
     container: this.divMap.nativeElement, // container ID
     //mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
     style: 'mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc', // style URL
     center: [this.event.long, this.event.lat], // starting position [lng, lat]
     zoom: this.zoomValue, // starting zoom
     projection: {name: 'globe' }// display the map as a 3D globe
     });
     this.map.on('style.load', () => {
     this.map.setFog({}); // Set the default atmosphere style
     });

     const popup = new mapboxgl.Popup()
  .setHTML(`
  <h6>${this.event.venue}</h6>
  <span>${this.event.address}</span>
  `);

  new mapboxgl.Marker({color: 'black'})
  .setLngLat([this.event.long, this.event.lat])
  .setPopup(popup)
  .addTo(this.map)

     
   
     //this.readLocalStorage();
   }

}
