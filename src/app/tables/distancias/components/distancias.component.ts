import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';
import { DistanciaI } from '@models/distancia';

@Component({
  selector: 'app-distanciass',
  templateUrl: './distancias.component.html',
  styles: []
})
export class DistanciasComponent implements OnInit {
  tCompetencia: TipoDeCompetenciaI;
  tabla: DistanciaI[];
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.tCompetencia = { 
      ...this.route.snapshot.data['distanciaData'],
      id: this.route.snapshot.paramMap.get('idTipoDeCompetencia')
    };
    this.tabla = this.tCompetencia.distancia;
  }
  
}
