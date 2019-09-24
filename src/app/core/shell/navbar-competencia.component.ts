import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-competencia',
  templateUrl: './navbar-competencia.component.html',
  styles: ['']
})
export class NavbarCompetenciaComponent implements OnInit {
  @Input() usuario;
  @Output() emitLogout = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  onLogout() {
    this.emitLogout.emit('salir');
  }
}
