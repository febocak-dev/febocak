import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-palistas',
  templateUrl: './palistas.component.html',
  styles: []
})
export class PalistasComponent implements OnInit {
  tabla: [];
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.tabla = this.route.snapshot.data['palistaData'];
  }

}
