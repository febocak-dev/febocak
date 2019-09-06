import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styles: []
})
export class InscripcionesComponent implements OnInit {
  tabla: [];
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.tabla = this.route.snapshot.data['inscripcionData'];
  }

}
