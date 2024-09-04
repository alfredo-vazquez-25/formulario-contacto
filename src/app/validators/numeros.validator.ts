import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validadorNumeros(control: AbstractControl): ValidationErrors | null {
  const regex = /\d/;
  if (regex.test(control.value)) {
    return { 'noNumbers': true };
  }
  return null;
}
