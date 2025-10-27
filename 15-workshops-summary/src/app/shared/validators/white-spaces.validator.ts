import { AbstractControl, ValidatorFn } from '@angular/forms';

export const whiteSpaceValidator: ValidatorFn = (control: AbstractControl) => {
  if (control.value && control.value.length && control.value.trim().length === 0) {
    return { whiteSpace: true };
  }
  return null;
};
