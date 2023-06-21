import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IncrowdAngular';
}

export class Usuario{
  nombre: string;
  username: string;
  password: string;
  correo: string;
  valoracion: number;
  numEventosCreados: number;
  numEventosParticipa: number;
}

export class Evento{
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  esPublico: boolean;
  aforo: number;
  categoria: string;
  organizador: string;
}

export class Mensaje{
  autor: string;
  evento: string;
  texto: string;
}
export const GlobalVariable = Object.freeze({
  BASE_API_URL: 'https://incrowds.onrender.com/incrown_app/',

});
