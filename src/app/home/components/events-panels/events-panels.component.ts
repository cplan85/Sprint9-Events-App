import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { PlacesService } from './../../../services/places.service';
import { MapService } from 'src/app/services/map.service';
import { AppEvent } from './../../interfaces/appEvents';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-events-panels',
  templateUrl: './events-panels.component.html',
  styleUrls: ['./events-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPanelsComponent implements OnInit {

  public selectedId: string = '';
  panelOpenState = false;

  constructor(private placesService: PlacesService,
    private authService: AuthService,
    private router: Router,
    private mapService: MapService) { }

  ngOnInit(): void {
  }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places( ): AppEvent[] {
    // console.log('my places',this.placesService.places)
     return this.mapService.mapEvents;
   }
 
   flyTo(place: AppEvent) {
     this.selectedId = place.id!;
     const [lng, lat] = [place.long, place.lat];
     this.mapService.flyTo([lng,lat])
   }

   addEvent(event: AppEvent) {
  
    if(this.authService.user.email) {

      let email = this.authService.user.email

      let {  id, name, url, date, startTime, img, min, max, currency, venue, venueImages, venueUrl, address, promoter, type, lat, long,
        seatmapImg, note} = event;
        
        let venueImage = venueImages? venueImages[0].url: ''

        this.authService.addEvent(email, id, name, url, date, startTime, img, min, max, currency, venue, venueImage, venueUrl, address, promoter, type, lat, long,
          seatmapImg, note)
        .subscribe( ok => {
          console.log(ok, "ok from add Event")
          //this.openSnackBar();
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

}
