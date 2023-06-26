import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoComponent } from './evento.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HeaderComponent} from "../header/header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

describe('EventoComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: EventoComponent;
  let fixture: ComponentFixture<EventoComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoComponent,HeaderComponent],
      imports: [RouterTestingModule.withRoutes([]),HttpClientTestingModule,FormsModule],
      providers: [{provide: Router, useValue: mockRouter}]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EventoComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.user='hectoruser'
    component.evento='Evento API'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must be logged', () => {
    let fixture = TestBed.createComponent(EventoComponent);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['inicio']);
  });

  it('should fetch msgs when there are mesages', () => {
    const response = {
      id: 1,
      autor: 'hectoruser',
      evento: 'Evento API',
      texto: 'Hola'
    }
    const response2 = {
      id: 2,
      autor: 'otro',
      evento: 'Evento API',
      texto: 'Adios'
    }

    const listado = [response,response2]

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/Mensajes/'+component.evento+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    //httpTestingController.verify();

    expect(component.listadoMen.length).toBe(2)
  });

  it('should fetch participants', () => {
    const response = {
      nombre: 'user1',
      username: 'user1',
      password: 'user1',
      correo: 'user1',
      valoracion: 2,
      numEventosCreados: 3,
      numEventosParticipa: 4,
      numValoraciones: 5,
    }
    const response2 = {
      nombre: 'user2',
      username: 'user3',
      password: 'user2',
      correo: 'user23',
      valoracion: 2,
      numEventosCreados: 3,
      numEventosParticipa: 4,
      numValoraciones: 532,
    }

    const listado = [response,response2]

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/participantes/'+component.evento+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    //httpTestingController.verify();

    expect(component.listadoParticipantes.length).toBe(2)
  });

  it('should check if user is participante', () => {

    const response = { // Objeto usuario en registro
      success: true,
      message: "TRUE",
      status: 200
    };

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/esParticipante/'+component.evento+'/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    //httpTestingController.verify();

    expect(component.isParticipante).toBe(true)
  });
  it('should check if user is participante 2', () => {

    const response = { // Objeto usuario en registro
      success: true,
      message: "FALSE",
      status: 200
    };

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/esParticipante/'+component.evento+'/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    //httpTestingController.verify();

    expect(component.isParticipante).toBe(false)
  });

  it('should add msgs', () => {
    const msg = {
      id: 1,
      autor: 'hectoruser',
      evento: 'Evento API',
      texto: 'Hola'
    }
    const msg2 = {
      id: 2,
      autor: 'otro',
      evento: 'Evento API',
      texto: 'Adios'
    }

    const response = { // Objeto usuario en registro
      success: true,
      message: "true",
      status: 200
    };

    component.listadoMen = [msg,msg2]
    component.mensaje = 'Tercer mensaje'

    component.escribir()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/CreateMensaje/');
    expect(req.request.method).toEqual('POST');
    req.flush(response);

    //httpTestingController.verify();

    expect(component.showSusError).toBe(false)
  });


});
