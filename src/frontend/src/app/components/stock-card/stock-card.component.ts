import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockResource } from '../../models/stock-resource.model';
import { FormControl, Validators } from '@angular/forms';
import { NumberErrorStateMatcher } from '../../matchers/number.error.state.matcher';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss',
})
export class StockCardComponent implements OnInit {
  @Input() stockResource!: StockResource;
  @Output() updateEvent = new EventEmitter<{
    stock: StockResource;
    amount: number;
  }>();
  @Output() deleteEvent = new EventEmitter<void>();

  resourceFormControl = new FormControl(0, [
    Validators.required,
    Validators.pattern(/^\d+(\.\d+)?$/),
  ]);

  matcher = new NumberErrorStateMatcher();
  constructor() {}

  ngOnInit(): void {
    this.resourceFormControl.patchValue(this.stockResource.amount);
  }

  increaseAmount() {
    let value = this.resourceFormControl.value!;
    this.resourceFormControl.setValue(value + 1);
  }

  decreaseAmount() {
    if (this.stockResource.amount > 0) {
      let value = this.resourceFormControl.value!;
      this.resourceFormControl.setValue(value - 1);
    }
  }

  save() {
    if (this.resourceFormControl.valid) {
      this.updateEvent.emit({
        stock: this.stockResource,
        amount: this.resourceFormControl.value!,
      });
    }
  }

  delete() {
    this.deleteEvent.emit();
  }
}
