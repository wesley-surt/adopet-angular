import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsListComponent } from './animals-list.component';



@NgModule({
  declarations: [AnimalsListComponent],
  imports: [CommonModule],
  exports: [AnimalsListComponent]
})
export class AnimalsListModule { }
