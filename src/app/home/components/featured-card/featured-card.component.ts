import { EventsService } from './../../../services/events.service';
import { Component, Input, OnInit } from '@angular/core';

interface FeaturedEvent  {name: string,
venue: string,
address: string,
min: string,
max: string,
id: string,
img: string,
}

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.scss']
})
export class FeaturedCardComponent implements OnInit {

  heroId!: string;

  constructor() { }

  @Input() featuredEvent!: FeaturedEvent;

  ngOnInit(): void {

  }

    
  

}
