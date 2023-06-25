import {Component, OnInit} from '@angular/core';
import {Evento} from "../app.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserdataService} from "../userdata.service";


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

  constructor(private http: HttpClient, private router: Router,private us:UserdataService){
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

  Edit(evento: Evento) {
    console.log(evento)
  }
}
