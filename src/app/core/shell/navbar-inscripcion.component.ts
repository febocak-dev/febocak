import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-inscripcion',
  templateUrl: './navbar-inscripcion.component.html',
  styleUrls: ['./nav-bar-inscripcion.component.css']
})
export class NavbarInscripcionComponent implements OnInit {
  @Input() usuario;
  @Output() emitLogout = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  onLogout() {
    this.emitLogout.emit('salir');
  }
}
