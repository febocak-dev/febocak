import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipos-de-competencias',
  templateUrl: './tipos-de-competencias.component.html',
  styles: []
})
export class TiposDeCompetenciasComponent implements OnInit {
  tabla = [];
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.tabla = this.route.snapshot.data['tipoDeCompetenciaData'];
  }

}
