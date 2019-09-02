import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styles: []
})
export class ClubesComponent implements OnInit {
  tabla = [];
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.tabla = this.route.snapshot.data['clubData'];

  }

}
