import { AuthService } from './../../../auth/services/auth.service';
import { AppEvent } from './../../../home/interfaces/appEvents';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-event-card',
  templateUrl: './my-event-card.component.html',
  styleUrls: ['./my-event-card.component.scss']
})
export class MyEventCardComponent implements OnInit {

  @Input() event!: AppEvent;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  deleteEvent() {
  
    if(this.authService.user.email) {

      let email = this.authService.user.email

      let { id } = this.event;
      

        this.authService.deleteEvent(email, id)
        .subscribe( ok => {
          console.log(ok, "ok from Delete Event")
          if ( ok === true ) {
            
            this.authService.user.events!.forEach( (event,idx) => {
              // console.log(`Pantry Name from pantry Controller`,obj.pantryName)
               if (event.id === id) {
                 this.authService.user.events!.splice(idx, 1);
               }
           })
          //  this.router.navigateByUrl('/dashboard')
          } else {
            
          }
      })

    }
    else {
     // this.router.navigateByUrl('/auth/login')
     console.log("an Error Occurred")
    }
  
    }

}
