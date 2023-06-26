import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgbModal, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {UserdataService} from "../userdata.service";
import {EventdataService} from "../eventdata.service";
import {Evento, Mensaje, Usuario} from "../app.component";

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit{

  user : string;
  evento : string;
  constructor(private http: HttpClient, private router: Router,private modalService: NgbModal,private us:UserdataService, private es:EventdataService, private offcanvasService: NgbOffcanvas){
    this.us.getLan().subscribe(us => this.user = us);
    this.es.getEsr().subscribe(es => this.evento = es);
  }

  listadoMen : Mensaje[] = []
  eventoData: Evento
  listadoParticipantes: Usuario[] = []
  isParticipante: boolean = false
  showSendError: boolean;
  showSusError: boolean;
  showDesError: boolean;




  mensaje: string


  ngOnInit(): void {
    if(this.user!='' && this.evento!='') {
      this.isParticipante = false
      this.showSendError = false;
      this.showSusError = false;
      this.showDesError = false;

      this.mensaje = ''

      console.log(this.evento)
      console.log(this.user)
      this.getMensajes()
      this.getParticipantes()
      this.getEvento()
      this.getisParticipante()
      console.log(this.listadoMen)
      console.log(this.listadoParticipantes)
      console.log(this.eventoData)

    }else {this.router.navigate(['inicio']);}
  }

  getMensajes() {
    this.http.get('http://localhost:4200/api' + '/Mensajes/'+this.evento+'/').subscribe(
      (resp: any) => {
        console.log(resp);
        this.listadoMen = resp;
        console.log(this.listadoMen)
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  getParticipantes() {
    this.http.get('http://localhost:4200/api' + '/participantes/'+this.evento+'/').subscribe(
      (resp: any) => {
        console.log(resp);
        this.listadoParticipantes = resp;
        console.log(this.listadoParticipantes)

      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  getEvento() {
    this.http.get('http://localhost:4200/api' + '/Evento/'+this.evento+'/').subscribe(
      (resp: any) => {
        console.log(resp);
        this.eventoData = resp;
        console.log(this.eventoData)
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  getisParticipante() {
    this.http.get('http://localhost:4200/api' + '/esParticipante/'+this.evento+'/'+this.user+'/').subscribe(
      (resp: any) => {
        console.log(resp);
        if(resp.success){
          this.isParticipante = resp.message == "TRUE";
        }
        console.log(this.isParticipante)
      },
      (error: HttpErrorResponse) => {
        this.isParticipante = false
        console.error(error);
      });
  }


  escribir() {
    if(this.mensaje!='') {
      const newMensaje = { // Objeto usuario en registro
        autor: this.user,
        evento: this.evento,
        texto: this.mensaje,
      };

      this.http.post('http://localhost:4200/api' + '/CreateMensaje/', newMensaje).subscribe(
        (resp: any) => { // comprobar estado: 201 recurso creado, 409 error por repetición de user
          console.log(resp);
          console.log(resp.success);
          if(resp.success==true){
            this.showSendError=false
            this.getMensajes()
          }else{
            this.showSendError = true;
          }

        },
        (error: HttpErrorResponse) => {
          this.showSendError = true;
          console.log(error)
        });
    }
  }
  openCanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { backdropClass: 'bg-info' });
  }

  suscribir() {
      this.http.get('http://localhost:4200/api' + '/anadirParticipante/'+this.evento+'/'+this.user+'/').subscribe(
        (resp: any) => { // comprobar estado: 201 recurso creado, 409 error por repetición de user
          console.log(resp);
          console.log(resp.success);
          if(resp.success==true){
            this.showSusError=false
            this.isParticipante=true
            this.getParticipantes()
          }else{
            this.showSusError = true;
          }
        },
        (error: HttpErrorResponse) => {
          this.showSusError = true;
          console.log(error)
        });
    }

  desuscribir() {
    this.http.get('http://localhost:4200/api' + '/deleteParticipante/'+this.evento+'/'+this.user+'/').subscribe(
      (resp: any) => { // comprobar estado: 201 recurso creado, 409 error por repetición de user
        console.log(resp);
        console.log(resp.success);
        if(resp.success==true){
          this.showDesError=false
          this.isParticipante=false
          this.getParticipantes()
        }else{
          this.showDesError = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.showDesError = true;
        console.log(error)
      });
  }
}
