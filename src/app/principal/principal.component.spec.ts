import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalComponent } from './principal.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {Evento} from "../app.component";
import {HeaderComponent} from "../header/header.component";
import {
  NgbAccordion, NgbAccordionBody,
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem, NgbPagination
} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BusquedaComponent} from "../busqueda/busqueda.component";

describe('PrincipalComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,FormsModule,NgbAccordion, NgbAccordionBody,
        NgbAccordionButton, NgbAccordionCollapse,
        NgbAccordionDirective,
        NgbAccordionHeader,
        NgbAccordionItem, NgbPagination,RouterTestingModule.withRoutes([])],
      declarations: [PrincipalComponent,HeaderComponent],
      providers: [{provide: Router, useValue: mockRouter}]

    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PrincipalComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.user='hectoruser'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must be logged', () => {
    let fixture = TestBed.createComponent(PrincipalComponent);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['inicio']);
  });

  it('should show results when there are events', () => {
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

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/EventosRandom/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    httpTestingController.verify();

    expect(component.listado_len).toBe(2)
  });

  it('should show error when there are no events', () => {
    var listado : Evento[] = []

    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/EventosRandom/'+component.user+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(listado);

    httpTestingController.verify();

    expect(component.listado_len).toBe(0)
    expect(component.nores).toBe(true)
  });

  it('ver detalle must go to evento', () => {
    let fixture = TestBed.createComponent(PrincipalComponent);
    fixture.detectChanges();
    let component: PrincipalComponent = fixture.componentInstance;
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


});
