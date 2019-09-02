import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styles: []
})
export class CompetenciasComponent implements OnInit {
  tabla: [];
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.tabla = this.route.snapshot.data['competenciaData'];
  }

}
