import { Event } from './../../interfaces/events';
import { AppEvent } from './../../interfaces/appEvents';
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

  map!: mapboxgl.Map;
  mapEvents: AppEvent[] = [];

  constructor(private placesService: PlacesService,
    private mapService: MapService,
    private eventsService: EventsService
    ) { }

    loadMoreEvents(map:mapboxgl.Map) {
      console.log('test works');

      this.eventsService.getNextEvents(this.eventsService.next).subscribe(resp => {
        console.log(resp, "full Response")
        this.eventsService.setNext(resp._links.next.href)
        this.addEventMarkers(resp._embedded.events, map);
      })
    }

    

    addEventMarkers(events: Event[], map: mapboxgl.Map) {
      

      events.forEach(event => {
        this.mapEvents.push({
          id:event.id,//
          name: event.name ? event.name : '',
          url: event.url? event.url : "",
          date: event.dates.start.localDate ? event.dates.start.localDate: '' ,
          startTime: event.dates.start.localTime,
          img: event.images[0].url ? event.images[0].url : '' ,
          min: event.priceRanges? event.priceRanges[0].min : 0,
          max: event.priceRanges? event.priceRanges[0].max : 1000,
          venue: event._embedded.venues[0].name ? event._embedded.venues[0].name : '',
          venueImages:  event._embedded.venues[0].images ? event._embedded.venues[0].images : [] ,
          venueUrl: event._embedded.venues[0].url,
          address: event._embedded.venues[0].address.line1,
          promoter: event.promoter? event.promoter.name : '',
          type: event.classifications[0].segment.name ? event.classifications[0].segment.name: '',
          lat: parseFloat(event._embedded.venues[0].location.latitude),
          long: parseFloat(event._embedded.venues[0].location.longitude)
        })
        this.mapService.mapEvents = this.mapEvents;
  
        console.log(event.classifications[0].segment.name);
  
        const eventPopup = new mapboxgl.Popup()
        .setHTML(`
        <h6>${event.name}</h6>
        <span>${event.dates.start.localDate}</span>
        <img class="popupImg" src="${event.images[0].url}">
        <p>${event.priceRanges? event.priceRanges[0].min: 0} -${event.priceRanges? event.priceRanges[0].max: 1000} ${event.priceRanges? event.priceRanges[0].currency: ''}</p>
        <a href=${event.url}>Event Link</a>
        `);
  
        const musicMarker = document.createElement('div');
        musicMarker.className = 'music-marker';

        const artsMarker = document.createElement('div');
       artsMarker.className = 'arts-marker';

        const sportsMarker = document.createElement('div');
        sportsMarker.className = 'sports-marker';
        
  
        const miscMarker = document.createElement('div');
        miscMarker.className = 'misc-marker';
      
         // console.log(event._embedded.venues[0].location, "specific")
          const lat = parseFloat(event._embedded.venues[0].location.latitude)
          const long = parseFloat(event._embedded.venues[0].location.longitude)
      
      
          
         if(event.classifications[0].segment.name==="Music") {
  
          new mapboxgl.Marker(musicMarker, { draggable:true})
          .setLngLat([long, lat])
          .setPopup(eventPopup)
          .addTo(map)
  
         }

         if(event.classifications[0].segment.name==="Sports") {
  
          new mapboxgl.Marker(sportsMarker, { draggable:true})
          .setLngLat([long, lat])
          .setPopup(eventPopup)
          .addTo(map)
  
         }
  
         if(event.classifications[0].segment.name==="Miscellaneous") {
  
          new mapboxgl.Marker(miscMarker, { draggable:true})
          .setLngLat([long, lat])
          .setPopup(eventPopup)
          .addTo(map)
  
         }

         if(event.classifications[0].segment.name==="Arts & Theatre") {
  
          new mapboxgl.Marker(artsMarker, { draggable:true})
          .setLngLat([long, lat])
          .setPopup(eventPopup)
          .addTo(map)
  
         }

      })
    }

   

    ngOnInit(): void {

      this.mapService.mySubject.subscribe((data) => {
        console.log('MAP COMPONENT RESPONDS TO DATA CHANGE!', data)
      
        this.eventsService.getLocalEvents(data, 40).subscribe(resp => {
          this.mapEvents = [];
          console.log(resp, "full Response from Change Detection")
          this.eventsService.setNext(resp._links.next.href)
      
          this.addEventMarkers(resp._embedded.events, this.map);
      
        
        })


       })
   

    
    
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
map.setFog({"color": "#f5f5f5",
"range": [0.8, 8],
"horizon-blend": 0.5,
}); // Set the default atmosphere style
});

this.map = map;
const popup = new mapboxgl.Popup()
  .setHTML(`
  <h6>Your Home Base</h6>
  <span>If you want to return to your center click on top right button.</span>
  `);

  new mapboxgl.Marker({color: 'black'})
  .setLngLat(this.placesService.userLocation!)
  .setPopup(popup)
  .addTo(map)

  this.mapService.setMap( map)

  this.eventsService.getLocalEvents(this.placesService.userLocation!, 40).subscribe(resp => {
    console.log(resp, "full Response")
    this.eventsService.setNext(resp._links.next.href)

    this.addEventMarkers(resp._embedded.events, map);

  
  })

  
  }
 
}
