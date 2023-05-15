import { NgModule } from '@angular/core';
import { AnimalsComponent } from './animals/animals.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ AnimalsComponent, MessageComponent, ProfileComponent ],
  imports: [ CommonModule, AccountRoutingModule, RouterModule, FormsModule, SharedModule,
  AnimalsComponent, MessageComponent, ProfileComponent],
})
export class AccountModule { }
