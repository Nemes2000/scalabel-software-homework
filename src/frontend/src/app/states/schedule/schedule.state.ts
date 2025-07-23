import { WorkHourInterval } from '../../models/employee.model';
import { WorkdayDetails } from '../../models/schedule.model';

export interface ScheduleFeature {
  workdayDetails: WorkdayDetails | null;
  ownSchedules: WorkHourInterval[];
}

export const initialState: ScheduleFeature = {
  workdayDetails: null,
  ownSchedules: [],
};
