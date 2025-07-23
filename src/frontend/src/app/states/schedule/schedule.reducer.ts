import { createReducer, on } from '@ngrx/store';
import { initialState } from './schedule.state';
import {
  addScheduleToList,
  setDaySchedule,
  setUserOwnWorkHourIntervals,
  deleteScheduleFromList,
  updateWorkdayInState,
  createWorkdayInState,
} from './schedule.action';
import { noAction } from '../app.actions';

export const scheduleReducer = createReducer(
  initialState,
  on(setDaySchedule, (state, { workdayDetails }) => {
    return {
      ...state,
      workdayDetails,
    };
  }),
  on(deleteScheduleFromList, (state, { scheduleId }) => {
    let schedules = [...state.workdayDetails!.schedules].filter(
      (schedule) => schedule.schedule.id !== scheduleId
    );
    return {
      ...state,
      workdayDetails: {
        ...state.workdayDetails!,
        schedules,
      },
    };
  }),
  on(addScheduleToList, (state, { schedule }) => {
    let schedules = [...state.workdayDetails!.schedules, schedule];
    return {
      ...state,
      workdayDetails: {
        ...state.workdayDetails!,
        schedules,
      },
    };
  }),
  on(updateWorkdayInState, (state, { workdayDetails }) => {
    return {
      ...state,
      workdayDetails,
    };
  }),
  on(createWorkdayInState, (state, { workday }) => {
    return {
      ...state,
      workdayDetails: {
        workday,
        schedules: [],
      },
    };
  }),
  on(setUserOwnWorkHourIntervals, (state, { workHourIntervals }) => {
    return {
      ...state,
      ownSchedules: workHourIntervals,
    };
  }),
  on(noAction, (state, {}) => {
    return { ...state };
  })
);
