import { Component, OnInit, Input } from '@angular/core';
import { CompetenciaI } from '@models/competencia';
import { Location } from '@angular/common';

@Component({
  selector: 'app-competencia-info',
  templateUrl: './competencia-info.component.html',
  styles: []
})
export class CompetenciaInfoComponent implements OnInit {
  @Input() competencia: CompetenciaI;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
