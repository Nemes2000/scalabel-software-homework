import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NumberErrorStateMatcher } from '../../matchers/number.error.state.matcher';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss',
})
export class FoodCardComponent implements OnInit {
  @Input() food!: Food;
  @Output() updateEvent = new EventEmitter<Food>();
  @Output() saveImageEvent = new EventEmitter<{ file: File; foodId: number }>();
  @Output() deleteEvent = new EventEmitter<void>();

  placeholderImage = '/assets/images/placeholder_150.png';
  categories = ['Soup', 'Main', 'Dessert', 'FastFood', 'Beverage'];
  descriptionFormControl = new FormControl('');
  categoryFormControl = new FormControl();
  priceFormControl = new FormControl(0, [
    Validators.required,
    Validators.pattern(/^\d+(\.\d+)?$/),
  ]);

  foodImagePath: string = '';

  matcher = new NumberErrorStateMatcher();

  constructor() {}

  ngOnInit(): void {
    this.categoryFormControl.patchValue(this.food.category);
    this.priceFormControl.patchValue(this.food.price);
    this.descriptionFormControl.patchValue(this.food.description);
    this.foodImagePath = this.food.imagePath
      ? this.food.imagePath + '?' + new Date().toISOString()
      : this.placeholderImage;
  }

  save() {
    if (this.priceFormControl.valid) {
      this.updateEvent.emit({
        ...this.food,
        price: this.priceFormControl.value!,
        description: this.descriptionFormControl.value!,
        category: this.categoryFormControl.value!,
      });
    }
  }

  delete() {
    this.deleteEvent.emit();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.saveImageEvent.emit({ file, foodId: this.food.id });
    }
  }
}
