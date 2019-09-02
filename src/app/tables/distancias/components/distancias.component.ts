import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CompetenciaI } from '@models/competencia';
import { DistanciaI } from '@models/competencia';

@Component({
  selector: 'app-distanciass',
  templateUrl: './distancias.component.html',
  styles: []
})
export class DistanciasComponent implements OnInit {
  competencia: CompetenciaI;
  tabla: DistanciaI[];
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.competencia = { 
      id: this.route.snapshot.paramMap.get('idCompetencia'),
      ...this.route.snapshot.data['distanciaData']
    };
    this.tabla = this.competencia.distancia;
  }

  
}
