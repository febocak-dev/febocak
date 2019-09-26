import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CompetenciaI } from 'src/app/models/competencia';

@Component({
  selector: 'app-modal-competencia',
  templateUrl: './modal-competencia.component.html',
  styles: []
})
export class ModalCompetenciaComponent implements OnInit {
  @ViewChild('btClose', {static: false}) btClose: ElementRef;
  @Input() tabla: CompetenciaI[];
  @Output() emitSeleccionar = new EventEmitter<CompetenciaI>();

  constructor() { }

  ngOnInit() {
  }

  seleccionar(registro: CompetenciaI) {
    this.emitSeleccionar.emit(registro);
    this.btClose.nativeElement.click();
  }

  cancelar(){
    this.btClose.nativeElement.click();
  }
}
