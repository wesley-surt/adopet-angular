import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsComponent } from './animals/animals.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';
import { MessageModule } from '../components/message/message.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [ ProfileComponent, AnimalsComponent, MessageComponent ],
  imports: [ CommonModule, AccountRoutingModule, RouterModule, FormsModule, ReactiveFormsModule, 
    MessageModule ],
})
export class AccountModule { }
