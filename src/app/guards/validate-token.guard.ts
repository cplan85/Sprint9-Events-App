import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './../auth/services/auth.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(private authService:AuthService,
    private router: Router) {

  }
  canActivate(): Observable<boolean> | boolean {
    return this.authService.validateToken()
    .pipe(
      tap(valid => {
        if(!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    )
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateToken()
    .pipe(
      tap(valid => {
        if(!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    )
  }
}
