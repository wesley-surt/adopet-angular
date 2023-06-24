import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, AccountRoutingModule, RouterModule, ReactiveFormsModule ],
})
export class AccountModule { }
