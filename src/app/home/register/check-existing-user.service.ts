import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { UserService } from 'src/app/entities/user/user.service';

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
        switchMap((email) =>
          this.userService.userExists(email)
        ),
        map((res) => {
          res.exists ? { userExists: true } : null;
        }),
        first()
      );
    };
  }
}
