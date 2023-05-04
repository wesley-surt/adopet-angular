import { AbstractControl } from "@angular/forms";

export function allLowerCase(control: AbstractControl) {

  const value = control.value ?? '';

  if(value !== value.toLowerCase()) {
    return { lowerCase: true };
  } else {
    return null;
  };
};
