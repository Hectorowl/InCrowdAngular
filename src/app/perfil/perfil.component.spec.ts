import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";
import {NgbAccordion, NgbAccordionModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {Evento} from "../app.component";

describe('PerfilComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilComponent,HeaderComponent],
      imports: [RouterTestingModule.withRoutes([]),HttpClientTestingModule,FormsModule,NgbNavModule,NgbAccordionModule,
        NgbAccordion],
      providers: [{provide: Router, useValue: mockRouter}]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PerfilComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.user='hectoruser'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must be logged', () => {
    let fixture = TestBed.createComponent(PerfilComponent);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['inicio']);
  });

  it('should show results when there are events created', () => {
    const response = {
      nombre: "Ento API 3",
      descripcion: "Otra mas desde la api",
      fecha: "14-11-2023",
      hora: "14:23",
      esPublico: false,
      aforo: 23,
      categoria: "api",
      organizador: "usertest"
    }
    const response2 = {
      nombre: "Ento api 2",
      descripcion: "22",
      fecha: "22-12-2023",
      hora: "22:22",
      esPublico: false,
      aforo: 22,
      categoria: "22",
      organizador: "usertest"
    }

    const listado = [response,response2]

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/Eventos/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    expect(component.listadoMine_len).toBe(2)
  });

  it('should show error when there are no events created', () => {
    var listado : Evento[] = []

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/Eventos/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    expect(component.listadoMine_len).toBe(0)
    expect(component.noresMine).toBe(true)
  });

  it('should show results when there are events followed', () => {
    const response = {
      nombre: "Ento API 3",
      descripcion: "Otra mas desde la api",
      fecha: "14-11-2023",
      hora: "14:23",
      esPublico: false,
      aforo: 23,
      categoria: "api",
      organizador: "usertest"
    }
    const response2 = {
      nombre: "Ento api 2",
      descripcion: "22",
      fecha: "22-12-2023",
      hora: "22:22",
      esPublico: false,
      aforo: 22,
      categoria: "22",
      organizador: "usertest"
    }

    const listado = [response,response2]

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/eventosApuntados/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    expect(component.listadoAp_len).toBe(2)
  });

  it('should show error when there are no events followed', () => {
    var listado : Evento[] = []

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/eventosApuntados/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    expect(component.listadoAp_len).toBe(0)
    expect(component.noresAp).toBe(true)
  });

  it('ver detalle must go to evento', () => {
    let fixture = TestBed.createComponent(PerfilComponent);
    fixture.detectChanges();
    let component: PerfilComponent = fixture.componentInstance;
    const response2 = {
      nombre: "Ento api 2",
      descripcion: "22",
      fecha: "22-12-2023",
      hora: "22:22",
      esPublico: false,
      aforo: 22,
      categoria: "22",
      organizador: "usertest"
    }
    component.toEvento(response2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['evento']);
  });

  it('Categoría cant be empty', () => {
    component.ngOnInit();
    component.nombre="te"
    component.categoria=""
    component.descripcion="te"
    component.aforo=123
    component.fecha= {
      day: 23,
      month: 11,
      year: 2021
    }
    component.hora={
      hour: 14,
      minute: 21,
      second: 0
    }
    component.valid()
    expect(component.showReqErrorCat).toBe(true)
  });

  it('Descripción cant be empty', () => {
    component.ngOnInit();
    component.nombre="te"
    component.categoria="te123"
    component.descripcion=""
    component.aforo=123
    component.fecha= {
      day: 23,
      month: 11,
      year: 2021
    }
    component.hora={
      hour: 14,
      minute: 21,
      second: 0
    }
    component.valid()
    expect(component.showReqErrorDes).toBe(true)
  });

  it('Aforo cant be zero', () => {
    component.ngOnInit();
    component.nombre="te"
    component.categoria="te123"
    component.descripcion="te"
    component.aforo=0
    component.fecha= {
      day: 23,
      month: 11,
      year: 2021
    }
    component.hora={
      hour: 14,
      minute: 21,
      second: 0
    }
    component.valid()
    expect(component.showReqErrorAforo).toBe(true)
  });

  it('Hora cant be empty', () => {
    component.ngOnInit();
    component.nombre="te"
    component.categoria="te123"
    component.descripcion="te"
    component.aforo=123
    component.fecha= {
      day: 23,
      month: 11,
      year: 2021
    }
    component.hora={
      hour: 0,
      minute: 0,
      second: 0
    }
    component.valid()
    expect(component.showReqErrorHora).toBe(true)
  });

  it('Fecha cant be empty', () => {
    component.ngOnInit();
    component.nombre="te"
    component.categoria="te123"
    component.descripcion="te"
    component.aforo=123
    component.fecha= {
      day: 0,
      month: 0,
      year: 0
    }
    component.hora={
      hour: 14,
      minute: 21,
      second: 0
    }
    component.valid()
    expect(component.showReqErrorFecha).toBe(true)
  });

});
