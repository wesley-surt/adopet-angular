import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'

import { AnimalsFeedComponent } from './animals-feed/animals-feed.component';
import { AnimalProfileComponent } from './animal-profile/animal-profile.component';
import { MessageComponent } from './message/message.component';

import { MessageAlertModule } from 'src/app/components/message-alert/message-alert.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnimalsListModule } from 'src/app/components/animals-list/animals-list.module';
import { AnimalCardModule } from 'src/app/components/animal-card/animal-card.module';
import { AnimalForAdoptionRoutingModule } from './animals-for-adoption-routing.module';
import { AnimalCardForDialogModule } from 'src/app/components/animal-card-for-dialog/animal-card-for-dialog.module';



@NgModule({
  declarations: [ MessageComponent, AnimalsFeedComponent, AnimalProfileComponent ],
  imports: [
    CommonModule,
    AnimalCardForDialogModule,
    ReactiveFormsModule,
    SharedModule,
    AnimalCardModule,
    AnimalsListModule,
    MessageAlertModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    AnimalForAdoptionRoutingModule
  ],
  exports: [AnimalForAdoptionRoutingModule]
})
export class AnimalsForAdoptionModule { }
