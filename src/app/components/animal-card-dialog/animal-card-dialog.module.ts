import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalCardDialogComponent } from './animal-card-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [AnimalCardDialogComponent],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [AnimalCardDialogComponent]
})
export class AnimalCardDialogModule { }
