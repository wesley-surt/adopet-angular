import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { allLowerCase } from './all-lower-case';
import { UserService } from 'src/app/entities/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private formGroup!: FormGroup;
  checkExistingUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required],
        [this.checkExistingUser.exists()]
      ],
      name: [
        '',
        [Validators.minLength(3), Validators.required],
        [allLowerCase]
    ],
    })
  }
}
