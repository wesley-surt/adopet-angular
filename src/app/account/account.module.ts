import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { AnimalProfileComponent } from './animal-profile/animal-profile.component';
import { RouterModule } from '@angular/router';
import { AnimalCardDialogModule } from '../components/animal-card-dialog/animal-card-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalCardModule } from '../components/animal-card/animal-card.module';
import { AnimalsListModule } from '../components/animals-list/animals-list.module';
import { MessageAlertModule } from '../components/message-alert/message-alert.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { MessageComponent } from './message/message.component';
import { AnimalsFeedComponent } from './animals-feed/animals-feed.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';



@NgModule({
  declarations: [ 
    AccountComponent, 
    MessageComponent, 
    AnimalsFeedComponent, 
    AnimalProfileComponent,
    ProfileComponent,
    EditAnimalComponent,
    RegisterAnimalComponent,
  ],
  imports: [
    FormsModule,
    AccountRoutingModule,
    CommonModule,
    SharedModule,
    AnimalCardDialogModule,
    ReactiveFormsModule,
    AnimalCardModule,
    AnimalsListModule,
    MessageAlertModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  exports: [ AccountComponent ],
})
export class AccountModule { }
  