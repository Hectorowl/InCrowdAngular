import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login.component';
import {FormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,FormsModule],
      declarations: [LoginComponent]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fail to login user that doesnt exist', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te123"

    const response = { // Objeto usuario en registro
      success: false,
      message: "ERROR: EL usuario no existe",
      status: 409
    };

    component.login()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/Login/'+component.user+'/'+component.password);
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showNameError).toBe(true)
  });

  it('should fail to login user with wrong pass', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te123"

    const response = { // Objeto usuario en registro
      success: false,
      message: "ERROR: Contraseña incorrecta",
      status: 409
    };

    component.login()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/Login/'+component.user+'/'+component.password);
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showPassError).toBe(true)
  });


  it('should login user with correct pass', () => {
    component.ngOnInit();
    component.user="te"
    component.password="te123"

    const response = { // Objeto usuario en registro
      success: true,
      message: "Contraseña correcta",
      status: 200
    };

    component.login()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/Login/'+component.user+'/'+component.password);
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showSuccess).toBe(true)
  });

  it('should send email if email exists', () => {
    component.ngOnInit();
    component.email="te@te.com"

    const response = { // Objeto usuario en registro
      success: true,
      message: "Correo enviado correctamente",
      status: 200
    };

    component.sendEmail()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/enviarCorreo/'+component.email+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showModalSuccess).toBe(true)
  });

  it('should fail to send email if email doesnt exist', () => {
    component.ngOnInit();
    component.email="te@te.com"

    const response = { // Objeto usuario en registro
      success: false,
      message: "ERROR: No existe un usuario con el ese correo",
      status: 400
    };

    component.sendEmail()
    const req = httpTestingController.expectOne('http://localhost:4200/api' + '/enviarCorreo/'+component.email+'/');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify();

    expect(component.showModalError).toBe(true)
  });

});
