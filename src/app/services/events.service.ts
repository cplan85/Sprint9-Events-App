import { HttpClient } from '@angular/common/http';
import { EventsResponse } from './../home/interfaces/events';
import { PlacesService } from 'src/app/services/places.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl: string = 'https://app.ticketmaster.com/discovery/v2/events.json?';
  private latLong: string = `41.37441,2.16953,1` 
  private apiKey: string = environment.ticketMasterApiKey;

  constructor(private placesService: PlacesService,
    private http: HttpClient) { }

  getLocalEvents(): Observable<EventsResponse> {
    console.log(this.latLong)
    this.latLong = `${this.placesService.userLocation![1]},${this.placesService.userLocation![0]}`
    return this.http.get<EventsResponse>(`${this.baseUrl}apikey=${this.apiKey}&latlong=${this.latLong}&size=20`)
   }
}
