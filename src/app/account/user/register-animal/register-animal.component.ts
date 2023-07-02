import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Animal } from 'src/app/entities/animals/animals';
import { AnimalsService } from 'src/app/entities/animals/animals.service';
import { onlyNumbers } from '../user-utils/only-numbers';
import { upperCase } from '../user-utils/upper-case';
import { onlyLetters } from '../user-utils/only-letters';

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
    private router: Router,
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

    if(this.formGroupRegister.status !== 'INVALID') {
      const formValue = this.formGroupRegister.getRawValue() as Animal;

      this.animalsService.register(formValue).subscribe(animal => {
        alert('Animal cadastrado com sucesso - ' + animal)
        console.log('Animal Registered successfully - ' + animal)
        this.router.navigate([`edit/${animal._id}`]);
      })
      ,(err: any) => console.log(err.message);
    }
  }
}
