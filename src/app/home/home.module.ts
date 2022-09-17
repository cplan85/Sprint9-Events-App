import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { HomeRoutingModule } from './home-routing.module';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { DialogMapInfoDialog } from './components/btn-question-mark/btn-question-mark.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { FriendEventsComponent } from './components/friend-events/friend-events.component';
import { FeaturedCardComponent } from './components/featured-card/featured-card.component';
import { MapScreenComponent } from './map-screen/map-screen.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SavedEventSnackComponent } from './components/featured-card/featured-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { EventsListComponent } from './events-list/events-list.component';
import { BtnLoadMoreComponent } from './components/btn-load-more/btn-load-more.component';
import { EventsPanelsComponent } from './components/events-panels/events-panels.component';
import { BtnQuestionMarkComponent } from './components/btn-question-mark/btn-question-mark.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventsCheckboxesComponent } from './components/events-checkboxes/events-checkboxes.component';
import { EventComponent } from './pages/event/event.component';
import { HomeComponent } from './home/home.component';
import { EventMapComponent } from './event-map/event-map.component';



@NgModule({
  declarations: [
    HomeMainComponent,
    HeaderComponent,
    DialogMapInfoDialog,
    FeaturedComponent,
    MapComponent,
    FriendEventsComponent,
    FeaturedCardComponent,
    MapScreenComponent,
    LoadingComponent,
    BtnMyLocationComponent,
    SavedEventSnackComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ShortNumberPipe,
    EventsListComponent,
    BtnLoadMoreComponent,
    EventsPanelsComponent,
    BtnQuestionMarkComponent,
    FooterComponent,
    EventsCheckboxesComponent,
    EventComponent,
    HomeComponent,
    EventMapComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
