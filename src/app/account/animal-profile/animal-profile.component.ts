import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/entities/animals/animals';
import { AnimalsService } from 'src/app/entities/animals/animals.service';

@Component({
  selector: 'app-animal-profile',
  templateUrl: './animal-profile.component.html',
  styleUrls: ['./animal-profile.component.css']
})
export class AnimalProfileComponent implements OnInit {

  public animal!: Animal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private animalsService: AnimalsService
  ) {}

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.data['id'];
    this.animalsService.fetchOne(id).subscribe(animal => this.animal = animal as Animal);
  }
}
