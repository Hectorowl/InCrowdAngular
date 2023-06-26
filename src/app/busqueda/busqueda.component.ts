import {Component, OnInit} from '@angular/core';
import {Evento} from "../app.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserdataService} from "../userdata.service";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{

  user : string;

  listado : [Evento]
  listadoShow : [Evento]
  listadoNames : string[] = []
  listadoFilter : Evento[] = []
  listadoFilterNames : string[] = []
  listado_len : number;
  listadoShow_len : number;
  nores : boolean;
  page: number;
  pageSize: number;
  typeahead: string;

  constructor(private http: HttpClient, private router: Router,private us:UserdataService){
    this.us.getLan().subscribe(us => this.user = us);
  }

  ngOnInit(): void {
    if(this.user!='') {
      console.log(this.us)
      console.log(this.user)
      this.page = 1;
      this.pageSize = 10;
      this.listado_len = 0;
      this.listadoShow_len = 0;
      this.nores = false;
      this.typeahead = '';

      this.getListado();
    }else{
      this.router.navigate(['inicio']);
    }
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  getListado() {
    this.nores=false;
    this.http.get('http://localhost:4200/api' + '/Eventos/').subscribe(
      (resp: any) => {
        console.log(resp);
        this.listado = resp;
        this.listado_len = this.listado.length;
        this.listadoShow = this.listado
        this.listadoShow_len = this.listadoShow.length;
        if(this.listadoShow_len==0){this.nores=true;}
        else{
          // @ts-ignore
          this.listadoShow=this.listadoShow.filter(evento => evento.organizador != this.user)
          this.listadoShow_len = this.listadoShow.length;
          if(this.listadoShow_len==0){this.nores=true;}
          else {
            for (const event of this.listadoShow){
              this.listadoNames.push(event.nombre)
            }
            console.log(this.listadoNames)
            this.listadoFilter = this.listadoShow
            this.listadoFilterNames = this.listadoNames
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.nores=true
        console.error(error);
      });
  }
  filter(){
    console.log(this.typeahead)
    this.nores=false;
    this.listadoFilter = this.listadoShow.filter(evento => evento.nombre.toLowerCase().indexOf(this.typeahead.toLowerCase()) >-1 )
    this.listadoFilterNames = this.listadoNames.filter(evento => evento.toLowerCase().indexOf(this.typeahead.toLowerCase()) >-1 )
    if(this.listadoFilter.length==0){this.nores=true}
  }

}


