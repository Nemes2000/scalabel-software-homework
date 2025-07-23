import { createAction, props } from '@ngrx/store';
import { Employee, EmployeeRole } from '../../models/employee.model';

export const getAllEmployee = createAction('[EMPLOYEE] Get all employee');

export const setEmployeeList = createAction(
  '[EMPLOYEE] Set employee list',
  props<{ employees: Employee[] }>()
);

export const setFilterText = createAction(
  '[EMPLOYEE] Set filter text',
  props<{ filter: string | null }>()
);

export const addEmployee = createAction(
  '[EMPLOYEE] Add employee',
  props<{
    userName: string;
    email: string;
    hourlyWage: number;
    phoneNumber: string;
    role: EmployeeRole;
  }>()
);

export const addEmployeeToList = createAction(
  '[EMPLOYEE] Add employee to list',
  props<{ employee: Employee }>()
);

export const deleteEmployee = createAction(
  '[EMPLOYEE] Delete employee by id',
  props<{ id: string }>()
);

export const removeEmployeeFromList = createAction(
  '[EMPLOYEE] Remove employee from list',
  props<{ id: string }>()
);

export const updateEmployeeHourlyWage = createAction(
  '[EMPLOYEE] Update employee',
  props<{ id: string; hourlyWage: number }>()
);

export const updateEmployeeInList = createAction(
  '[EMPLOYEE] Update employee',
  props<{ hourlyWage: number; id: string }>()
);
