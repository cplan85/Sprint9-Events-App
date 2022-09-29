import { SavedEventSnackComponent } from './../featured-card/featured-card.component';
import { AuthService } from './../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Event } from './../../interfaces/events';
import { AppEvent } from './../../interfaces/appEvents';
import { EventsService } from './../../../services/events.service';
import { MapService } from './../../../services/map.service';
import { Component, AfterViewInit,ElementRef, ViewChild, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlacesService } from 'src/app/services/places.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as mapboxgl from 'mapbox-gl';
import { LngLatBounds } from 'mapbox-gl';
import * as L from 'leaflet';


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
  mapMarkers: mapboxgl.Marker[] = [];

  markersCluster = L.markerClusterGroup({
    polygonOptions: {
      fillColor: '#3887be',
      color: '#3887be',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.5
    }
  });

  constructor(private placesService: PlacesService,
    private mapService: MapService,
    private eventsService: EventsService,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { }

    loadMoreEvents(map:mapboxgl.Map) {
      console.log('test works');

      this.eventsService.getNextEvents(this.eventsService.next).subscribe(resp => {
        console.log(resp, "full Response")
        this.eventsService.setNext(resp._links.next.href)
        this.addEventMarkers(resp._embedded.events, map);
      })
    }

    
    count: number = 0;

    addEventMarkers(events: Event[], map: mapboxgl.Map) {
      
      

      events.forEach((event, idx) => {
        this.mapEvents.push({
          id:event.id,//
          name: event.name ? event.name : '',
          url: event.url? event.url : "",
          date: event.dates.start.localDate ? event.dates.start.localDate: '' ,
          startTime: event.dates.start.localTime,
          img: event.images[0].url ? event.images[0].url : '' ,
          min: event.priceRanges? event.priceRanges[0].min : 1,
          max: event.priceRanges? event.priceRanges[0].max : 1000,
          currency: event.priceRanges? event.priceRanges[0].currency: '',
          venue: event._embedded.venues[0].name ? event._embedded.venues[0].name : '',
          venueImages:  event._embedded.venues[0].images ? event._embedded.venues[0].images : [] ,
          venueUrl: event._embedded.venues[0].url,
          address: event._embedded.venues[0].address? event._embedded.venues[0].address.line1 : 'Verify Address' ,
          city: event._embedded.venues[0].address? event._embedded.venues[0].city.name : 'Verify City' ,
          country: event._embedded.venues[0].address? event._embedded.venues[0].country.name : '' ,
          promoter: event.promoter? event.promoter.name : '',
          type: event.classifications[0].segment.name ? event.classifications[0].segment.name: '',
          lat: parseFloat(event._embedded.venues[0].location.latitude),
          long: parseFloat(event._embedded.venues[0].location.longitude)
        })
        this.count +=1;
        let newIdx = this.count;
        this.mapService.mapEvents = this.mapEvents;
  
        //console.log(event.classifications[0].segment.name);

        const innerHtmlContent = `<h6>${event.name}</h6>
        <span>${event.dates.start.localDate}</span>
        <img class="popupImg" src="${event.images[0].url}">
        <p>Starts at ${event.priceRanges? event.priceRanges[0].min: 1} ${event.priceRanges? event.priceRanges[0].currency: ''}</p>
        <p> ${event._embedded.venues[0].address? event._embedded.venues[0].city.name : 'Verify City'}</p>
        <br>`;

        const divElement = document.createElement('div');
        const addEventBtn = document.createElement('div');
        addEventBtn.innerHTML = ` <button color="accent" class="mat-raised-button mat-button-base mat-warn change-location-btn add-event-btn">Add To My Events</button>`;

        const infoBtn = document.createElement('div');
        infoBtn.innerHTML = ` <button color="accent" class="mat-stroked-button mat-button-base mat-warn change-location-btn info-btn">Read more</button><br><br>`;

        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(infoBtn);
        divElement.appendChild(addEventBtn);
        // btn.className = 'btn';
        addEventBtn.addEventListener('click', (e) => {
          this.addEvent(this.mapEvents[newIdx-1])
        });
        infoBtn.addEventListener('click', (e) => {
          this.goToInfoPage(event.id)
        });
  
        const eventPopup = new mapboxgl.Popup()
        .setDOMContent(divElement);
    
  
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
  
         let musicMapMarker = new mapboxgl.Marker(musicMarker, { draggable:true})
          .setLngLat([long, lat])
          .setPopup(eventPopup)
          .addTo(map)
          
          this.mapMarkers.push(musicMapMarker)
          var marker = L.marker(L.latLng(lat, long  )).bindPopup("<h2>"+event.name+"</h2><p>"+event.dates+"</p>");
          this.markersCluster.addLayer(marker);
         // map.addLayer(this.markersCluster)
         }

         if(event.classifications[0].segment.name==="Sports") {
  
          let sportsMapMarker = new mapboxgl.Marker(sportsMarker, { draggable:true})
          .setLngLat([long, lat])
          .setPopup(eventPopup)
          .addTo(map)

          this.mapMarkers.push(sportsMapMarker)
  
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
        
/*
      for (const marker of this.mapMarkers) {
       // console.log(marker.getLngLat() )
        const sameMarkers = this.mapMarkers.filter(m => m.getLngLat().lat === marker.getLngLat().lat && m.getLngLat().lng === marker.getLngLat().lng);
        console.log(sameMarkers, "same Markers")
   
        // if there is more than one marker with the same coordinates
        if (sameMarkers.length > 1) {
            // get the index of the current marker
            const index = sameMarkers.indexOf(marker);
   
            // calculate the offset for the current marker
            const offset = 10 * (index - (sameMarkers.length - 1) / 2);
   
            // set the offset
            marker.setOffset([offset, 0]);
        }
    }
    */
    }
  

    goToInfoPage(id: string){
      this.router.navigate(['/home/', id])
    }

    openSnackBar() {
      this._snackBar.openFromComponent(SavedEventSnackComponent, {
        duration: 1.5 * 1000,
      });
    }

    addEvent(event: AppEvent) {
  
      if(this.authService.user.email) {
  
        let email = this.authService.user.email
  
        let {  id, name, url, date, startTime, img, min, max, currency, venue, venueImages, venueUrl, address, promoter, type, lat, long,
          seatmapImg, note} = event;
          console.log(url, "my url")
          
          let venueImage = venueImages && venueImages.length>0? venueImages[0].url: ''
  
          this.authService.addEvent(email, id, name, url, date, startTime, img, min, max, currency, venue, venueImage, venueUrl, address, promoter, type, lat, long,
            seatmapImg, note)
          .subscribe( ok => {
            console.log(ok, "ok from add Event")
            this.eventsService.setAddedEvent(event)
            this.openSnackBar();
            if ( ok === true ) {
              this.router.navigateByUrl('/dashboard')
            } else {
              
            }
        })
  
      }
      else {
        this.router.navigateByUrl('/auth/login')
      }
      }

    

   

    ngOnInit(): void {

      this.mapService.mySubject.subscribe((data) => {
        console.log('MAP COMPONENT RESPONDS TO DATA CHANGE!', data)
        this.mapMarkers = [];
        this.eventsService.getLocalEvents(data, 40).subscribe(resp => {
          this.mapEvents = [];
          console.log(resp, "full Response from Change Detection")
          this.eventsService.setNext(resp._links.next.href)
      
          this.addEventMarkers(resp._embedded.events, this.map);

              // NEW CODE FOR BOUNDING MAP
              const bounds = new LngLatBounds();
              this.mapMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
              console.log(data, "my data")
              bounds.extend(data);
              this.map.fitBounds(bounds, {
                padding: 100
              }) 
              // MAKE SURE TO ADD CONDITIONS FOR OTHER MARKERS BESIDES SPORTS AND MUSIC
      
        })
       })
   
    }

  ngAfterViewInit(): void {

  

    (mapboxgl as any).accessToken = environment.mapboxToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
//mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
style: 'mapbox://styles/cplan203/cl8af4aq2004915s1oonaq8nm', // style URL
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
  <span>If you want to return to your map's center click on top right button.</span>
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

  map.on('dragend', () => {

    if (map.getZoom() > 12.6) {

      this.eventsService.getLocalEvents([map.getCenter().lng, map.getCenter().lat], 40).subscribe(resp => {
        console.log(resp, "full Response")
        this.eventsService.setNext(resp._links.next.href)
    
        this.addEventMarkers(resp._embedded.events, map);
      })
    }
    
    });


  //map.addLayer(this.markersCluster);
  }
 
}
