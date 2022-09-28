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

 //DETECT CHANGE IN MY EVENTS
 myEventsSubject : Subject<any> = new Subject<any>();
 myEventsData : any ;
 
 deletedEventsDataSetter(data : any){
  this.myEventsData = data;
  this.myEventsSubject.next(this.myEventsData);
 }
 //END OF DETECT CHANGE IN MY EVENTS

  //DETECT WHEN EVENT ADDED
  addedEventSubject : Subject<any> = new Subject<any>();
  addedEventData : any ;
  
  addedEventsDataSetter(data : any){
   this.addedEventData = data;
   this.addedEventSubject.next(this.addedEventData);
  }
  //END OF DETECT WHEN EVENT ADDED

  private baseUrl: string = environment.baseUrl;
  public _user:  User ={ uid: '',
    name: '',
    userName: '',
    password: '',
    email: '',
    events: [],
    maps: [],
}

newUser: User = {
  uid: '',
    name: '',
    userName: '',
    password: '',
    email: '',
    events: [],
    maps: [],

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
            events: resp.events!,
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
            events: resp.events!,
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
          events: resp.events!,
          maps: resp.maps!,
        }
        this.myDataSetter(true);
        return resp.ok
      }),
      //of(false will return false if there is an error)
      catchError(err => of(false))
    )

  }

  addEvent( email:string, id: string, name: string, url: string, date: string, startTime: string, img: string | undefined, min: number, max: number, currency: string | undefined, venue: string, venueImages: string | undefined, venueUrl: string, 
    address: string, promoter: string | undefined, type: string, lat: number, long: number, seatmapImg : string | undefined, note: string | undefined) {

    const apiUrl = `${this.baseUrl}events/add`;
    const body = {email, id, name, url, date, startTime, img, min, max, currency, venue, venueImages, venueUrl,
    address, promoter, type, lat, long, seatmapImg, note};

    return  this.http.post<AuthResponse>(apiUrl, body)
    .pipe(
      tap( resp => {
        console.log(resp, '<== respons from auth service - Create Event')
        this.addedEventsDataSetter('add');
        if (resp.ok) {
          console.log("event successfully added");
         }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    );

  }


  editEvent( email:string, id: string, note: string | undefined) {

    const apiUrl = `${this.baseUrl}events/update`;
    const body = {email, id, note};
    
    

    return  this.http.post<AuthResponse>(apiUrl, body)
    .pipe(
      tap( resp => {
        console.log(resp, '<== respons from auth service - Edit Event')

        if (resp.ok) {
          console.log("event successfully added")
         }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    );

  }

  deleteEvent (email: string, id: string) {
    const apiUrl = `${this.baseUrl}events/delete`;

    const body = {email, id};

    return  this.http.post<AuthResponse>(apiUrl, body)
    .pipe(
      tap( resp => {
        console.log(resp, '<== respons from auth service - Delete Event')
        this.deletedEventsDataSetter(id);
        if (resp.ok) {
          console.log("Event successfully deleted")
         }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    );
  }


  logout() {
    localStorage.clear();
    this.myDataSetter(false);
    this._user = { uid: '',
    name: '',
    userName: '',
    password: '',
    email: '',
    events: [],
    maps: [],
}
  }
}
