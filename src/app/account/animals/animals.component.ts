import { Component, OnInit } from '@angular/core';
import { AnimalsService } from './animals.service';
import { LocalityService } from 'src/app/services/locality/locality.service';
import { Animal } from './animals';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals!: Animal[];

  constructor(
    private animalsService: AnimalsService,
    private localityService: LocalityService
  ) {}

  ngOnInit(): void {

      this.localityService.returnState().subscribe((state) =>
        this.animalsService.getAnimals(state).subscribe((animals) =>
          {
            this.animals = animals
            console.log(this.animals);
            console.log(state);
          }));
  }
}
