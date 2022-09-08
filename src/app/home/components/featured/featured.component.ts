import { Feature } from './../../interfaces/places';
import { PlacesService } from 'src/app/services/places.service';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppEvent } from '../../interfaces/appEvents';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, AfterViewInit {


 places: Feature[] = [];
 isDataLoaded: boolean = false;

 featuredEvents: AppEvent[] = [
  ]

  private debounceTimer?: NodeJS.Timeout;

  //NEED TO UPDATE THIS SECTION
  onQueryChange( query: string = '') {

    if (this.debounceTimer) clearTimeout( this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query);
      console.log('Send this query', query)
      this.places = this.placesService.places
    }, 500);
  }
  //CHANGE THIS SECTION

  currentCity: string ='';

  constructor(public placesService: PlacesService  ,private eventsService: EventsService) { }

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
            min: event.priceRanges[0].min,
            max: event.priceRanges[1].max,
            venue: event._embedded.venues[0].name,
            venueImages:  event._embedded.venues[0].images,
            venueUrl: event._embedded.venues[0].url,
            address: event._embedded.venues[0].address.line1,
            promoter: event.promoter.name,
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

   // this.placesService.getUserLocation;

 
  }
  

}
