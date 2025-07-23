import { Component, inject } from '@angular/core';
import { TablePageComponent } from '../../../pages/manager/table/table.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-add-table-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslocoPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './add-table-dialog.component.html',
  styleUrl: './add-table-dialog.component.scss',
})
export class AddTableDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TablePageComponent>);
  readonly data = inject<{ name: string; seats: number }>(MAT_DIALOG_DATA);

  form = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    seats: new FormControl(this.data.seats, [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/),
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
