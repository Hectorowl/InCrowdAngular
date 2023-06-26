import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventoComponent } from './create-evento.component';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HeaderComponent} from "../header/header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import { NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";

describe('CreateEventoComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: CreateEventoComponent;
  let fixture: ComponentFixture<CreateEventoComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEventoComponent,HeaderComponent],
      imports: [RouterTestingModule.withRoutes([]),HttpClientTestingModule,FormsModule,NgbDatepickerModule,NgbTimepickerModule],
      providers: [{provide: Router, useValue: mockRouter}]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CreateEventoComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.user='hectoruser'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must be logged', () => {
    let fixture = TestBed.createComponent(CreateEventoComponent);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['inicio']);
  });

  it('Nombre is required', () => {
    component.ngOnInit();
    component.nombre=""
    component.categoria="te123"
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
    expect(component.showReqErrorName).toBe(true)
  });
  it('Categoría is required', () => {
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
  it('Descripción is required', () => {
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
  it('Aforo is required', () => {
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
  it('Hora is required', () => {
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

  it('Fecha is required', () => {
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

  it('should create event that doesnt exist', () => {
    component.ngOnInit();
    component.nombre="te"
    component.categoria="te123"
    component.descripcion="te"
    component.aforo=123
    component.fecha= {
      day: 12,
      month: 12,
      year: 2024
    }
    component.hora={
      hour: 14,
      minute: 21,
      second: 0
    }

    const response = {
      success: true,
      message: "exito",
      status: 200
    };

    component.createEvento()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/CreateEvento/');
    expect(req.request.method).toEqual('POST');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showSuccess).toBe(true)
  });

  it('should give error if event exists', () => {
    component.ngOnInit();
    component.nombre="te"
    component.categoria="te123"
    component.descripcion="te"
    component.aforo=123
    component.fecha= {
      day: 12,
      month: 12,
      year: 2024
    }
    component.hora={
      hour: 14,
      minute: 21,
      second: 0
    }

    const response = {
      success: false,
      message: "Ya existe un evento con ese nombre",
      status: 200
    };

    component.createEvento()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/CreateEvento/');
    expect(req.request.method).toEqual('POST');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showNameError).toBe(true)
  });
});
