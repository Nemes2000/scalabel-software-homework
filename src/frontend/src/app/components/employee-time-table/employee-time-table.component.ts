import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { selectOwnWorkHourIntervals } from '../../states/schedule/schedule.selector';
import { getUserOwnWorkHourIntervals } from '../../states/schedule/schedule.action';
import { Observable, of } from 'rxjs';
import { WorkHourInterval } from '../../models/employee.model';

@Component({
  selector: 'app-employee-time-table',
  templateUrl: './employee-time-table.component.html',
  styleUrl: './employee-time-table.component.scss',
})
export class EmployeeTimeTableComponent implements OnInit {
  ownSchedules$: Observable<WorkHourInterval[]> = of([]); //TODO: ngoninit be raktam
  displayedColumns: string[] = ['day', 'from', 'to', 'inHours'];
  constructor(private readonly store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(getUserOwnWorkHourIntervals());
    this.ownSchedules$ = this.store.select(selectOwnWorkHourIntervals);
  }

  getDay(date: Date) {
    return `${this.toLeadingZero(date.getMonth() + 1)}. ${this.toLeadingZero(
      date.getDate()
    )}`;
  }

  getHourAndSec(date: Date) {
    return `${this.toLeadingZero(date.getHours())}:${this.toLeadingZero(
      date.getMinutes()
    )}`;
  }

  getTimeInHours(from: Date, to: Date) {
    return Math.round((to.getTime() - from.getTime()) / 1000 / 3600);
  }

  private toLeadingZero(value: number) {
    return value.toString().padStart(2, '0');
  }
}
