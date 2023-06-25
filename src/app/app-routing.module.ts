import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistroComponent} from "./registro/registro.component";
import {LoginComponent} from "./login/login.component";
import {InicioComponent} from "./inicio/inicio.component";
import {PrincipalComponent} from "./principal/principal.component";
import {PerfilComponent} from "./perfil/perfil.component";
import {CreateEventoComponent} from "./create-evento/create-evento.component";
import {BusquedaComponent} from "./busqueda/busqueda.component";




const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'principal', component: PrincipalComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'eventoCreate', component: CreateEventoComponent},
  { path: 'busqueda', component: BusquedaComponent},
  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
