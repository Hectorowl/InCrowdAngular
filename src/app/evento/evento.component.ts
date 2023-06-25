import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserdataService} from "../userdata.service";
import {EventdataService} from "../eventdata.service";

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit{

  user : string;
  evento : string;
  constructor(private http: HttpClient, private router: Router,private modalService: NgbModal,private us:UserdataService, private es:EventdataService){
    this.us.getLan().subscribe(us => this.user = us);
    this.es.getEsr().subscribe(es => this.evento = es);
  }

  ngOnInit(): void {
    this.user = 'hectoruser'
    console.log(this.evento)
    console.log(this.user)
  }


}
