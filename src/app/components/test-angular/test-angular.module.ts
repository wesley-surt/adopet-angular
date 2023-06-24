import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestAngularComponent } from './test-angular.component';



@NgModule({
  declarations: [TestAngularComponent],
  imports: [
    CommonModule
  ],
  exports: [TestAngularComponent]
})
export class TestAngularModule { }
