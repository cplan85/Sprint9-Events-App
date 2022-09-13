import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";

@Component({
  selector: 'app-friend-events',
  templateUrl: './friend-events.component.html',
  styleUrls: ['./friend-events.component.scss']
})
export class FriendEventsComponent implements OnInit {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>



  slider!: KeenSliderInstance;

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      slides: {
        perView: 3,
        spacing: 15,
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
