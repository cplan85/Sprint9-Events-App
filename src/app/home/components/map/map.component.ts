import { EventsService } from './../../../services/events.service';
import { MapService } from './../../../services/map.service';
import { Component, AfterViewInit,ElementRef, ViewChild, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlacesService } from 'src/app/services/places.service';
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

  constructor(private placesService: PlacesService,
    private mapService: MapService,
    private eventsService: EventsService
    ) { }

    ngOnInit(): void {
   

    
    }

  ngAfterViewInit(): void {

  

    (mapboxgl as any).accessToken = environment.mapboxToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
//mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
style: 'mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc', // style URL
center: this.placesService.userLocation, // starting position [lng, lat]
zoom: 12, // starting zoom
projection: {name: 'globe' }// display the map as a 3D globe
});
map.on('style.load', () => {
map.setFog({}); // Set the default atmosphere style
});

const popup = new mapboxgl.Popup()
  .setHTML(`
  <h6>Your Home Base</h6>
  <span>If you want to return to your center click on bottom on top right</span>
  `);

  new mapboxgl.Marker({color: 'black'})
  .setLngLat(this.placesService.userLocation!)
  .setPopup(popup)
  .addTo(map)

  this.mapService.setMap( map)

  this.eventsService.getLocalEvents(this.placesService.userLocation!, 40).subscribe(resp => {
    console.log(resp, "full Response")

    resp._embedded.events.forEach(event => {

      console.log(event.classifications[0].segment.name)

      const eventPopup = new mapboxgl.Popup()
      .setHTML(`
      <h6>${event.name}</h6>
      <span>${event.dates.start.localDate}</span>
      <img class="popupImg" src="${event.images[0].url}">
      <p>${event.priceRanges[0].min} -${event.priceRanges[1].max} ${event.priceRanges[1].currency}</p>
      <a href=${event.url}>Event Link</a>
      `);

      const el = document.createElement('div');
      el.className = 'music-marker';
    
        //console.log(event._embedded.venues[0].location, "specific")
        const lat = parseFloat(event._embedded.venues[0].location.latitude)
        const long = parseFloat(event._embedded.venues[0].location.longitude)
    
    
        new mapboxgl.Marker(el, { draggable:true})
        .setLngLat([long, lat])
        .setPopup(eventPopup)
        .addTo(map)

    })

  
  })


  }
 
}
