import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/entities/user/user.service';
import { NewUser } from 'src/app/entities/user/new-user';
import { checkPasswordsValidators } from './check-passwords.validators';
import { allLowerCase } from './all-lower-case.validator';
import { CheckExistingUserService } from './check-existing-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formGroupRegister!: FormGroup;
  public checkExistingUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private existingUser: CheckExistingUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroupRegister = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required],
        [this.existingUser.exists()]
      ],
      name: [
        '',
        [Validators.required, allLowerCase]
      ],
      password: [
        '',
        [Validators.required]
      ],
      confirmPassword: [
        '',
        [Validators.required]
      ]
    },
    {
      validators: [checkPasswordsValidators]
    });
  }

  register() {
    if(this.formGroupRegister.status !== 'INVALID') {
      const newUser = this.formGroupRegister.getRawValue() as NewUser;
      this.userService.register(newUser).subscribe(() =>

      this.router.navigate(['/home/login'])),
      (err: any) => console.log(err);
    };
  }
}
