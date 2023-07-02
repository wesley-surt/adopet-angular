import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsListModule } from 'src/app/components/animals-list/animals-list.module';
import { UserRoutingModule } from './user-routing.module';
import { AnimalCardModule } from 'src/app/components/animal-card/animal-card.module';
import { AnimalCardDialogModule } from 'src/app/components/animal-card-dialog/animal-card-dialog.module';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [
    RegisterAnimalComponent, EditAnimalComponent, ProfileComponent, UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AnimalsListModule,
    UserRoutingModule,
    AnimalCardDialogModule,
    AnimalCardModule,
   ],
   exports: [ UserComponent ]
})
export class UserModule { }
