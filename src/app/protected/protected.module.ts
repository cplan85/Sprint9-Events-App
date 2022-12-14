import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogEditNote } from './components/my-event-card/my-event-card.component';

import { MaterialModule } from './../material/material.module';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MyEventsComponent } from './my-events/my-events.component';
import { MyMapsComponent } from './my-maps/my-maps.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { MyEventCardComponent } from './components/my-event-card/my-event-card.component';



@NgModule({
  declarations: [
    DialogEditNote,
    MainDashboardComponent,
    MyEventsComponent,
    MyMapsComponent,
    MyCalendarComponent,
    MyEventCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
