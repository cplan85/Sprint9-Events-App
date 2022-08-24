import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from './components/map/map.component';
import { FriendEventsComponent } from './components/friend-events/friend-events.component';
import { FeaturedCardComponent } from './components/featured-card/featured-card.component';



@NgModule({
  declarations: [
    HomeMainComponent,
    HeaderComponent,
    FeaturedComponent,
    MapComponent,
    FriendEventsComponent,
    FeaturedCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
