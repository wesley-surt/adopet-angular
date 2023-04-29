import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../components/message/message.module';



@NgModule({
  declarations: [ HomeComponent, LoginComponent, RegisterComponent, HomePageComponent ],
  imports: [ CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule, MessageModule ],
  exports: [ HomeComponent ],
})
export class HomeModule { }
