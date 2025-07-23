import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NumberErrorStateMatcher } from '../../matchers/number.error.state.matcher';

@Component({
  selector: 'app-employee-info-card',
  templateUrl: './employee-info-card.component.html',
  styleUrl: './employee-info-card.component.scss',
})
export class EmployeeInfoCardComponent implements OnInit {
  @Input() employee!: any;
  @Output() deleteEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter<number>();

  wageFormControl = new FormControl(0, [
    Validators.required,
    Validators.pattern(/^\d+(\.\d+)?$/),
  ]);
  matcher = new NumberErrorStateMatcher();

  ngOnInit(): void {
    this.wageFormControl.patchValue(this.employee.hourlyWage);
  }

  delete() {
    this.deleteEvent.emit();
  }

  save() {
    this.saveEvent.emit(this.wageFormControl.value!);
  }
}
