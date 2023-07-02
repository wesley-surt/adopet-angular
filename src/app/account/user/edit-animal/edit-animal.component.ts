import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Animal } from 'src/app/entities/animals/animals';
import { AnimalsService } from 'src/app/entities/animals/animals.service';
import { ActivatedRoute } from '@angular/router';
import { upperCase } from '../user-utils/upper-case';
import { onlyLetters } from '../user-utils/only-letters';
import { onlyNumbers } from '../user-utils/only-numbers';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent implements OnInit {

  public formGroupEdit!: FormGroup;
  public animal!: Animal;

  constructor(
    private formBuilder: FormBuilder,
    private animalsService: AnimalsService,
    private actRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.actRoute.params.subscribe(params => {
      const id = this.actRoute.snapshot.data['id'] as string;

      this.animalsService.fetchOne(id).subscribe(animal =>
        this.animal = animal)
    });

    this.formGroupEdit = this.formBuilder.group({
      photo: [`${this.animal.photoUrl ?? ''}`],
      name: [`${this.animal.name ?? ''}`, [Validators.required, upperCase, onlyLetters]],
      age: [`${this.animal.age ?? ''}`, [Validators.required, onlyNumbers]],
      size: [`${this.animal.size ?? ''}`, [Validators.required]],
      characteristcs: [`${this.animal.characteristics ?? ''}`, [Validators.required]],
      about: [`${this.animal.about ?? ''}`, [Validators.required]],
    });
  }

  public update(): void {

    if(this.formGroupEdit.status !== 'INVALID') {
      const formValue = this.formGroupEdit.getRawValue() as Animal;

      this.animalsService.update(formValue).subscribe(data => {
        console.log(data + ' - Animal Registered successfully'),
        (err: any) => console.log(err.message);
      });
    }
  }
}
