import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { AppEvent } from './../../interfaces/appEvents';
import { Component, Input, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.scss']
})
export class FeaturedCardComponent implements OnInit {

  heroId!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  @Input() featuredEvent!: AppEvent;

  ngOnInit(): void {
  }

  addEvent() {
  
    if(this.authService.user.email) {

      let email = this.authService.user.email

      let {  id, name, url, date, startTime, img, min, max, currency, venue, venueImages, venueUrl, address, promoter, type, lat, long,
        seatmapImg, note} = this.featuredEvent;
        
        let venueImage = venueImages? venueImages[0].url: ''

        this.authService.addEvent(email, id, name, url, date, startTime, img, min, max, currency, venue, venueImage, venueUrl, address, promoter, type, lat, long,
          seatmapImg, note)
        .subscribe( ok => {
          console.log(ok, "ok from add Event")
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

    openSnackBar() {
      this._snackBar.openFromComponent(SavedEventSnackComponent, {
        duration: 1.5 * 1000,
      });
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
export class SavedEventSnackComponent {}
