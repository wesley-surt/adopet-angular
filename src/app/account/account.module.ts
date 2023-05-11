import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsComponent } from './animals/animals.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [ AnimalsComponent, MessageComponent, ProfileComponent ],
  imports: [ CommonModule, AccountRoutingModule, RouterModule, FormsModule, SharedModule],
})
export class AccountModule { }
