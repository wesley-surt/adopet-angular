import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Animal } from 'src/app/entities/animals/animals';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent {

  @Output() public relayEvent: EventEmitter<Animal> = new EventEmitter();
  @Input() animals!: Animal[];

  public relay(animal: Animal) {

    this.relayEvent.emit(animal);
    console.log('Entrei no Animal List')
  }
}
