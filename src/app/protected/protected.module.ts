import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material/material.module';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
