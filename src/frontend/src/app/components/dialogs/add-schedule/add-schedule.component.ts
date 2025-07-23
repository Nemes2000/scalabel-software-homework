import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoPipe } from '@jsverse/transloco';
import { SchedulePageComponent } from '../../../pages/manager/schedule/schedule.component';
import { provideNativeDateTimeAdapter } from '@dhutaryan/ngx-mat-timepicker';
import { checkShiftFinishTime } from '../../../validators/schedule-finish-time-validator';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-schedule',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    TranslocoPipe,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    CommonModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,
  ],
  providers: [provideNativeDateTimeAdapter()],
  templateUrl: './add-schedule.component.html',
  styleUrl: './add-schedule.component.scss',
})
export class AddScheduleComponent {
  readonly dialogRef = inject(MatDialogRef<SchedulePageComponent>);
  readonly data = inject<{
    employees: { id: string; userName: string; role: string }[];
    minTime: string;
    maxTime: string;
  }>(MAT_DIALOG_DATA);

  form = new FormGroup(
    {
      employee: new FormControl(this.data.employees[0].id, Validators.required),
      from: new FormControl(new Date(this.data.minTime), Validators.required),
      to: new FormControl(new Date(this.data.minTime), Validators.required),
    },
    {
      validators: [checkShiftFinishTime('from', 'to', false)],
    }
  );

  onNoClick(): void {
    this.dialogRef.close();
  }
}
