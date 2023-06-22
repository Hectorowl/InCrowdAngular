import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserdataService} from "../userdata.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : string;
  password : string;
  email : string;
  showSuccess : boolean;
  showPassError : boolean;
  showNameError : boolean;
  showOtherError :boolean;
  showModalSuccess: boolean;
  showModalError: boolean;


  constructor( private http: HttpClient, private router: Router, private modalService: NgbModal, private us:UserdataService ) { }

  ngOnInit(): void {
    this.user = '';
    this.password = '';
    this.email = '';
    this.showSuccess = false;
    this.showPassError = false;
    this.showNameError = false;
    this.showOtherError = false;
    this.showModalSuccess = false;
    this.showModalError = false;

  }

  login() {
    this.clean();

    this.http.get('http://localhost:4200/api' + '/Login/'+this.user+'/'+this.password).subscribe(
      (resp: any) => {
        console.log('resp');
        console.log(resp);
        if(resp.success==true){
          this.showSuccess = true;
          this.us.updateLan(this.user)
          setTimeout(() => {
            this.router.navigate(['principal']);
          }, 1000);
        }else{
          if(resp.message=="ERROR: EL usuario no existe"){
              this.showNameError = true;
            }
          else{
            if(resp.message=="ERROR: Contraseña incorrecta"){
              this.showPassError = true;
            }
            else{
              this.showOtherError = true;
            }
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.showOtherError = true;
        console.log(error)
      });

  }

  clean(){
    this.showSuccess = false;
    this.showPassError = false;
    this.showNameError = false;
    this.showOtherError = false;
    this.showModalSuccess = false;
    this.showModalError = false;

  }

  cleanModal(){
    this.showModalSuccess = false;
    this.showModalError = false;

  }

  // @ts-ignore
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.cleanModal()
      },
      (reason) => {
        this.cleanModal()
      },
    );
  }

  sendEmail() {
    this.clean();

    this.http.get('http://localhost:4200/api' + '/enviarCorreo/'+this.email+'/').subscribe(
      (resp: any) => {
        console.log('resp');
        console.log(resp);
        if(resp.success==true){
          this.showModalSuccess = true;
        }else{
          this.showModalError = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.showModalError = true;
        console.log(error)
      });


  }


}
