import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function scheduleOpenDateValidator(
  openingControllerName: string,
  openingTimeName: string,
  closingTimeName: string,
  closingDayName: string
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    let openingControl = form.get(openingControllerName);
    let openingTimeControl = form.get(openingTimeName);
    let closingTimeControl = form.get(closingTimeName);
    let closingDayControl = form.get(closingDayName);

    if (!openingControl?.value) return null;
    else {
      if (!openingTimeControl?.value) {
        openingTimeControl?.setErrors({ required: true });
      } else openingTimeControl?.setErrors(null);

      if (!closingTimeControl?.value) {
        closingTimeControl?.setErrors({ required: true });
      } else closingTimeControl?.setErrors(null);

      if (!closingDayControl?.value) {
        closingDayControl?.setErrors({ required: true });
      } else closingDayControl?.setErrors(null);
    }

    return null;
  };
}
