import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';



@NgModule({
  declarations: [ AccountComponent ],
  imports: [ CommonModule, AccountRoutingModule ],
  exports: [ AccountRoutingModule ],
})
export class AccountModule { }
