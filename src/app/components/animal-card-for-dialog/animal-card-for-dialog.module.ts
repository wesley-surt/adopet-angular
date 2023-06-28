import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { AnimalCardForDialogComponent } from './animal-card-for-dialog.component';
import { AddCustomButtonDirective } from 'src/app/directives/add-custom-button.directive';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AnimalCardForDialogComponent, AddCustomButtonDirective ],
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
  exports: [AnimalCardForDialogComponent],
})
export class AnimalCardForDialogModule { }
