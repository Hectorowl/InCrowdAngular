import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
