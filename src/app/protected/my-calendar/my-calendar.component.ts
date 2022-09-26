import { AppEvent } from './../../home/interfaces/appEvents';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyCalendarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  userEvents: AppEvent[] | undefined = this.authService.user.events;

  filterEvent(date: Date): any{
   // let inputDate = Date.parse(date);
   // const covertedDate = new Date(inputDate)
    if(this.userEvents) {

     return this.userEvents.filter(event => {
        let mainDate = event.date;
        let myDate = Date.parse(mainDate);
        const dateObj = new Date(myDate);

        return dateObj.getDate() === date.getDate() && dateObj.getMonth() === date.getMonth()
      })
    }
  }

  //test string - get both date and start time 
  testDate: string ="2022-11-06 21:00:00";

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {

      const date = cellDate.getDate();
      const month = cellDate.getMonth();

      let ArgumentsArray: any[] = [];

    if( this.userEvents) {this.userEvents?.forEach(event => {
        let mainDate = event.date.concat(" ", event.startTime);
        let myDate = Date.parse(mainDate);
        const dateObj = new Date(myDate);

        ArgumentsArray.push(`(date === ${dateObj.getDate()} && month === ${dateObj.getMonth()})`)

        return (date === dateObj.getDate() && month === dateObj.getMonth()) || date === 9 ? 'example-custom-date-class' : '';
      })
    
    }
    let stringArguments = ArgumentsArray.join(' || ');
      return eval(stringArguments)? 'example-custom-date-class' : '';
    }

    if(view === 'year') {
      const date = cellDate.getMonth();

      let myDate = Date.parse(this.testDate);
      const dateObj = new Date(myDate)
      return date === dateObj.getMonth() || date === 20 || date === 9 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  today = new Date();
  selected: Date | null = this.today;

  ngOnInit(): void {
    console.log(this.userEvents, "user events")

   // console.log(this.filterEvent('Thu Sep 29 2022'), "filter event")
   
  }

}
