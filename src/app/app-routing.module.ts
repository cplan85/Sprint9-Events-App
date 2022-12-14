import { ValidateTokenGuard } from './guards/validate-token.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard]
  },
  {path:'',redirectTo:'home', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
   useHash: false 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
