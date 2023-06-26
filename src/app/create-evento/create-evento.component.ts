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

  user: string;

  nombre: string;
  descripcion: string;
  fecha: NgbDateStruct;
  hora: NgbTimeStruct;
  esPublico: boolean;
  aforo: number;
  categoria: string;
  organizador: string;


  showSuccess = false;
  showNameError = false;
  showOtherError = false;
  showReqErrorName: boolean = false;
  showReqErrorCat: boolean = false;
  showReqErrorDes: boolean = false;
  showReqErrorAforo: boolean = false;
  showReqErrorFecha: boolean = false;
  showReqErrorHora: boolean = false;


  constructor(private http: HttpClient, private router: Router, private us: UserdataService) {
    this.us.getLan().subscribe(us => this.user = us);
  }

  ngOnInit(): void {
    if(this.user!='') {
      this.nombre = '';
      this.descripcion = '';
      this.fecha = {
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
    }else {
      this.router.navigate(['inicio']);
    }

  }

  clean() {
    this.showSuccess = false;
    this.showNameError = false;
    this.showOtherError = false;
    this.showReqErrorName = false;
    this.showReqErrorCat = false;
    this.showReqErrorDes = false;
    this.showReqErrorAforo = false;
    this.showReqErrorFecha = false;
    this.showReqErrorHora = false;
  }

  cleanForm() {
    this.clean()

    this.nombre = '';
    this.descripcion = '';
    this.fecha = {
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
    if (this.valid()) {
      console.log(this.fecha)
      const eventoData = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        fecha: this.fecha.day.toString() + '-' + this.fecha.month + '-' + this.fecha.year,
        hora: this.hora.hour + ':' + this.hora.minute,
        esPublico: this.esPublico,
        aforo: this.aforo,
        categoria: this.categoria,
        organizador: this.organizador,
      };
      console.log(eventoData)

      this.http.post('http://localhost:4200/api' + '/CreateEvento/', eventoData).subscribe(
        (resp: any) => {
          if (resp.success == true) {
            this.showSuccess = true;
            setTimeout(() => {
              this.cleanForm();
            }, 2000);
          } else {
            if (resp.message == "Ya existe un evento con ese nombre") {
              this.showNameError = true;
            } else {
              this.showOtherError = true;
            }
          }
        },
        (error: HttpErrorResponse) => {
          this.showOtherError = true
          console.error(error);
        });
    }
  }

  valid() {
    var ret = true;
    if (this.nombre == '') {
      this.showReqErrorName = true;
      ret = false;
    }
    if (this.categoria == '') {
      this.showReqErrorCat = true;
      ret = false;
    }
    if (this.descripcion == '') {
      this.showReqErrorDes = true;
      ret = false;
    }
    if (this.aforo == 0) {
      this.showReqErrorAforo = true;
      ret = false;
    }
    if (this.fecha.day == 0 && this.fecha.month == 0 && this.fecha.year == 0 ) {
      this.showReqErrorFecha = true;
      ret = false;
    }
    if (this.hora.hour == 0 && this.hora.minute == 0) {
      this.showReqErrorHora = true;
      ret = false;
    }
    return ret
  }
}

