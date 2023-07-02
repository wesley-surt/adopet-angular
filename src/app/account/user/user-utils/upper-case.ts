import { AbstractControl } from "@angular/forms";

export const upperCase = (control: AbstractControl) => {
  const value = control.value ?? '';

  if(value) {
    return value !== value.toUpperCase() ? { IslowerCase: true } : null;
  } else {
    return null;
  }
}
