import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapService } from 'src/app/services/map.service';
import { PlacesApiClient } from './../home/api/placesApiClient';
import { PlacesResponse, Feature } from './../home/interfaces/places';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
public userLocation?: [number, number];
public isLoadingPlaces: boolean = false;
public places: Feature[] = [];

public currentCityName:string = '';

get isUserLocationReady(): boolean {
  return !!this.userLocation
}

  constructor(private placesApi: PlacesApiClient,
    private http: HttpClient,
    private mapService: MapService) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords} ) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation)},
          (err) => {
            alert('Cound not obtain geoLocation');
            reject();
          }
      );
    })
  }

  getPlacesByQuery(query: string ='') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if (!this.userLocation) throw Error('There is no userLocation')

   this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation!.join(',')
      }
    }).subscribe(resp => {
      console.log(resp.features, "places")

      this.isLoadingPlaces = false;
      this.places = resp.features;

      this.mapService.createMarkersFromPlaces(this.places, this.userLocation!)

    });
    
  }

  getLocationName(userLocation = this.userLocation) {

    console.log(userLocation)
    if (!this.userLocation) throw Error('There is no userLocation')

   return  this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation?.toString()}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=${environment.mapboxToken}`)
  }

}