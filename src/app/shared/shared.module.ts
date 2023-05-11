import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageAlertModule } from '../components/message-alert/message-alert.module';



@NgModule({
  imports: [ CommonModule, MessageAlertModule, ReactiveFormsModule ],
  exports: [ MessageAlertModule, ReactiveFormsModule ],
})
export class SharedModule { }
