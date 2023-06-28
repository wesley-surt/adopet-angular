import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animal } from 'src/app/entities/animals/animals';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css']
})
export class AnimalCardComponent {
  @Input() animal!: Animal;
  @Output() clickedAnimal: EventEmitter<Animal> = new EventEmitter();

  emitterAnimal(animal: Animal): void {
    this.clickedAnimal.emit(animal);
    console.log(animal);
  }
}
