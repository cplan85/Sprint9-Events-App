import { AuthService } from './../../../auth/services/auth.service';
import { AppEvent } from './../../../home/interfaces/appEvents';
import { Component, OnInit, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-my-event-card',
  templateUrl: './my-event-card.component.html',
  styleUrls: ['./my-event-card.component.scss']
})
export class MyEventCardComponent implements OnInit {

  @Input() event!: AppEvent;

  constructor(private authService: AuthService,
    public dialog: MatDialog) { }

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

    openDialog() {
      if(this.authService.user.email) {

        this.dialog.open(DialogEditNote, {
          data: {
            event: this.event,
          },
        });

      } 
      else {
        //this.router.navigateByUrl('/auth/login');
      }
    
    }


    

}


@Component({
  selector: 'dialog-edit-note',
  templateUrl: 'dialog-edit-note.html',
  styles: [
    `
    .example-full-width {
      width: 90%;
      padding: 1rem;
      border: solid;
      border-width: thin;
      background-color:white;
    }
    #dialog-add-note {
       background-color: #54B9A4;
      padding: 2rem;
      /* border-radius: 2rem 0!important; */
     
    }
    button {
      margin-right: 2rem;
    }
  `,
  ],

})
export class DialogEditNote {

  newNote: string ='';
  initialNote: string | undefined = this.data.event.note
  constructor(@Inject(MAT_DIALOG_DATA) public data: {event: AppEvent, setFalse: Function,setTrue: Function}, 
  private authService: AuthService, 
  ) {
  }


  addEvent(note: string) {
  
    if(this.authService.user.email) {

      let email = this.authService.user.email

      let {  id, name, url, date, startTime, img, min, max, currency, venue, venueImages, venueUrl, address, promoter, type, lat, long,
        seatmapImg, note} = this.data.event;

        this.newNote? note = this.newNote: null;
        
        let venueImage = venueImages && venueImages.length>0? venueImages[0].url: ''

        this.authService.addEvent(email, id, name, url, date, startTime, img, min, max, currency, venue, venueImage, venueUrl, address, promoter, type, lat, long,
          seatmapImg, note)
        .subscribe( ok => {
          console.log(ok, "ok from add Event");
          this.data.setTrue()
          if ( ok === true ) {
            //this.router.navigateByUrl('/dashboard')
          } else {
            
          }
      })

    }
    else {
     // this.router.navigateByUrl('/auth/login')
    }
    }

}


