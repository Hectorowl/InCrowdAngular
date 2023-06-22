import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { InicioComponent } from './inicio.component';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{provide: Router, useValue: mockRouter}]
    }).compileComponents();
    fixture = TestBed.createComponent(InicioComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login goes to login', () => {
    let fixture = TestBed.createComponent(InicioComponent);
    fixture.detectChanges();
    let component: InicioComponent = fixture.componentInstance;
    component.toLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('Registrarse goes to registro', () => {
    let fixture = TestBed.createComponent(InicioComponent);
    fixture.detectChanges();
    let component: InicioComponent = fixture.componentInstance;
    component.toRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['registro']);
  });
});
