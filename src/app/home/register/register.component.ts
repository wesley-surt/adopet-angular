import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/entities/user/user.service';
import { NewUser } from 'src/app/entities/user/new-user';
import { checkPasswordsValidators } from './check-passwords.validators';
import { allLowerCase } from './all-lower-case.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formGroupRegister!: FormGroup;
  checkExistingUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroupRegister = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required]
      ],
      name: [
        '',
        [Validators.minLength(3), Validators.required, allLowerCase]
      ],
      password: [
        '',
        [Validators.minLength(4), Validators.required]
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
    if(this.formGroupRegister.valid) {
      const newUser = this.formGroupRegister.getRawValue() as NewUser;
      this.userService.register(newUser).subscribe((res) => {
        next: () => this.router.navigate([''])
        error: (err:any) => console.log(err)
        complete: () => console.log('complete Observable.')
      });
    };
  }
}
