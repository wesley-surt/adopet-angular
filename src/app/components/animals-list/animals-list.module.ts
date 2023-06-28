import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsListComponent } from './animals-list.component';
import { AnimalCardModule } from '../animal-card/animal-card.module';



@NgModule({
  declarations: [AnimalsListComponent],
  imports: [CommonModule, AnimalCardModule],
  exports: [AnimalsListComponent]
})
export class AnimalsListModule { }
