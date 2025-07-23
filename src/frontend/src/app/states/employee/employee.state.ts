import { Employee } from '../../models/employee.model';

export interface EmployeeFeature {
  employeeList: Employee[];
  filterText: string | null;
}

export const initialState: EmployeeFeature = {
  employeeList: [],
  filterText: null,
};
