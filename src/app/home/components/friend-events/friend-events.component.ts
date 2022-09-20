import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";

@Component({
  selector: 'app-friend-events',
  templateUrl: './friend-events.component.html',
  styleUrls: ['./friend-events.component.scss']
})
export class FriendEventsComponent implements OnInit {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  popularEvents = [
    {name: 'Cassia',
    img: "https://s1.ticketm.net/dam/a/60c/783fab2e-55a0-421d-91f0-d378b4fca60c_1632431_RETINA_LANDSCAPE_16_9.jpg",
    date: '2022-10-01',
    total_interested: 1500,
    friends: [{
      name: 'John123',
      img: './assets/man-avatar-1.svg'
    }, {
      name: 'Dave234',
      img: './assets/man-avatar-2.svg'
    },
    {
      name: 'Jane_bcn',
      img: './assets/woman-avatar-1.svg'
    }],
  }
  ,
  {name: "The Black Crowes - Twice as Hard",
  img: "https://s1.ticketm.net/dam/a/0bb/9c8de22b-65d9-429b-ab74-042e4f3930bb_1277731_TABLET_LANDSCAPE_LARGE_16_9.jpg",
  date: "2022-10-16",
  total_interested: 1300,
  friends: [
    {
    name: 'John',
    img: './assets/man-avatar-1.svg'
  }, {
    name: 'Dave',
    img: './assets/man-avatar-2.svg'
  },
  {
    name: 'Jane',
    img: './assets/woman-avatar-1.svg'
  },
]
},
{name: "Cirque du Soleil: Crystal",
img: 
"https://s1.ticketm.net/dam/a/58b/2045395d-7f94-47c6-8909-f67a8877a58b_1694211_RETINA_PORTRAIT_16_9.jpg",
date: "2023-01-15",
total_interested: 900,
friends: [
  {
  name: 'John',
  img: './assets/man-avatar-1.svg'
}, {
  name: 'Dave',
  img: './assets/man-avatar-2.svg'
},
{
  name: 'Jane',
  img: './assets/woman-avatar-1.svg'
},
]
},

{name: 'Cassia',
img: "https://s1.ticketm.net/dam/a/60c/783fab2e-55a0-421d-91f0-d378b4fca60c_1632431_RETINA_LANDSCAPE_16_9.jpg",
date: '2022-10-01',
total_interested: 8200,
friends: [{
  name: 'John',
  img: './assets/man-avatar-1.svg'
}, {
  name: 'Dave',
  img: './assets/man-avatar-2.svg'
},
{
  name: 'Jane',
  img: './assets/woman-avatar-1.svg'
}],
}

]
 



  slider!: KeenSliderInstance;

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      //loop: true,
      slides: {
        perView: 3.5,
        spacing: 10,
      },

      breakpoints: {
        '(max-width: 576px)': {
          loop: false,
          slides: {
            perView: 1,
            spacing: 10,
          },
        },
        '(max-width: 768px)': {
          loop: false,
          slides: {
            perView: 2.5,
            spacing: 10,
          },
        },
      },
      
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
