import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {}

  showDate(strFecha: string) {
    const fecha = new Date(strFecha + 'T00:00:00');
 
    const dia = fecha.getDate().toString().padStart(2, '0')
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
     
    return  dia + '/' + mes + '/' + fecha.getFullYear();
  }

  generarID() {
    const fecha = new Date();
    const año = fecha.getFullYear().toString().padStart(4, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');

    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    const ms = fecha.getMilliseconds().toString().padStart(1, '0');
    return 'local' + año + mes + dia + hora + minutos + segundos + ms;
  }
}
