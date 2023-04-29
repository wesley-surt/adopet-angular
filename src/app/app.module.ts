import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [ AppComponent, CabecalhoComponent, RodapeComponent ],
  imports: [ BrowserModule, AppRoutingModule, HttpClientModule, AuthenticationModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
