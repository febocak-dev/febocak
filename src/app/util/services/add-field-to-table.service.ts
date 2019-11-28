import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddFieldToTableService {

  constructor(private crudService: CrudService) { }

  addField(nomTabla: string, nomCampo: string, defaultValue: string) {
    this.crudService.getAllRecords$(nomTabla).pipe(
      tap(console.log),
      map(data => {
        const newData = []
        data.forEach(el => {
          console.log(el)
          const record = {...el, [nomCampo]: defaultValue }
          newData.push(record)
        })
        return newData
      }),
      tap(console.log)
    )

  }

}
