import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsListModule } from 'src/app/components/animals-list/animals-list.module';



@NgModule({
  declarations: [
    RegisterAnimalComponent, EditAnimalComponent, ProfileComponent
  ],
  imports: [ CommonModule, ReactiveFormsModule, SharedModule, AnimalsListModule ]
})
export class ProfileModule { }
