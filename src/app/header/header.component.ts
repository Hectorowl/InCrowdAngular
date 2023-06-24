import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router : Router,
    private http : HttpClient
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
    this.router.navigate(['inicio']);
  }

}
