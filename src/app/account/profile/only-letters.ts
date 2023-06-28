import { AbstractControl } from "@angular/forms";

export const onlyLetters = (control: AbstractControl) => {
  const regExp = new RegExp(/^[A-Za-z]{3,50}$/);
  const grossValue = control.value ?? '';
  const pureValue = grossValue.trim() ?? '';

  if(pureValue !== '' && !regExp.test(pureValue)) {
    return { itsNotLyric: true };
  } else {
    return null;
  };
}
