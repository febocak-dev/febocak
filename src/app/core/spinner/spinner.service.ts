import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private subject = new BehaviorSubject<boolean>(false);
   
  constructor() {
  }

  on() {
    this.subject.next(true);
  }
  
  off() {
    this.subject.next(false);
  }

  getSpinner(): Observable<any> {
    return this.subject.asObservable();
  }

}