import { createAction, props } from '@ngrx/store';
import { Schedule, Workday, WorkdayDetails } from '../../models/schedule.model';
import { WorkHourInterval } from '../../models/employee.model';

export const getDaySchedule = createAction(
  "[SCHEDULE] Get day's schedule",
  props<{ date: string }>()
);

export const setDaySchedule = createAction(
  "[SCHEDULE] Set day's schedule",
  props<{ workdayDetails: WorkdayDetails | null }>()
);

export const addSchedule = createAction(
  '[SCHEDULE] Add schedule',
  props<{
    workdayId: number;
    employeeId: string;
    from: Date;
    to: Date;
  }>()
);

export const addScheduleToList = createAction(
  '[SCHEDULE] Add schedule to state',
  props<{ schedule: Schedule }>()
);

export const deleteSchedule = createAction(
  '[SCHEDULE] Delete schedule',
  props<{ scheduleId: number }>()
);

export const deleteScheduleFromList = createAction(
  '[SCHEDULE] Delete schedule from state',
  props<{ scheduleId: number }>()
);

export const updateWorkday = createAction(
  "[SCHEDULE] Save day's schedule",
  props<{
    workday: {
      id: number;
      isOpen: boolean;
      openingTime: string | null;
      closingTime: string | null;
    };
  }>()
);

export const createWorkday = createAction(
  "[SCHEDULE] Create day's schedule",
  props<{
    workday: {
      isOpen: boolean;
      date: string;
      openingTime: string | null;
      closingTime: string | null;
    };
  }>()
);

export const updateWorkdayInState = createAction(
  "[SCHEDULE] Update day's schedule in state",
  props<{ workdayDetails: WorkdayDetails }>()
);

export const createWorkdayInState = createAction(
  "[SCHEDULE] Create day's schedule in state",
  props<{ workday: Workday }>()
);

export const getUserOwnWorkHourIntervals = createAction(
  '[SCHEDULE] Get own work hour intervals'
);

export const setUserOwnWorkHourIntervals = createAction(
  '[SCHEDULE] Set own work intervals',
  props<{ workHourIntervals: WorkHourInterval[] }>()
);
