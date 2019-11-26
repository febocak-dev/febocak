import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  public data = [];
  public data$ = new BehaviorSubject(null);

  clearMessages() {
    this.data$.next(null);
  }

  public sendData(data) {
    this.data$.next({ ...data });
    this.data.push({...data});

  }

  public getData(tipo: string) {
    
    /* let elemento = this.data.find( (el, index) => {
      return el.nombre === nombre
    });
    return elemento.value; */
    return this.data[tipo];
  }
  
}