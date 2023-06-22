import { Component } from '@angular/core';
import {UserdataService} from "../userdata.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  user : string;


  constructor(private us:UserdataService){
    this.us.getLan().subscribe(us => this.user = us);
  }

  ngOnInit(): void {
    console.log(this.us)
    console.log(this.user)
  }
}
