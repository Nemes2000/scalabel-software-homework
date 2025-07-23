import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function checkShiftFinishTime(
  openingTimeName: string,
  closingTimeName: string,
  isString: boolean
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    let openingTime = form.get(openingTimeName)?.value;
    let closingTime = form.get(closingTimeName)?.value;

    openingTime = openingTime?._d ? openingTime._d : openingTime;
    closingTime = closingTime?._d ? closingTime._d : closingTime;

    if (isString && openingTime && closingTime) {
      openingTime = new Date(openingTime);
      closingTime = new Date(closingTime);
    }

    if (
      openingTime &&
      closingTime &&
      openingTime.getTime() >= closingTime.getTime()
    ) {
      form.get(closingTimeName)?.setErrors({ min: true });
    } else form.get(closingTimeName)?.setErrors(null);

    return null;
  };
}
