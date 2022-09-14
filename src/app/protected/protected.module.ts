import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material/material.module';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyEventsComponent } from './my-events/my-events.component';
import { MyMapsComponent } from './my-maps/my-maps.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';


@NgModule({
  declarations: [
    MainDashboardComponent,
    MyEventsComponent,
    MyMapsComponent,
    MyCalendarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
