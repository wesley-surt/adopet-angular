import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animals } from './animals';
import { AllAnimalsClass } from './models/allAnimalsClass';
import { tap } from 'rxjs';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals!: AllAnimalsClass;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const animalsResolver = this.activatedRoute.snapshot.data['animals'];
      const allAnimals = animalsResolver.allAnimals as Animals;
      
      this.animals = new AllAnimalsClass(allAnimals);
    })
  }
}
