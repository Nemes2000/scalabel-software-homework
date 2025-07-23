import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private readonly _snackBar = inject(MatSnackBar);

  callPopUpShowMethod(message: string) {
    this._snackBar.open(message, 'OK', {
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      duration: 5 * 1000,
    });
  }
}
