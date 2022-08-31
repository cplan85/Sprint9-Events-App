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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { EventsListComponent } from './events-list/events-list.component';
import { BtnLoadMoreComponent } from './components/btn-load-more/btn-load-more.component';



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
    SearchBarComponent,
    SearchResultsComponent,
    EventsListComponent,
    BtnLoadMoreComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
