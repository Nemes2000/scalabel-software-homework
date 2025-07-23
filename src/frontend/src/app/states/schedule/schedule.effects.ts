import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, mergeMap, of, withLatestFrom } from 'rxjs';
import {
  addSchedule,
  addScheduleToList,
  deleteSchedule,
  deleteScheduleFromList,
  getDaySchedule,
  updateWorkday,
  setDaySchedule,
  getUserOwnWorkHourIntervals,
  setUserOwnWorkHourIntervals,
  updateWorkdayInState,
  createWorkdayInState,
  createWorkday,
} from './schedule.action';
import { ScheduleService } from '../../services/schedule.service';
import { noAction } from '../app.actions';
import { PopupService } from '../../services/popup.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ScheduleEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly scheduleService: ScheduleService,
    private readonly popupService: PopupService
  ) {}

  getDaySchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDaySchedule),
      exhaustMap(({ date }) =>
        this.scheduleService
          .getDaySchedule(date)
          .pipe(
            mergeMap((workdayDetails) => of(setDaySchedule({ workdayDetails })))
          )
      )
    )
  );

  updateWorkday$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateWorkday),
      withLatestFrom(this.store$),
      exhaustMap(([{ workday }, store]) =>
        this.scheduleService
          .updateDaySchedule(
            store.scheduleFeature.workdayDetails?.workday.id!,
            workday.isOpen,
            workday.openingTime,
            workday.closingTime
          )
          .pipe(
            mergeMap((workdayDetails) =>
              of(updateWorkdayInState({ workdayDetails }))
            )
          )
      )
    )
  );

  createWorkdayInState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createWorkday),
      exhaustMap(({ workday }) =>
        this.scheduleService
          .createDaySchedule(
            workday.isOpen,
            workday.date,
            workday.openingTime,
            workday.closingTime
          )
          .pipe(mergeMap((workday) => of(createWorkdayInState({ workday }))))
      )
    )
  );

  addSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSchedule),
      exhaustMap((data) =>
        this.scheduleService.addScheduleToDay(data).pipe(
          mergeMap((schedule) => of(addScheduleToList({ schedule }))),
          catchError((error) => {
            this.popupService.callPopUpShowMethod(
              'A felhasználót már beosztotta az intervallumba egyszer!'
            );
            return of(noAction());
          })
        )
      )
    )
  );

  deleteSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSchedule),
      exhaustMap(({ scheduleId }) =>
        this.scheduleService.deleteSchedule(scheduleId).pipe(
          mergeMap((_) =>
            of(
              deleteScheduleFromList({
                scheduleId,
              })
            )
          )
        )
      )
    )
  );
}
