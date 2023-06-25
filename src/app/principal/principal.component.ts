import {Component, OnInit} from '@angular/core';
import {UserdataService} from "../userdata.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Evento} from "../app.component";
import {EventdataService} from "../eventdata.service";


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  user : string;

  listado : [Evento]
  listado_len : number;
  nores : boolean;
  page: number;
  pageSize: number;

  constructor(private http: HttpClient, private router: Router,private us:UserdataService,private es:EventdataService){
    this.us.getLan().subscribe(us => this.user = us);
  }

  ngOnInit(): void {
    this.user = 'hectoruser'
    console.log(this.us)
    console.log(this.user)
    this.page=1;
    this.pageSize=10;
    this.listado_len=0;
    this.nores=false;
    this.getListado();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  getListado() {
    this.nores=false;
      this.http.get('http://localhost:4200/api' + '/EventosRandom/'+this.user+'/').subscribe(
        (resp: any) => {
          console.log(resp);
          this.listado = resp;
          this.listado_len = this.listado.length;
          if(resp.length==0){this.nores=true;}
        },
        (error: HttpErrorResponse) => {
          this.nores=true
          console.error(error);
        });
  }

  toEvento(evento: Evento) {
    console.log('Enter toEvento');
    this.es.updateEsr(evento.nombre)
    this.router.navigate(['evento']);
  }
}
