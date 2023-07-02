import { AbstractControl } from "@angular/forms";

export const onlyNumbers = (control: AbstractControl) => {

  const numbers = control.value ?? '';

  if(numbers) {
    return numbers === Number ? null : { itsNotANumber: true };
  } else {
    return null;
  };
}
