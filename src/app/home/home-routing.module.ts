import { HomeComponent } from './home/home.component';
import { EventComponent } from './pages/event/event.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMainComponent } from './components/home-main/home-main.component';

const routes: Routes = [
  {  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'main',
      component: HomeMainComponent
    },
    {
      path: ':id',
      component: EventComponent
    },
    {
      path: '**',
      redirectTo: 'main'
    },

  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
