import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ScheduleFeature } from './schedule.state';

export const selectScheduleFeature = (state: AppState) => state.scheduleFeature;

export const selectEmployeesInCategory = (category: string) =>
  createSelector(selectScheduleFeature, (state: ScheduleFeature) => {
    return state.workdayDetails
      ? state.workdayDetails.schedules
          .filter((schedule) => schedule.employee.role == category)
          .sort(
            (a, b) =>
              new Date(a.schedule.from).getTime() -
              new Date(b.schedule.from).getTime()
          )
      : [];
  });

export const selectWorkdayDetails = createSelector(
  selectScheduleFeature,
  (state: ScheduleFeature) => state.workdayDetails?.workday
);

export const isEnoughEmployeeInRole = (role: string) =>
  createSelector(selectScheduleFeature, (state: ScheduleFeature) => {
    if (!state.workdayDetails?.workday.isOpen) return true;

    let oneEmployeeCategory = state.workdayDetails.schedules.filter(
      (schedule) => schedule.employee.role == role
    );

    let opening = new Date(state.workdayDetails.workday.openingTime!);
    let closing = new Date(state.workdayDetails.workday.closingTime!);

    oneEmployeeCategory = oneEmployeeCategory.sort(
      (a, b) =>
        new Date(a.schedule.from).getTime() -
        new Date(b.schedule.from).getTime()
    );

    for (let employee of oneEmployeeCategory) {
      let from = new Date(employee.schedule.from);
      let to = new Date(employee.schedule.to);

      if (from.getTime() > opening.getTime()) {
        return false;
      } else {
        opening = to.getTime() > opening.getTime() ? to : opening;
      }
    }

    if (opening.getTime() < closing.getTime()) return false;

    return true;
  });

export const selectOwnWorkHourIntervals = createSelector(
  selectScheduleFeature,
  (state: ScheduleFeature) => state.ownSchedules
);
