import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageAlertModule } from 'src/app/components/message-alert/message-alert.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageComponent } from './message/message.component';
import { AnimalsFeedComponent } from './animals-feed/animals-feed.component';
import { AnimalProfileComponent } from './animal-profile/animal-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimalsListModule } from 'src/app/components/animals-list/animals-list.module';
import { AnimalCardModule } from 'src/app/components/animal-card/animal-card.module';



@NgModule({
  declarations: [ MessageComponent, AnimalsFeedComponent, AnimalProfileComponent ],
  imports: [
    CommonModule, MessageAlertModule, SharedModule, ReactiveFormsModule,
    AnimalsListModule, AnimalCardModule
  ]
})
export class AnimalsForAdoptionModule { }
