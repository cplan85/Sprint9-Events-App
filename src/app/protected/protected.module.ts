import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';


@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
