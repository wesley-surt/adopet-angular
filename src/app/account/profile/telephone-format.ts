import { AbstractControl } from "@angular/forms"

export const telephoneFormat = (control: AbstractControl) => {
  const regExp = new RegExp(/^\(?[1-9]{2}\)?\s?9\s?[0-9]{4}\s?[-\s]?\s?[0-9]{4}$/);
  const grossValue = control.value ?? '';
  console.log('antes do if, valor bruto: ', grossValue);
  const pureValue = grossValue.replace(/[\(\)\s\-]/g,'');

  console.log('antes do if, valor puro: ', pureValue);

  if(pureValue.trim()) {
    console.log('dentro do if, valor puro: ', pureValue);

    return regExp.test(pureValue) ? null : { incorrectFormat: true };
  } else {
    return null;
  };
}
