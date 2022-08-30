import { PlacesService } from 'src/app/services/places.service';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, AfterViewInit {

 featuredEvents: any[] = [
    {name: "Lebanon Hanover",
    venue: "Wolf",
    address: "Carrer dels Almogàvers, 88",
    min: "21.00",
    max: "22.03",
    id:      "1",
    img: "https://s1.ticketm.net/dam/a/c85/8306015b-f232-43b8-ac63-1af32f077c85_1596461_TABLET_LANDSCAPE_16_9.jpg"
    },
    {name: "Lucy Dacus",
    venue: "Wolf",
    address: "Carrer dels Almogàvers, 88",
    min: "24.00",
    max: "27.03",
    id:      "2",
    img: "https://s1.ticketm.net/dam/a/09d/a66b2222-9c55-4688-a287-9c857e27209d_1685421_TABLET_LANDSCAPE_16_9.jpg"
    },
    {name: "Lucy Dacus",
    venue: "Wolf",
    address: "Carrer dels Almogàvers, 88",
    min: "24.00",
    max: "27.03",
    id:      "2",
    img: "https://s1.ticketm.net/dam/a/09d/a66b2222-9c55-4688-a287-9c857e27209d_1685421_TABLET_LANDSCAPE_16_9.jpg"
    },
  ]

  constructor(private placesService: PlacesService  ,private eventsService: EventsService) { }

  ngOnInit(): void {
    this.placesService.getUserLocation()
   
  }

  ngAfterViewInit(): void {
    // this.eventsService.getLocalEvents().subscribe(resp => {
    //   console.log(resp._embedded, "Featured Events")
  
    
    // })
  }
  

}
