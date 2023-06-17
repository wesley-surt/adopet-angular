import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimalsService } from '../../entities/animals/animals.service';
import { LocalityService } from 'src/app/services/locality/locality.service';
import { Animal } from '../../entities/animals/animals';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit, OnDestroy {

  public animals!: Animal[];
  private subscriptionAnimals!: Subscription;

  constructor(
    private animalsService: AnimalsService,
    private localityService: LocalityService
  ) {}

  ngOnInit(): void {

      this.localityService.returnState().subscribe((state) =>
        this.subscriptionAnimals = this.animalsService.getAnimals(state).subscribe((animals) =>
          {
            this.animals = animals
            console.log(this.animals);
            console.log(state);
          }));
  }

  ngOnDestroy(): void {
    this.subscriptionAnimals.unsubscribe;
  }
}
