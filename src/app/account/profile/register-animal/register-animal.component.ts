import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { upperCase } from '../upper-case';
import { onlyLetters } from '../only-letters';
import { onlyNumbers } from '../only-numbers';
import { Animal } from 'src/app/entities/animals/animals';
import { AnimalsService } from 'src/app/entities/animals/animals.service';

@Component({
  selector: 'app-register-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css']
})
export class RegisterAnimalComponent implements OnInit {

  public formGroupRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private animalsService: AnimalsService,
  ) {}

  ngOnInit(): void {
    this.formGroupRegister = this.formBuilder.group({
      photo: [''],
      name: ['', [Validators.required, upperCase, onlyLetters]],
      age: ['', [Validators.required, onlyNumbers]],
      size: ['', [Validators.required]],
      characteristcs: ['', [Validators.required]],
      about: ['', [Validators.required]],
    });
  }

  public register(): void {

    if(this.formGroupRegister.valid) {
      const formValue = this.formGroupRegister.getRawValue() as Animal;

      this.animalsService.register(formValue).subscribe(data => {
        console.log(data + ' - Animal Registered successfully'),
        (err: any) => console.log(err.message);
      });
    }
  }
}
