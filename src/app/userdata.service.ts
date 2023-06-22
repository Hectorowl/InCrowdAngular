import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  //default language
  private lan:BehaviorSubject<string> = new BehaviorSubject<string>('');

  public getLan(){
    return this.lan.asObservable();
  }

  public updateLan(lan:string){
    this.lan.next(lan);
  }
  constructor() { }
}
