import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { StockPageComponent } from '../../../pages/manager/stock/stock.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoPipe } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-food-dialog',
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
  templateUrl: './add-food-dialog.component.html',
  styleUrl: './add-food-dialog.component.scss',
})
export class AddFoodDialogComponent {
  readonly dialogRef = inject(MatDialogRef<StockPageComponent>);
  readonly food = inject<string>(MAT_DIALOG_DATA);
  categories = ['Soup', 'Main', 'Dessert', 'FastFood', 'Beverage'];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/),
    ]),
    description: new FormControl('', Validators.required),
    category: new FormControl(this.categories[0], Validators.required),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
