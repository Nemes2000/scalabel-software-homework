import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Schedule, Workday, WorkdayDetails } from '../models/schedule.model';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL_PREFIX } from '../utils/constants';
import { WorkHourInterval } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly scheduleUrl = BACKEND_URL_PREFIX + '/Schedules';
  private readonly workdayUrl = BACKEND_URL_PREFIX + '/Workday';

  constructor(private readonly http: HttpClient) {}

  getDaySchedule(date: string): Observable<WorkdayDetails | null> {
    return this.http.get<WorkdayDetails>(this.workdayUrl + '/by-date', {
      params: { date: date.split('T')[0] },
    });
  }

  addScheduleToDay(data: {
    workdayId: number;
    employeeId: string;
    from: Date;
    to: Date;
  }): Observable<Schedule> {
    return this.http.post<Schedule>(this.scheduleUrl, data);
  }

  deleteSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(this.scheduleUrl + `/${scheduleId}`);
  }

  updateDaySchedule(
    id: number,
    isOpen: boolean,
    openingTime: string | null,
    closingTime: string | null
  ): Observable<WorkdayDetails> {
    const body = {
      isOpen: isOpen,
      openingTime: openingTime,
      closingTime: closingTime,
    };
    return this.http.patch<WorkdayDetails>(this.workdayUrl + `/${id}`, body);
  }

  createDaySchedule(
    isOpen: boolean,
    date: string,
    openingTime: string | null,
    closingTime: string | null
  ): Observable<Workday> {
    return this.http.post<Workday>(this.workdayUrl, {
      isOpen,
      openingTime,
      closingTime,
      date: date.split('T')[0],
    });
  }

  copyDay(workdayId: number) {
    return this.http
      .post(this.scheduleUrl + '/copy-day', {
        workdayId,
      })
      .subscribe(() => {});
  }

  copyWeek(fromDate: Date) {
    return this.http
      .post(this.scheduleUrl + '/copy-week', {
        fromDate: fromDate.toISOString().split('T')[0],
      })
      .subscribe(() => {});
  }
}
