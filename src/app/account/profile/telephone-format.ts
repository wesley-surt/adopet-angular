import { AbstractControl } from "@angular/forms"

export const telephoneFormat = (control: AbstractControl) => {
  const value = control.value ?? '';
  const regExp = new RegExp(/^\([1-9]{2}\)9[0-9]{4}\-[0-9]{4}$/);

  if(value.trim()) {
    return regExp.test(value.trim()) ? null : { incorrectFormat: true };
  } else {
    return null;
  };
}
