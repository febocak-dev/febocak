import { Component, OnInit, Input } from '@angular/core';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tipo-de-competencia-info',
  templateUrl: './tipo-de-competencia-info.component.html',
  styles: []
})
export class TipoDeCompetenciaInfoComponent implements OnInit {
  @Input() tCompetencia: TipoDeCompetenciaI;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
