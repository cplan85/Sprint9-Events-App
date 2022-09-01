import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-checkboxes',
  templateUrl: './events-checkboxes.component.html',
  styleUrls: ['./events-checkboxes.component.scss']
})
export class EventsCheckboxesComponent implements OnInit {

  showCheckboxes: boolean = false;

  music = true;
  sports = true;
  arts = true;
  family = true;
  film = true;
  misc = true;

  constructor() { }

  toggleCheckboxes() {
    this.showCheckboxes = !this.showCheckboxes;
    //console.log(this.mapEvents)
  }

  ngOnInit(): void {
  }

  toggleCategory(className: string, toggle: boolean) {
    let markers = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
   if(toggle) { for (let i = 0; i < markers.length; i++) {
     markers[i].style.visibility = "hidden";
   }
  }

  if(!toggle) { for (let i = 0; i < markers.length; i++) {
    markers[i].style.visibility = "visible";
  }
 }

}

}
