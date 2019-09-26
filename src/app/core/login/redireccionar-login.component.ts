import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redireccionar-login',
  templateUrl: './redireccionar-login.component.html',
  styles: []
})
export class RedireccionarLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(["importar-inscripciones"]);
  }
}
