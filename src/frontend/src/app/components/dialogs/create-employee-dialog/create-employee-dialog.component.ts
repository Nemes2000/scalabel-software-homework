import { Component, inject } from '@angular/core';
import { EmployeePageComponent } from '../../../pages/manager/employee/employee.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslocoPipe } from '@jsverse/transloco';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateEmployeeModel } from '../../../models/create.employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslocoPipe,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-employee-dialog.component.html',
  styleUrl: './create-employee-dialog.component.scss',
})
export class CreateEmployeeDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EmployeePageComponent>);
  readonly data = inject<CreateEmployeeModel>(MAT_DIALOG_DATA);
  roles = ['Kitchen', 'Waiter'];

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    userName: new FormControl('', Validators.required),
    role: new FormControl(this.roles[0], Validators.required),
    hourlyWage: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/),
    ]),
    monthlyTip: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\+]?[0-9]{4,11}$/),
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  check() {
    return this.form.invalid;
  }
}
