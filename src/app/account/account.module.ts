import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AnimalsComponent } from './animals/animals.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ ProfileComponent, AnimalsComponent ],
  imports: [ CommonModule, AccountRoutingModule, RouterModule ],
})
export class AccountModule { }
