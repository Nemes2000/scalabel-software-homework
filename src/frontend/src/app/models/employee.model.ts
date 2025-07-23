export interface Employee {
  id: string;
  userName: string;
  email: string;
  hourlyWage: number;
  phoneNumber: string;
  role: EmployeeRole;
}

export enum EmployeeRole {
  Kitchen = 'Kitchen',
  Waiter = 'Waiter',
}

export interface WorkerSchedule {
  id: number;
  name: string;
  type: string;
  from: Date;
  to: Date;
}

export interface WorkHourInterval {
  id: number;
  from: Date;
  to: Date;
  workdayId: number;
}
