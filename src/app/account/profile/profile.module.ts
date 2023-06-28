import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    RegisterAnimalComponent, EditAnimalComponent, ProfileComponent
  ],
  imports: [ CommonModule, ReactiveFormsModule, SharedModule ]
})
export class ProfileModule { }
