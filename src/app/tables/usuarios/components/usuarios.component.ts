import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  tabla = [];
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.tabla = this.route.snapshot.data['usuarioData'];

  }

}
