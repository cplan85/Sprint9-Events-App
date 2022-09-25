import { AuthService } from './../../../auth/services/auth.service';
import { AppEvent } from './../../../home/interfaces/appEvents';
import { Component, OnInit, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-event-card',
  templateUrl: './my-event-card.component.html',
  styleUrls: ['./my-event-card.component.scss']
})
export class MyEventCardComponent implements OnInit {

  addednote: boolean = false;
  newNote: string ='';

  @Input() event!: AppEvent;

  constructor(private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  setToSaved(boolean: boolean = false, note='') {
    this.addednote = boolean;
    this.newNote = note;
    console.log(note, 'from executed edit')
  }

  setNote(note: string) {
    this.newNote = note;
    console.log(note)
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

       const dialogRef = this.dialog.open(DialogEditNote, {
          data: {
            event: this.event,
            setFalse: () => this.setToSaved(),
            setTrue: () => this.setToSaved(true),
          },
        });

        dialogRef.afterClosed().subscribe(result => {
         console.log(result.note, "hodhfo")
         this.addednote = true;
         this.newNote  = result.note;
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: {event: AppEvent, setFalse: Function,setTrue: Function, setNote: Function}, 
  private authService: AuthService, 
  public dialogRef: MatDialogRef<DialogEditNote>
  ) {
  }


  editEvent() {
  
    if(this.authService.user.email) {

      let email = this.authService.user.email

      let { id, note} = this.data.event;

        this.newNote? note = this.newNote: null;

  
        console.log('note should be good here', note)

        this.authService.editEvent(email, id, note)
        .subscribe( ok => {
          this.dialogRef.close({note: this.newNote});
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


