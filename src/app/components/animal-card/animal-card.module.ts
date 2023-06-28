import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from './animal-card.component';
import { MatDialogModule } from '@angular/material/dialog'



@NgModule({
  declarations: [AnimalCardComponent],
  imports: [
    CommonModule,
    MatButtonModule, MatDialogModule
  ],
  exports: [AnimalCardComponent]
})
export class AnimalCardModule { }
