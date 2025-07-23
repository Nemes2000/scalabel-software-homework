import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { EmployeeFeature } from './employee.state';

export const selectEmployeeFeature = (state: AppState) => state.employeeFeature;

export const selectEmployeeList = createSelector(
  selectEmployeeFeature,
  (state: EmployeeFeature) => state.employeeList
);

export const selectFilteredEmployeeList = createSelector(
  selectEmployeeFeature,
  (state: EmployeeFeature) => {
    if (state.filterText)
      return state.employeeList.filter((employee) =>
        employee.userName
          .toLowerCase()
          .startsWith(state.filterText!.toLowerCase())
      );
    return state.employeeList;
  }
);
