import { Feature } from './../home/interfaces/places';
import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;

  }
  

  flyTo( coords: LngLatLike) {
    if (!this.isMapReady) throw Error('The map is not initialized')

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if(!this.map) throw Error('Map is not initialized');


    this.markers.forEach( marker => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng,lat] = place.center;
      const popup = new Popup()
      .setHTML(`
      <h6>${place.text}</h6>
      <span>${place.place_name}</span>`)

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


    //limits of map
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
