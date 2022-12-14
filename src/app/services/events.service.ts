import { HttpClient } from '@angular/common/http';
import { EventsResponse } from './../home/interfaces/events';
import { Event } from './../home/interfaces/events';
import { PlacesService } from 'src/app/services/places.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from '../home/interfaces/appEvents';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl: string = 'https://app.ticketmaster.com/discovery/v2/events.json?';
  private latLong: string = `41.37441,2.16953,1` 
  private apiKey: string = environment.ticketMasterApiKey;

  localEvents: AppEvent[] = [];
  next: string = "";

  constructor(private placesService: PlacesService,
    private http: HttpClient) { }

  setLocalEvents(events: AppEvent[]) {
    this.localEvents = events;
  }

  setNext(next: string) {
    this.next = next;
  }

  addedEvent!: AppEvent;
  setAddedEvent(event: AppEvent) {
    this.addedEvent = event;
  }

  getLocalEvents(userLocation: [number, number], size: number): Observable<EventsResponse> {
  
    this.latLong = `${userLocation![1]},${userLocation![0]}`
    return this.http.get<EventsResponse>(`${this.baseUrl}apikey=${this.apiKey}&latlong=${this.latLong}&size=${size}`)
    
   }

   getEventbyId(id: string) {
    const url: string = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${this.apiKey}`;
    return this.http.get<Event>(url);
   }

   getNextEvents(next:string) {
    
    return this.http.get<EventsResponse>(`https://app.ticketmaster.com${next}&apikey=${this.apiKey}`)
    // /discovery/v2/events.json?latlong=41.380836%2C2.164575&page=1&size=40
   }
}
