import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoPipe } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {
  MatNativeDateTimeModule,
  MatTimepickerModule,
  provideNativeDateTimeAdapter,
} from '@dhutaryan/ngx-mat-timepicker';
import { LOCALIZATION_STR } from '../../../utils/constants';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import {
  isEnoughEmployeeInRole,
  selectEmployeesInCategory,
  selectWorkdayDetails,
} from '../../../states/schedule/schedule.selector';
import {
  addSchedule,
  createWorkday,
  deleteSchedule,
  getDaySchedule,
  updateWorkday,
} from '../../../states/schedule/schedule.action';
import { ScheduleService } from '../../../services/schedule.service';
import { Schedule, Workday } from '../../../models/schedule.model';
import { selectEmployeeList } from '../../../states/employee/employee.selector';
import { AddScheduleComponent } from '../../../components/dialogs/add-schedule/add-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { getAllEmployee } from '../../../states/employee/employee.actions';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { scheduleOpenDateValidator } from '../../../validators/schedule-open-date-validator';
import { EmployeeRole } from '../../../models/employee.model';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MatNativeDateTimeModule,
    MatTimepickerModule,
    TranslocoPipe,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatExpansionModule,
    MatDividerModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    CommonModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
  ],
  providers: [provideNativeDateTimeAdapter()],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class SchedulePageComponent implements OnInit, OnDestroy {
  isEnoughWaiterWarn$: Observable<boolean> = of(false);
  isEnoughChefWarn$: Observable<boolean> = of(false);

  waiters$!: Observable<Schedule[]>;
  chefs$!: Observable<Schedule[]>;
  subscriptionhandler!: Subscription;

  LOCALIZATION_STR = LOCALIZATION_STR;

  closingDates: { viewValue: string; value: string }[] = [];
  minCloseTime!: string;
  selectedDate!: string;

  form = new FormGroup(
    {
      isOpen: new FormControl(false),
      openingTime: new FormControl(''),
      closingTime: new FormControl(''),
      closingDay: new FormControl(''),
    },
    {
      validators: [
        scheduleOpenDateValidator(
          'isOpen',
          'openingTime',
          'closingTime',
          'closingDay'
        ),
      ],
    }
  );

  isScheduleChanged = false;
  originalWorkday: Workday | undefined;
  employees: { id: string; userName: string; role: string }[] = [];

  constructor(
    private readonly matDialog: MatDialog,
    private readonly store: Store<AppState>,
    private readonly scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.isEnoughChefWarn$ = this.store.select(
      isEnoughEmployeeInRole(EmployeeRole.Kitchen)
    );
    this.isEnoughWaiterWarn$ = this.store.select(
      isEnoughEmployeeInRole(EmployeeRole.Waiter)
    );
    this.waiters$ = this.store.select(
      selectEmployeesInCategory(EmployeeRole.Waiter)
    );
    this.chefs$ = this.store.select(
      selectEmployeesInCategory(EmployeeRole.Kitchen)
    );

    const date = new Date().toLocaleDateString(this.LOCALIZATION_STR);
    this.onDateChange(new Date(date));

    this.subscriptionhandler = this.store
      .select(selectWorkdayDetails)
      .subscribe((res) => {
        this.isScheduleChanged = false;
        console.log(res);
        if (res) {
          this.originalWorkday = {
            id: res.id,
            date: new Date(new Date(res.date).setHours(12, 0, 0)).toISOString(),
            isOpen: res.isOpen,
            openingTime: res.openingTime,
            closingTime: res.closingTime,
          };

          this.minCloseTime = res.isOpen
            ? new Date(res.closingTime!).getDate() ==
              new Date(res.openingTime!).getDate()
              ? this.form.value.openingTime!
              : ''
            : '';

          this.form.setValue({
            isOpen: this.originalWorkday.isOpen,
            openingTime: this.originalWorkday.openingTime,
            closingTime: this.originalWorkday.closingTime,
            closingDay: this.originalWorkday.closingTime
              ? new Date(
                  new Date(this.originalWorkday.closingTime).setHours(
                    12,
                    0,
                    0,
                    0
                  )
                ).toISOString()
              : null,
          });
        } else {
          this.originalWorkday = undefined;
          this.form.setValue({
            isOpen: false,
            openingTime: null,
            closingTime: null,
            closingDay: null,
          });

          this.minCloseTime = '';
        }

        this.createClosingDays();
      });

    this.store.dispatch(getAllEmployee());
    this.subscriptionhandler.add(
      this.store.select(selectEmployeeList).subscribe((employees) => {
        this.employees = employees.map((employee) => {
          return {
            id: employee.id,
            userName: employee.userName,
            role: employee.role,
          };
        });
      })
    );
  }

  createClosingDays() {
    let today = this.convertStringToNextDayListElement(this.selectedDate);
    let p_date = new Date(this.selectedDate);
    let next_day = new Date(p_date.setDate(p_date.getDate() + 1)).toISOString();
    let tomorrow = this.convertStringToNextDayListElement(next_day);
    this.closingDates = [today, tomorrow];
  }

  convertStringToNextDayListElement(dateString: string) {
    const date = new Date(dateString).toISOString();
    const viewData = date.split('T')[0];
    return {
      value: dateString,
      viewValue: viewData,
    };
  }

  onDateChange(date: any) {
    let day = date._d ? date._d : date;
    this.selectedDate = new Date(day.setHours(12, 0, 0, 0)).toISOString();
    this.store.dispatch(getDaySchedule({ date: this.selectedDate }));
  }

  setMinClosingTime(): void {
    this.minCloseTime = this.form.value.openingTime!;
    if (
      this.form.value.closingTime &&
      new Date(this.form.value.closingTime).getTime() <
        new Date(this.minCloseTime).getTime()
    )
      this.form.patchValue({ closingTime: this.minCloseTime });

    this.checkForChanges();
  }

  onSelectionChange() {
    this.minCloseTime =
      new Date(this.selectedDate).getDate() ==
      new Date(this.form.value.closingDay!).getDate()
        ? this.form.value.openingTime!
        : '';

    if (
      this.form.value.closingTime &&
      this.form.value.openingTime &&
      new Date(this.form.value.closingTime).getTime() >
        new Date(
          new Date(this.form.value.openingTime).setHours(24, 0, 0)
        ).getTime()
    )
      this.form.patchValue({
        closingTime: new Date(
          new Date(this.form.value.openingTime).setHours(23, 59, 0)
        ).toISOString(),
      });

    this.checkForChanges();
  }

  checkForChanges() {
    let closingDay = this.form.value.closingDay
      ? new Date(this.form.value.closingDay).getDate()
      : 0;
    let closingTime = this.form.value.closingTime
      ? new Date(
          new Date(this.form.value.closingTime).setDate(closingDay)
        ).toISOString()
      : null;

    let openingTime = this.form.value.openingTime
      ? new Date(this.form.value.openingTime).toISOString()
      : null;

    this.isScheduleChanged = !(
      closingTime == this.originalWorkday?.closingTime &&
      openingTime == this.originalWorkday?.openingTime &&
      this.form.value.isOpen == this.originalWorkday?.isOpen
    );
  }

  saveScheduleDatas() {
    let openingTime = this.form.value.openingTime
      ? new Date(this.form.value.openingTime)
      : null;
    let correctOpeningTime = openingTime
      ? new Date(new Date(openingTime).setHours(openingTime.getHours() + 1))
          .toISOString()
          .slice(0, 16)
      : null;

    let closeDay = this.form.value.closingDay
      ? new Date(this.form.value.closingDay).getDate()
      : null;
    let closingTime = closeDay
      ? new Date(new Date(this.form.value.closingTime!).setDate(closeDay))
      : null;
    let correctClosingTime = closingTime
      ? new Date(new Date(closingTime).setHours(closingTime.getHours() + 1))
          .toISOString()
          .slice(0, 16)
      : null;

    if (this.originalWorkday) {
      this.store.dispatch(
        updateWorkday({
          workday: {
            openingTime: correctOpeningTime,
            closingTime: correctClosingTime,
            id: this.originalWorkday.id,
            isOpen: this.form.value.isOpen!,
          },
        })
      );
    } else {
      this.store.dispatch(
        createWorkday({
          workday: {
            openingTime: correctOpeningTime,
            closingTime: correctClosingTime,
            isOpen: this.form.value.isOpen!,
            date: this.selectedDate,
          },
        })
      );
    }
  }

  deleteSchedule(schedule: Schedule) {
    this.store.dispatch(deleteSchedule({ scheduleId: schedule.schedule.id }));
  }

  ngOnDestroy(): void {
    this.subscriptionhandler?.unsubscribe();
  }

  copyWeek() {
    const d = new Date(this.selectedDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const mondayOfWeek = new Date(d.setDate(diff));
    this.scheduleService.copyWeek(mondayOfWeek);
  }

  copyDay() {
    this.scheduleService.copyDay(this.originalWorkday!.id);
  }

  workdayChange(event: any) {
    if (!event.checked) {
      this.form.patchValue({
        openingTime: '',
        closingTime: '',
        closingDay: '',
      });
      this.minCloseTime = '';
    }

    this.checkForChanges();
  }

  addNewSchedule() {
    const dialogRef = this.matDialog.open(AddScheduleComponent, {
      data: {
        minTime: this.originalWorkday!.openingTime,
        maxTime: this.originalWorkday!.closingTime,
        employees: this.employees,
      },
      width: '60%',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.from && result?.to) {
        let from = result.from?._d ? result.from._d : result.from;
        let to = result.to?._d ? result.to._d : result.to;

        from = new Date(from.setHours(from.getHours() + 1))
          .toISOString()
          .slice(0, 19);
        to = new Date(to.setHours(to.getHours() + 1))
          .toISOString()
          .slice(0, 19);

        this.store.dispatch(
          addSchedule({
            workdayId: this.originalWorkday!.id,
            employeeId: result.employeeId,
            from,
            to,
          })
        );
      }
    });
  }
}
