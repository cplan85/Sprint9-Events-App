import { User } from './../interfaces/interfaces';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/interfaces';
import { catchError, map, tap, Observable } from 'rxjs';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //CODE TO TEST FROM STACK OVERFLOW
LoggedIn : Subject<any> = new Subject<any>();
myData : any ;

myDataSetter(data = false){
 this.myData = data;
 this.LoggedIn.next(this.myData);
}
//END OF GENERIC CODE FROM STACK OVERFLOW

  private baseUrl: string = environment.baseUrl;
  private _user:  User ={ uid: '',
    name: '',
    userName: '',
    password: '',
    email: ''
}

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
            userName: resp.userName!,
            uid: resp.uid!,
            email: resp.email!,
          }
          this.myDataSetter(true);
         }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    );

  }

  register(name: string, userName: string, email:string, password: string) {

    const url = `${this.baseUrl}auth/new`;
    const body = {name, userName, email, password};

    return  this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        console.log(resp, '<== response from auth service')

        if (resp.ok) {

          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            userName: resp.userName!,
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
          userName: resp.userName!,
          uid: resp.uid!,
          email: resp.email!,
        }
        this.myDataSetter(true);
        return resp.ok
      }),
      //of(false will return false if there is an error)
      catchError(err => of(false))
    )

  }

  logout() {
    console.log('im logged out')
    localStorage.clear();
    this.myDataSetter(false);
  }
}
