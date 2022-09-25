import { EventsService } from './../../../services/events.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { AppEvent } from './../../interfaces/appEvents';
import { Component, Input, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.scss']
})
export class FeaturedCardComponent implements OnInit {

  heroId!: string;
  isSaved: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  @Input() featuredEvent!: AppEvent;

  ngOnInit(): void {
    this.isEventAlreadySaved(this.featuredEvent.id)
  }

  setToSaved(boolean: boolean = false) {
    console.log('SAVEDD')
    this.isSaved = boolean;
  }

  isEventAlreadySaved(id:string) {
    if (this.authService.user.events && this.authService.user.events.length> 0) {
      this.authService.user.events.some(element => {
        if (element.id === id) {
          this.isSaved = true;
        }
      
        return false;
      });
    }
  }



    openSnackBar() {
      this._snackBar.openFromComponent(SavedEventSnackComponent, {
        duration: 1.5 * 1000,
      });
    }

    openDialog() {
      if(this.authService.user.email) {

        this.dialog.open(DialogAddNote, {
          data: {
            event: this.featuredEvent,
            setfalse: () => {this.setToSaved()},
            setTrue: () => {this.setToSaved(true)},
          },
        });

      } 
      else {
        this.router.navigateByUrl('/auth/login');
      }
    
    }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: './snack-bar-saved-event-component.html',
  styles: [
    `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class SavedEventSnackComponent {

  constructor (public eventsService: EventsService,) {}
}

@Component({
  selector: 'dialog-add-note',
  templateUrl: 'dialog-add-note.html',
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
export class DialogAddNote {

  newNote: string ='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: {event: AppEvent, setFalse: Function,setTrue: Function}, 
  private authService: AuthService, 
  private router: Router, 
  private eventsService: EventsService,
  private _snackBar: MatSnackBar,
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
          this.eventsService.setAddedEvent(this.data.event)
          this.openSnackBar();
          this.data.setTrue()
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

    openSnackBar() {
      this._snackBar.openFromComponent(SavedEventSnackComponent, {
        duration: 1.5 * 1000,
      });
    }
}
