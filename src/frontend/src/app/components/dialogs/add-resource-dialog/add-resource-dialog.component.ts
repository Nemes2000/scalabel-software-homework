import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { StockPageComponent } from '../../../pages/manager/stock/stock.component';
import { NewResourceDialogData } from '../../../models/new-resource.model';
import { TranslocoPipe } from '@jsverse/transloco';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-resource-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslocoPipe,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-resource-dialog.component.html',
  styleUrl: './add-resource-dialog.component.scss',
})
export class AddResourceDialogComponent {
  readonly dialogRef = inject(MatDialogRef<StockPageComponent>);
  readonly data = inject<NewResourceDialogData>(MAT_DIALOG_DATA);
  units = ['Kilogram', 'Piece', 'Liter', 'Gram', 'Milliliter'];
  form = new FormGroup({
    resource: new FormControl(this.data.resource, Validators.required),
    selectedUnit: new FormControl(this.units[0], Validators.required),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
