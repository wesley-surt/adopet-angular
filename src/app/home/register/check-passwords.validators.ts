import { AbstractControl, FormGroup } from "@angular/forms";

export function checkPasswordsValidators(constol: AbstractControl) {

  const password = constol.get('password')?.value ?? '';
  const confirmPassword = constol.get('confirmPassword')?.value ?? '';

  if(password && confirmPassword) {
    return password !== confirmPassword ? { differentPassword: true } : null;
  } else {
    return null;
  };
}
