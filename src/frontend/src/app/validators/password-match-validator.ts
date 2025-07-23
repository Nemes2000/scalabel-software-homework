import { AbstractControl, ValidationErrors } from '@angular/forms';

export function createPassWordMatchValidator(
  passwordName: string,
  confirmPasswordName: string
) {
  return (form: AbstractControl): ValidationErrors | null => {
    const passwordControl = form.get(passwordName);
    const passwordConfirmControl = form.get(confirmPasswordName);

    if (passwordControl?.dirty && passwordConfirmControl?.dirty) {
      if (passwordControl.value !== passwordConfirmControl.value) {
        passwordConfirmControl.setErrors({ mismatch: true });
      } else passwordConfirmControl.setErrors(null);
    } else passwordConfirmControl?.setErrors(null);
    if (!passwordConfirmControl?.value)
      passwordConfirmControl?.setErrors({ required: true });
    return null;
  };
}
