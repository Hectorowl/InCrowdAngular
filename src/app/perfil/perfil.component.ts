import {Component, OnInit} from '@angular/core';
import {Evento} from "../app.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserdataService} from "../userdata.service";
import {NgbDateStruct, NgbModal, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  user : string;

  listadoAp : [Evento]
  listadoMine : [Evento]
  listadoAp_len : number;
  listadoMine_len : number;
  noresAp : boolean;
  noresMine : boolean;
  pageMine: number;
  pageAp: number;
  pageSize: number;

  nombre: string;
  descripcion: string;
  fecha: NgbDateStruct;
  hora: NgbTimeStruct;
  esPublico: boolean;
  aforo: number;
  categoria: string;
  organizador: string;



  constructor(private http: HttpClient, private router: Router,private modalService: NgbModal,private us:UserdataService){
    this.us.getLan().subscribe(us => this.user = us);
  }

  ngOnInit(): void {
    this.user = 'hectoruser'
    console.log(this.us)
    console.log(this.user)
    this.pageMine=1;
    this.pageAp=1;
    this.pageSize=10;
    this.listadoAp_len=0;
    this.listadoMine_len=0;
    this.noresMine=false;
    this.noresAp=false;
    this.getListados();
  }

  selectPageMine(page: string) {
    this.pageMine = parseInt(page, 10) || 1;
  }
  selectPageAp(page: string) {
    this.pageAp = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  getListados() {
    this.noresMine=false;
    this.noresAp=false;

    this.http.get('http://localhost:4200/api' + '/Eventos/'+this.user+'/').subscribe(
      (resp: any) => {
        console.log(resp);
        this.listadoMine = resp;
        this.listadoMine_len = this.listadoMine.length;
        if(resp.length==0){this.noresMine=true;}
      },
      (error: HttpErrorResponse) => {
        this.noresMine=true
        console.error(error);
      });
    this.http.get('http://localhost:4200/api' + '/eventosApuntados/'+this.user+'/').subscribe(
      (resp: any) => {
        console.log(resp);
        this.listadoAp = resp;
        this.listadoAp_len = this.listadoAp.length;
        if(resp.length==0){this.noresAp=true;}
      },
      (error: HttpErrorResponse) => {
        this.noresAp=true
        console.error(error);
      });


  }

  // @ts-ignore
  edit(evento: Evento, content) {
    console.log(evento)
    this.nombre = evento.nombre;
    this.descripcion = evento.descripcion;
    this.fecha = {
      day: this.transformFecha(evento.fecha).getDate(),
      month: this.transformFecha(evento.fecha).getMonth()+1,
      year: this.transformFecha(evento.fecha).getFullYear()
    };
    console.log(this.fecha)
    this.hora = {
      hour: this.transformHora(evento.hora).getHours(),
      minute: this.transformHora(evento.hora).getMinutes(),
      second: 0
    };
    console.log(this.hora)
    this.esPublico = evento.esPublico;
    this.aforo = evento.aforo;
    this.categoria = evento.categoria;
    this.organizador = evento.organizador;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' ,size: "lg"}).result.then(
      (result) => {
        this.pageMine=1;
        this.pageAp=1;
        this.pageSize=10;
        this.listadoAp_len=0;
        this.listadoMine_len=0;
        this.noresMine=false;
        this.noresAp=false;
        this.getListados();
      },
      (reason) => {
        this.pageMine=1;
        this.pageAp=1;
        this.pageSize=10;
        this.listadoAp_len=0;
        this.listadoMine_len=0;
        this.noresMine=false;
        this.noresAp=false;
        this.getListados();
      },
    );

  }

  transformFecha(fecha: string){
    let date = new Date()
    let parts = fecha.split('-');
    console.log(parts)
    console.log(Number(parts[0]))
    date.setDate(Number(parts[0]))
    date.setMonth(Number(parts[1])-1)
    date.setFullYear(Number(parts[2]))
    return date;
  }

  transformHora(hora: string){
    let date = new Date()
    let parts = hora.split(':');
    console.log(parts)
    date.setHours(Number(parts[0]))
    date.setMinutes(Number(parts[1]))
    return date;
  }
}
