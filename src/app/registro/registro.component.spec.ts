import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

describe('RegistroComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,FormsModule],
      declarations: [RegistroComponent]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail to register user that exists', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te123"
    component.name="te"
    component.repepassword="te123"
    component.email="te"

    const response = { // Objeto usuario en registro
      success: false,
      message: "Username ya existe",
      status: 400
    };

    component.registrar()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/CreateUsuario/');
    expect(req.request.method).toEqual('POST');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showAlreadyExists).toBe(true)
  });

  it('should register user that doesnt exists', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te123"
    component.name="te"
    component.repepassword="te123"
    component.email="te"

    const response = { // Objeto usuario en registro
      success: true,
      message: "Usuario creado exitosamente",
      status: 200
    };

    component.registrar()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/CreateUsuario/');
    expect(req.request.method).toEqual('POST');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showSuccess).toBe(true)
  });

  it('should fail if passwords dont match', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te123"
    component.name="te"
    component.repepassword="te321"
    component.email="te"
    expect(component.valid()).toBe(false)
    expect(component.showPassError).toBe(true)
  });

  it('should fail if fields are missing', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te123"
    component.repepassword="te123"
    component.email="te"
    expect(component.valid()).toBe(false)
    expect(component.showReqError).toBe(true)
  });

  it('should fail if pass doesnt have numbers or simbol', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te"
    component.name="te"
    component.repepassword="te"
    component.email="te"
    expect(component.valid()).toBe(false)
    expect(component.showRegexpError).toBe(true)
  });
});
