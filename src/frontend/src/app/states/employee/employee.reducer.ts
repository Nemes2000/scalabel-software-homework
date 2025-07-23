import { createReducer, on } from '@ngrx/store';

import { initialState } from './employee.state';
import {
  setEmployeeList,
  setFilterText,
  addEmployeeToList,
  removeEmployeeFromList,
  updateEmployeeInList,
} from './employee.actions';
import { noAction } from '../app.actions';

export const employeeReducer = createReducer(
  initialState,
  on(setEmployeeList, (state, { employees }) => {
    return {
      ...state,
      employeeList: employees,
    };
  }),
  on(setFilterText, (state, { filter }) => {
    return {
      ...state,
      filterText: filter,
    };
  }),
  on(addEmployeeToList, (state, { employee }) => {
    const newEmployee = { ...employee };
    const newList = [...state.employeeList, newEmployee].sort((a, b) =>
      a.userName.localeCompare(b.userName)
    );
    return {
      ...state,
      employeeList: newList,
    };
  }),
  on(removeEmployeeFromList, (state, { id }) => {
    const newList = [...state.employeeList].filter(
      (employee) => employee.id != id
    );
    return {
      ...state,
      employeeList: newList,
    };
  }),
  on(updateEmployeeInList, (state, { hourlyWage, id }) => {
    const newList = state.employeeList.map((element) => {
      if (element.id === id) return { ...element, hourlyWage };
      return element;
    });
    return {
      ...state,
      stockList: newList,
    };
  }),
  on(noAction, (state, {}) => {
    return { ...state };
  })
);
