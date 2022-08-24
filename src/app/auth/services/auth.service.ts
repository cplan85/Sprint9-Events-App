import { User } from './../interfaces/interfaces';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/interfaces';
import { catchError, map, tap, Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!:  User;

  get user() {
    return {...this._user};
  }
  constructor(private http: HttpClient ) { }

  login( email:string, password: string) {

    const url = `${this.baseUrl}auth`;
    const body = {email, password};

    return  this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        console.log(resp, '<== respons from auth service')

        if (resp.ok) {

          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
          }
         }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    );

  }

  register(name: string, email:string, password: string) {

    const url = `${this.baseUrl}auth/new`;
    const body = {name, email, password};

    return  this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        console.log(resp, '<== response from auth service')

        if (resp.ok) {

          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
          }
         }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    );

  }

  validateToken():Observable<boolean> {

    const url = `${this.baseUrl}auth/renew`;

    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');


    return this.http.get<AuthResponse>(url, {headers})
    .pipe(
      map(resp => {

        localStorage.setItem('token', resp.token!)
        this._user = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
        }
        return resp.ok
      }),
      //of(false will return false if there is an error)
      catchError(err => of(false))
    )

  }

  logout() {
    localStorage.clear();
  }
}
