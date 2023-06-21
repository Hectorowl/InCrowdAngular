import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Router} from "@angular/router";
import {GlobalVariable, Usuario} from "../app.component";
import {NgbPaginationModule, NgbAlertModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  name : string;
  user : string;
  password : string;
  email : string;
  repepassword : string;
  showAlreadyExists : boolean;
  showOtherError : boolean;
  showSuccess : boolean;
  showPassError : boolean;
  showReqError : boolean;
  showRegexpError : boolean;

  constructor( private http: HttpClient, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.name = '';
    this.user = '';
    this.password = '';
    this.email = '';
    this.repepassword = '';
    this.showAlreadyExists = false;
    this.showOtherError = false;
    this.showSuccess = false;
    this.showPassError = false;
    this.showReqError = false;
    this.showRegexpError = false;
  }

  registrar() {
    this.clean();
    if(this.valid()) {
      const newUser = { // Objeto usuario en registro
        nombre: this.name,
        username: this.user,
        correo: this.email,
        password: this.password,
        valoracion: null,
        numEventosCreados: 0,
        numValoraciones: 0,
        numEventosParticipa: 0
      };

      this.http.post('http://localhost:4200/api' + '/CreateUsuario/', newUser).subscribe(
        (resp: any) => { // comprobar estado: 201 recurso creado, 409 error por repetición de user
          console.log(resp);
          console.log(resp.success);
          if(resp.success==true){
            this.showSuccess = true;
            open()
          }else{
            if(resp.message=="Username ya existe"){
              this.showAlreadyExists = true;
            }
            else{
              this.showOtherError = true;
            }
          }

        },
        (error: HttpErrorResponse) => {
          console.log(error)
        });
    }
  }

  clean(){
    this.showAlreadyExists = false;
    this.showOtherError = false;
    this.showSuccess = false;
    this.showSuccess = false;
    this.showPassError = false;
    this.showReqError = false;
  }

  valid(){
    if(this.password!=this.repepassword){
      this.showPassError=true;
      return false;
    }
    if(this.password=='' || this.repepassword=='' || this.user=='' || this.name==''){
      this.showReqError=true;
      return false;
    }
    const nameRegexp: RegExp = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!nameRegexp.test(this.password)){
      this.showRegexpError=true;
      return false;
    }
    return true;
  }

  // @ts-ignore
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      },
      (reason) => {
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      },
    );
  }

  sendEmail() {

  }
}
