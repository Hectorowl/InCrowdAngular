import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router : Router
  ) { }


  toCreate(){
    console.log('Enter toCreate');
    this.router.navigate(['eventoCreate']);
  }

  toPrincipal() {
    console.log('Enter toPrincipal');
    this.router.navigate(['principal']);
  }

  toLogout() {
      this.router.navigate(['inicio']);
  }

  toAccount() {
    this.router.navigate(['perfil']);
  }

  toSearch() {
    this.router.navigate(['busqueda']);
  }

}
