import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {
  tabla = [];
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.tabla = this.route.snapshot.data['categoriaData'];

  }

}
