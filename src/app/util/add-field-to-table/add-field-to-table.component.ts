import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AddFieldToTableService } from '../services/add-field-to-table.service';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-field-to-table',
  templateUrl: './add-field-to-table.component.html',
  styles: []
})
export class AddFieldToTableComponent implements OnInit {
  nomTabla = ''
  nomCampo = ''

  constructor(
    private location: Location, 
    private crudService: CrudService,
    private addFieldService: AddFieldToTableService,
    private msg: MessageService) { }

  ngOnInit() {
  }

  async onAddField() {
    console.log(this.nomTabla, this.nomCampo)
    if (!this.nomTabla || !this.nomCampo) {
      this.msg.error('Debe indicar el nombre de la tabla y el nombre del campo')
      return
    }
    const obtenerDatos = async () => this.crudService.getAllRecords$(this.nomTabla).toPromise()
    const tabla = await obtenerDatos()

    if (tabla.length === 0) {
      this.msg.error('La tabla no existe o está vacia')
      return
    }

    const nomCampo = this.nomCampo
    tabla.forEach( el => {
      if (el.hasOwnProperty(nomCampo)) {
        this.msg.error('Por lo menos un registro ya tiene el campo:' + nomCampo)
        return
      }
    })

    let procesando = true;
    tabla.forEach((el, index) => {
      const record = {...el, [nomCampo]: ''}
      this.crudService.updateRecord$(this.nomTabla, record.id, record).subscribe(
        _ => {
          console.log(index)
          if (index + 1 === tabla.length) {
            procesando = false
            this.msg.ok('Proceso realizado')
            this.location.back();
          }
        }
      )
    })

  }

  goBack() {
    this.location.back();
  }
}
