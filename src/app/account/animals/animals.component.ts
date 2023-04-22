import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animals } from './animals';
import { AllAnimalsClass } from './models/allAnimalsClass';

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
      const animals = this.activatedRoute.snapshot.data['animals'];
      this.animals = new AllAnimalsClass(animals);

      console.log(this.animals);
    })
  }
}
