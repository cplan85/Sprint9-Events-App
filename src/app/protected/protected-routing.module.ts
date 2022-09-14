import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { MyMapsComponent } from './my-maps/my-maps.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path: '', component: MainDashboardComponent},
      {
        path: 'my-events',
        component: MyEventsComponent
      },
      {
        path: 'my-maps',
        component: MyMapsComponent
      },
      {
        path: 'my-calendar',
        component: MyCalendarComponent
      },
      {path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
