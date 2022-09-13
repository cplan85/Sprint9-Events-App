import { Feature } from './../../interfaces/places';
import { PlacesService } from 'src/app/services/places.service';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppEvent } from '../../interfaces/appEvents';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlacesApiClient } from '../../api';
import { PlacesResponse } from './../../interfaces/places';


@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, AfterViewInit {

  myControl = new FormControl('');
 term:string ='';
 places: Feature[] = [];
 isDataLoaded: boolean = false;
 selectedPlace: Feature | undefined;
 filteredPlaces!: Observable<Feature[]>;

 featuredEvents: AppEvent[] = [
  ]

  private debounceTimer?: NodeJS.Timeout;


  onQueryChange( query: string = '') {

    if (this.debounceTimer) clearTimeout( this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      //GET THE DATA OF PLACES, AND THEN PUT INTO AUTOCOMPLETE
      this.placesService.getPlacesByQuery(query);
      this.places = this.placesService.places;

      this.placesService.getLocationName().subscribe(resp => {
        console.log(resp.features[0])
        this.currentCity=resp.features[0].context[3].text;
       })
    }, 500);
  }

  finding(query: string) {
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.placesService.userLocation!.join(',')
      }
    }).subscribe(resp => {
      this.places = resp.features
    })
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event)

    if(!event.option.value) {
      this.selectedPlace = undefined;
      return;
    }
    const place: Feature = event.option.value;

    this.currentCity = place.place_name;

    console.log(place, 'selected place')
//NEED TO REFACTOR ALL OF THIS
    this.eventsService.getLocalEvents([place.center[0], place.center[1]], 10).subscribe(resp => {
      this.featuredEvents = [];
      console.log(resp, "full Response from Change Detection")
      this.eventsService.setNext(resp._links.next.href);
  
      resp._embedded.events.forEach(event => { 
        this.featuredEvents.push({
          id:event.id,
          name: event.name,
          url: event.url,
          date: event.dates.start.localDate,
          startTime: event.dates.start.localTime,
          img: event.images[0].url,
          min: event.priceRanges?  event.priceRanges[0].min : 0,
          max: event.priceRanges? event.priceRanges[0].max : 1000,
          venue: event._embedded.venues[0].name,
          venueImages:  event._embedded.venues[0].images,
          venueUrl: event._embedded.venues[0].url,
          address: event._embedded.venues[0].address.line1,
          promoter: event.promoter? event.promoter.name : '',
          type: event.classifications[0].segment.name,
          lat: parseFloat(event._embedded.venues[0].location.latitude),
          long: parseFloat(event._embedded.venues[0].location.longitude),
          seatmapImg: event.seatmap? event.seatmap.staticUrl : ''
        })
      }
      )

      this.eventsService.setLocalEvents(this.featuredEvents)
  
    
    })
  }
  //CHANGE THIS SECTION

  currentCity: string ='';

  constructor(public placesService: PlacesService  ,private eventsService: EventsService, private placesApi: PlacesApiClient) { }

  get isUserLocationReady() {

    return this.placesService.isUserLocationReady;
  }

  generateEvents(){
    this.placesService.getUserLocation().then(() => {
      
      this.eventsService.getLocalEvents(this.placesService.userLocation!, 10).subscribe(resp => {
        console.log(resp._embedded.events, "full Response from featured")

        resp._embedded.events.forEach(event => { 
          this.featuredEvents.push({
            id:event.id,
            name: event.name,
            url: event.url,
            date: event.dates.start.localDate,
            startTime: event.dates.start.localTime,
            img: event.images[0].url,
            min: event.priceRanges?  event.priceRanges[0].min : 0,
            max: event.priceRanges? event.priceRanges[0].max : 1000,
            venue: event._embedded.venues[0].name,
            venueImages:  event._embedded.venues[0].images,
            venueUrl: event._embedded.venues[0].url,
            address: event._embedded.venues[0].address.line1,
            promoter: event.promoter? event.promoter.name : '',
            type: event.classifications[0].segment.name,
            lat: parseFloat(event._embedded.venues[0].location.latitude),
            long: parseFloat(event._embedded.venues[0].location.longitude),
          })
        }
        )
      } )

      this.eventsService.setLocalEvents(this.featuredEvents)

      this.placesService.getLocationName().subscribe(resp => {
        console.log(resp.features[0])
        this.currentCity=resp.features[0].context[3].text;
       })

       this.isDataLoaded = true;

    })
  }

  

  ngOnInit(): void {
    this.placesService.getUserLocation().then(()=> {
      this.generateEvents();
    })
   
  }

  ngAfterViewInit(): void {

  }
  

}
