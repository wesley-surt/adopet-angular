import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, filter, first, map, switchMap } from 'rxjs';
import { UserService } from 'src/app/entities/user/user.service';

const PAUSA = 1000;

@Injectable({
  providedIn: 'root'
})
export class CheckExistingUserService {

  constructor(
    private userService: UserService
  ) { }

  exists() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        filter(value => value.length >= 0),
        debounceTime(PAUSA),
        switchMap(email => this.userService.userExists(email)),
        map((res) => res ? { userExists: true } : null),
        first()
      );
    };
  }
}
