import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

describe('HeaderComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes([]),HttpClientTestingModule,FormsModule],
      providers: [{provide: Router, useValue: mockRouter}]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HeaderComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('to create goes to create event', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component.toCreate()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['eventoCreate']);
  });

  it('to principal goes to principal', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component.toPrincipal()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['principal']);
  });

  it('logout goes to inicio', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component.toLogout()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['inicio']);
  });

  it('to account goes to perfil', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component.toAccount()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['perfil']);
  });

  it('to search goes to busqueda', () => {
    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component.toSearch()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['busqueda']);
  });
});
