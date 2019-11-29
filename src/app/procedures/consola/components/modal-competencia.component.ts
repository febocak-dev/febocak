import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CompetenciaI } from 'src/app/models/competencia';
import { CrudService } from '@services/crud.service';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';

@Component({
  selector: 'app-modal-competencia',
  templateUrl: './modal-competencia.component.html',
  styles: []
})
export class ModalCompetenciaComponent implements OnInit {
  @ViewChild('btClose', {static: false}) btClose: ElementRef;
  @Input() tabla: CompetenciaI[];
  @Output() emitSeleccionar = new EventEmitter<CompetenciaI>();

  constructor(private crudService: CrudService) { }

  ngOnInit() {
  }

  async seleccionar(registro: CompetenciaI) {
    console.log('TCL: ModalCompetenciaComponent -> seleccionar -> registro antes', registro)

    const tipoDeCompetencia = 
      await this.crudService.getRecordByField$<TipoDeCompetenciaI>('tipos-de-competencias', 'tipo', registro.tipoDeCompetencia).toPromise()
    registro = {...registro, distancia: tipoDeCompetencia.distancia} 
    
    console.log('TCL: ModalCompetenciaComponent -> seleccionar -> registro despues', registro)
      await this.crudService.updateRecord$('competencias', registro.id, registro).toPromise()

    this.emitSeleccionar.emit(registro);
    this.btClose.nativeElement.click();
  }

  cancelar(){
    this.btClose.nativeElement.click();
  }
}
