import { EventComponent } from './pages/event/event.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMainComponent } from './components/home-main/home-main.component';

const routes: Routes = [
  {  path: '',
  component: HomeMainComponent,
  children: [
 
    {
      path: ':id',
      component: EventComponent
    },
    {
      path: '**',
      redirectTo: ''
    },

  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
