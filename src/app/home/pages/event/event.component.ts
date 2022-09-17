import { AuthService } from './../../../auth/services/auth.service';
import { EventsService } from './../../../services/events.service';
import { AppEvent } from './../../interfaces/appEvents';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event!: AppEvent ;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private authService: AuthService) { }

  return(){
    this.router.navigate(['/home/'])
  }

  retrieveEvents(events: AppEvent[]) {

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) =>  
     
      events.filter((appEvent)=> {
       return appEvent.id === id
      })
      )
    )
    .subscribe(appEvent => {
  
      this.event = appEvent
     });

  }

  



  goToLink(link:string){
    window.location.href = link;
  }
  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe(params => {
      let id = params['id'];
      console.log(id, "my id")

      let matchingId =this.authService.user.events?.filter(appEvent => {
       return appEvent.id === id;
      })

      if(this.authService.user.events && matchingId!.length> 0) {
        this.retrieveEvents(this.authService.user.events) 
      } else if(this.eventsService.localEvents.length >0) {
        this.retrieveEvents(this.eventsService.localEvents)
      }
      else {
        console.log("executing elsee")
        this.eventsService.getEventbyId(id).subscribe(event => {
          console.log(event)
      this.event = {
        id:event.id,
        name: event.name,
        url: event.url,
        date: event.dates.start.localDate,
        startTime: event.dates.start.localTime,
        img: event.images[0].url,
        min: event.priceRanges?  event.priceRanges[0].min : 0,
        max: event.priceRanges? event.priceRanges[0].max : 1000,
        currency: event.priceRanges? event.priceRanges[0].currency: '',
        venue: event._embedded.venues[0].name,
        venueImages:  event._embedded.venues[0].images,
        venueUrl: event._embedded.venues[0].url,
        address: event._embedded.venues[0].address? event._embedded.venues[0].address.line1 : 'Verify Address' ,
        promoter: event.promoter? event.promoter.name : '',
        type: event.classifications[0].segment.name,
        lat: parseFloat(event._embedded.venues[0].location.latitude),
        long: parseFloat(event._embedded.venues[0].location.longitude),
        seatmapImg: event.seatmap? event.seatmap.staticUrl : '',
        note: '',
      }
        
        })
      }
     
    }
  );



    
    console.log(this.eventsService.localEvents)
    console.log(this.event, "EXTRACTED EVENT")

  }

}
