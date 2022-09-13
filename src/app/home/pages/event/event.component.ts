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
    private eventsService: EventsService) { }

  return(){
    this.router.navigate(['/home/'])
  }

  



  goToLink(link:string){
    window.location.href = link;
  }
  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => 
     
      this.eventsService.localEvents.filter((appEvent)=> {
       return appEvent.id === id
      })
        //this.heroesService.getHeroe(id)
      )
    )
    .subscribe(appEvent => {
  
      this.event = appEvent
     });

    
    console.log(this.eventsService.localEvents)
    console.log(this.event, "EXTRACTED EVENT")

  }

}
