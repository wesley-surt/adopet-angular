import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimalsService } from '../../../entities/animals/animals.service';
import { LocalityService } from 'src/app/services/locality/locality.service';
import { Animal } from 'src/app/entities/animals/animals';

@Component({
  selector: 'app-animals-feed',
  templateUrl: './animals-feed.component.html',
  styleUrls: ['./animals-feed.component.css']
})
export class AnimalsFeedComponent implements OnInit, OnDestroy {

  public animals!: Animal[];
  private subscriptionAnimals!: Subscription;

  constructor(
    private animalsService: AnimalsService,
    private localityService: LocalityService
  ) {}

  ngOnInit(): void {

    this.localityService.returnState().subscribe((state) => {
      console.log(state);
      this.subscriptionAnimals = this.animalsService.fetchAll(state).subscribe((animals) => {
          this.animals = animals
          console.log(this.animals);
          console.log(state);
      })
    })
  }

  ngOnDestroy(): void {
    this.subscriptionAnimals
  }
}
