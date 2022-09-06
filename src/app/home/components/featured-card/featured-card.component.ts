import { AppEvent } from './../../interfaces/appEvents';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.scss']
})
export class FeaturedCardComponent implements OnInit {

  heroId!: string;

  constructor() { }

  @Input() featuredEvent!: AppEvent;

  ngOnInit(): void {

    console.log(this.featuredEvent, "my event")
  }

    
  

}
