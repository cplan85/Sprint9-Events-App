import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyCalendarComponent implements OnInit {

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 4 || date === 20 || date === 9 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  today = new Date();
  selected: Date | null = this.today;
  constructor() { }

  ngOnInit(): void {
  }

}
