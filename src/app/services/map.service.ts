import { Router } from '@angular/router';
import { AppEvent } from './../home/interfaces/appEvents';
import { Feature } from './../home/interfaces/places';
import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor (private router: Router) {}

  mapEvents: AppEvent[] = [];

  private map: Map | undefined;
  private markers: Marker[] = [];
  private currentMarker: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;

  }

  //CODE TO TEST FROM STACK OVERFLOW
mySubject : Subject<any> = new Subject<any>();
myData : any ;

myDataSetter(data : any){
 this.myData = data;
 this.mySubject.next(this.myData);
}
//END OF GENERIC CODE FROM STACK OVERFLOW
  

  flyTo( coords: LngLatLike) {
    if (!this.isMapReady) throw Error('The map is not initialized')

    this.map?.flyTo({
      zoom: 18,
      center: coords
    })
  }


  goToInfoPage(id: string){
    this.router.navigate(['/home/', id])
  }

  resetCurrentMarker() {
    this.currentMarker.forEach( marker => marker.remove());
  }

  createCurrentMarker(coords: LngLatLike, event: AppEvent) {

    if(!this.map) throw Error('Map is not initialized');

   this.resetCurrentMarker();
    
    const innerHtmlContent = `<h6>${event.name}</h6>
    <span>${event.date}</span>
    <img class="popupImg" src="${event.img}">
    <p>${event.min} -${event.max} ${event.currency}</p>
    <p> ${event.city}</p>
    <br>`;

    const divElement = document.createElement('div');
    const addEventBtn = document.createElement('div');
    addEventBtn.innerHTML = ` <button color="accent" class="mat-raised-button mat-button-base mat-warn change-location-btn add-event-btn">Add To My Events</button>`;

    const infoBtn = document.createElement('div');
    infoBtn.innerHTML = ` <button color="accent" class="mat-stroked-button mat-button-base mat-warn change-location-btn info-btn">Read more</button><br><br>`;

    infoBtn.addEventListener('click', (e) => {
      this.goToInfoPage(event.id)
    });

    divElement.innerHTML = innerHtmlContent;
    divElement.appendChild(infoBtn);
    divElement.appendChild(addEventBtn);


    const eventPopup = new mapboxgl.Popup()
    .setDOMContent(divElement);

    const el = document.createElement('div');
    el.className = event.type === 'Music' ? 'current-music-marker' : event.type === "Arts & Theatre" ? 'current-arts-marker' : event.type === 'Sports' ? 'current-sports-marker' : event.type === 'Miscellaneous' ? 'current-misc-marker' : 'current-music-marker' ;
    
    const newMarker = new Marker(el)
    .setLngLat(coords)
    .setPopup( eventPopup)
    .addTo (this.map);
    this.currentMarker.push(newMarker);

  }

  assignNewCoordinates(coordinates: [number, number]) {
    this.map?.flyTo({center: coordinates});
    console.log(coordinates)
    this.myDataSetter(coordinates)
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if(!this.map) throw Error('Map is not initialized');


    this.markers.forEach( marker => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng,lat] = place.center;

      const innerHtmlContent = `<h6>${place.text}</h6>
       <span>${place.place_name}</span>
       <br>`;
      
      const divElement = document.createElement('div');
      const assignBtn = document.createElement('div');
      assignBtn.innerHTML = ` <button color="warn" class="mat-raised-button mat-button-base mat-primary change-location-btn">Get Events Near Here</button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(assignBtn);
      // btn.className = 'btn';
      assignBtn.addEventListener('click', (e) => {
        this.assignNewCoordinates([lng,lat])
      });


      const popup = new Popup()
      .setDOMContent(divElement);
    
      const el = document.createElement('div');
      el.className = 'search-marker';

      

      const newMarker = new Marker(el)
      .setLngLat([lng, lat])
      .setPopup( popup)
      .addTo (this.map);


      newMarkers.push(newMarker)
    }


    this.markers=newMarkers;

    if( places.length === 0) return;


    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend(marker.getLngLat()));

    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 100
    }) 
   
  }

  removeMarkers() {
    this.markers.forEach( marker => marker.remove());
  }

  createMarkersFromEvents() {

    if(!this.map) throw Error('Map is not initialized');

  }

}
