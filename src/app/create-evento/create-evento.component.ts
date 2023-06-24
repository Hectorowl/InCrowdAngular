import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserdataService} from "../userdata.service";
import {NgbDateStruct, NgbTimepickerModule, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStructAdapter} from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time-adapter";


@Component({
  selector: 'app-create-evento',
  templateUrl: './create-evento.component.html',
  styleUrls: ['./create-evento.component.css']
})
export class CreateEventoComponent implements OnInit {

  user : string;

  nombre : string;
  descripcion : string;
  fecha : NgbDateStruct;
  hora: NgbTimeStruct;
  esPublico: boolean;
  aforo: number;
  categoria: string;
  organizador: string;


  showSuccess = false;
  showNameError = false;
  showOtherError = false;



  constructor( private http: HttpClient, private router: Router, private us:UserdataService){
  this.us.getLan().subscribe(us => this.user = us);
  }

  ngOnInit(): void {
    this.user='hectoruser';

    this.nombre = '';
    this.descripcion = '';
    this.fecha= {
      day: 0,
      month: 0,
      year: 0
    };
    this.hora = {
      hour: 0,
      minute: 0,
      second: 0
    };
    this.esPublico = false;
    this.aforo = 0;
    this.categoria = '';
    this.organizador = this.user;

    this.clean();

  }

  clean(){
    this.showSuccess = false;
    this.showNameError = false;
    this.showOtherError = false;
  }

  cleanForm(){

    this.nombre = '';
    this.descripcion = '';
    this.fecha= {
      day: 0,
      month: 0,
      year: 0
    };
    this.hora = {
      hour: 0,
      minute: 0,
      second: 0
    };
    this.esPublico = false;
    this.aforo = 0;
    this.categoria = '';
  }

  createEvento() {
    this.clean();

    console.log(this.fecha)
    const eventoData = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      fecha: this.fecha.day.toString()+'-'+this.fecha.month+'-'+this.fecha.year,
      hora: this.hora.hour+':'+this.hora.minute,
      esPublico: this.esPublico,
      aforo: this.aforo,
      categoria: this.categoria,
      organizador: this.organizador,
    };
    console.log(eventoData)

    this.http.post('http://localhost:4200/api' + '/CreateEvento/', eventoData).subscribe(
      (resp: any) => {
        if(resp.success==true){
          this.showSuccess = true;
          setTimeout(() => {
            this.clean();
          }, 2000);
        }else{
          if(resp.message=="Ya existe un evento con ese nombre"){
            this.showNameError = true;
          }
          else{
              this.showOtherError = true;
            }
        }
      },
      (error: HttpErrorResponse) => {
        this.showOtherError=true
        console.error(error);
      });
  }
}

