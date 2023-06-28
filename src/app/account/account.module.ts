import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [ CommonModule, AccountRoutingModule ],
  exports: [ AccountRoutingModule ],
})
export class AccountModule { }
