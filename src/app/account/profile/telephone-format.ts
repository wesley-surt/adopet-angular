import { AbstractControl } from "@angular/forms"

export const telephoneFormat = (control: AbstractControl) => {
  const regExp = new RegExp(/^\(?[1-9]{2}\)?\s?9\s?[0-9]{4}\s?[-\s]?\s?[0-9]{4}$/);
  const grossValue = control.value ?? '';
  const pureValue = grossValue.replace(/[\(\)\s\-]/g,'');

  if(pureValue.trim()) {
    return regExp.test(pureValue) ? null : { incorrectFormat: true };
  } else {
    return null;
  };
}
