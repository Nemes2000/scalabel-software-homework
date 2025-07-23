import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { catchError, exhaustMap, mergeMap, of } from 'rxjs';
import {
  getAllEmployee,
  setEmployeeList,
  addEmployee,
  addEmployeeToList,
  deleteEmployee,
  removeEmployeeFromList,
  updateEmployeeInList,
  updateEmployeeHourlyWage,
} from './employee.actions';
import { EmployeeService } from '../../services/emloyee.service';
import { PopupService } from '../../services/popup.service';
import { noAction } from '../app.actions';

@Injectable()
export class EmployeeEffects {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly popupService: PopupService
  ) {}
  getAllEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllEmployee),
      exhaustMap(() =>
        this.employeeService
          .getAllEmployee()
          .pipe(mergeMap((employees) => of(setEmployeeList({ employees }))))
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      exhaustMap((employee) =>
        this.employeeService.addEmployee(employee).pipe(
          mergeMap((newEmployee) =>
            of(addEmployeeToList({ employee: newEmployee }))
          ),
          catchError((error) => {
            this.popupService.callPopUpShowMethod(
              'Ilyen nevű felhasználó már létezik!'
            );
            return of(noAction());
          })
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      exhaustMap(({ id }) =>
        this.employeeService
          .deleteEmployee(id)
          .pipe(mergeMap((_) => of(removeEmployeeFromList({ id }))))
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmployeeHourlyWage),
      exhaustMap(({ id, hourlyWage }) =>
        this.employeeService
          .updateEmployeeHourlyWage(hourlyWage, id)
          .pipe(mergeMap((_) => of(updateEmployeeInList({ hourlyWage, id }))))
      )
    )
  );
}
