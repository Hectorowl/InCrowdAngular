import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventdataService {
  private esr:BehaviorSubject<string> = new BehaviorSubject<string>('');
  public getEsr(){
    return this.esr.asObservable();
  }

  public updateEsr(lan:string){
    this.esr.next(lan);
  }
  constructor() { }
}
