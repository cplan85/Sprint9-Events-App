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
import { MapScreenComponent } from './map-screen/map-screen.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';



@NgModule({
  declarations: [
    HomeMainComponent,
    HeaderComponent,
    FeaturedComponent,
    MapComponent,
    FriendEventsComponent,
    FeaturedCardComponent,
    MapScreenComponent,
    LoadingComponent,
    BtnMyLocationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
