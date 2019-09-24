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
    console.log('TCL: ShareDataService -> sendData -> data', data)
    this.data$.next({ ...data });
    this.data.push({...data});

    console.log(this.data);
  }

  public getData(tipo: string) {
    console.log('TCL: ShareDataService -> getData -> nombre', tipo)
    console.log('TCL: ShareDataService -> getData -> this.data', this.data)
    console.log('TCL: ShareDataService -> getData -> this.data', this.data[tipo])
    
    /* let elemento = this.data.find( (el, index) => {
      console.log(el);
      return el.nombre === nombre
    });
    return elemento.value; */
    return this.data[tipo];
  }
  
}