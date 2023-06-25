import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import { InicioComponent } from './inicio/inicio.component';
import { PrincipalComponent } from './principal/principal.component';
import {
  NgbAccordion,
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbDatepicker,
  NgbInputDatepicker,
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLink, NgbNavOutlet,
  NgbPagination, NgbPaginationPages,
  NgbTimepicker
} from "@ng-bootstrap/ng-bootstrap";
import { CreateEventoComponent } from './create-evento/create-evento.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderComponent } from './header/header.component';
import { BusquedaComponent } from './busqueda/busqueda.component'

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    InicioComponent,
    PrincipalComponent,
    CreateEventoComponent,
    PerfilComponent,
    HeaderComponent,
    BusquedaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterOutlet,
    HttpClientModule,
    NgOptimizedImage,
    NgbAccordion,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    NgbPagination,
    NgbTimepicker,
    NgbDatepicker,
    NgbInputDatepicker,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    NgbPaginationPages,
    NgbNavOutlet,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
