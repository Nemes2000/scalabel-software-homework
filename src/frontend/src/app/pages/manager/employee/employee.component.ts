import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentsModule } from '../../../components/component.module';
import { TranslocoPipe } from '@jsverse/transloco';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeDialogComponent } from '../../../components/dialogs/create-employee-dialog/create-employee-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Subscription } from 'rxjs';
import { selectFilteredEmployeeList } from '../../../states/employee/employee.selector';
import {
  addEmployee,
  deleteEmployee,
  getAllEmployee,
  setFilterText,
  updateEmployeeHourlyWage,
} from '../../../states/employee/employee.actions';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    TranslocoPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  searchValue = null;
  filteredEmployees: Employee[] = [];
  subscriptionHandler!: Subscription;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllEmployee());
    this.subscriptionHandler = this.store
      .select(selectFilteredEmployeeList)
      .subscribe((res) => (this.filteredEmployees = res));
  }

  searchEmployees() {
    this.store.dispatch(setFilterText({ filter: this.searchValue }));
  }

  addNewEmployee() {
    const dialogRef = this.matDialog.open(CreateEmployeeDialogComponent, {
      width: '60%',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.userName) this.store.dispatch(addEmployee(result));
    });
  }

  saveHourlyWage(hourlyWage: number, employee: Employee) {
    this.store.dispatch(
      updateEmployeeHourlyWage({ id: employee.id, hourlyWage })
    );
  }

  deleteEmployee(employee: Employee) {
    this.store.dispatch(deleteEmployee({ id: employee.id }));
  }

  ngOnDestroy(): void {
    this.subscriptionHandler?.unsubscribe();
  }
}
