import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL_PREFIX } from '../utils/constants';
import { Employee, EmployeeRole } from '../models/employee.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly employeeUrl = BACKEND_URL_PREFIX + '/Users';

  constructor(private readonly http: HttpClient) {}

  getAllEmployee(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.employeeUrl)
      .pipe(
        map((res) => res.sort((a, b) => a.userName.localeCompare(b.userName)))
      );
  }

  addEmployee(employee: {
    userName: string;
    email: string;
    hourlyWage: number;
    phoneNumber: string;
    role: EmployeeRole;
  }): Observable<Employee> {
    return this.http.post<Employee>(this.employeeUrl, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(this.employeeUrl + `/${id}`);
  }

  updateEmployeeHourlyWage(
    hourlyWage: number,
    employeeId: string
  ): Observable<any> {
    return this.http.post<Employee>(this.employeeUrl + `/${employeeId}/wage`, {
      hourlyWage,
    });
  }
}
