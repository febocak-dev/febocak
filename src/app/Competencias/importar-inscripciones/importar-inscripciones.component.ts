import { Component, OnInit } from '@angular/core';
import { MessageService } from '@core/message/message.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-importar-inscripciones',
  templateUrl: './importar-inscripciones.component.html',
  styleUrls: ['./importar-inscripciones.component.css']
})
export class ImportarInscripcionesComponent implements OnInit {
  file;
  fecha: string;
  hora: string;
  tablas: string[];
  datos: Object;
  competencia;

  constructor(private router: Router, 
              private location: Location,
              private msg: MessageService) {
  }

  ngOnInit() {
  }

  onChange(e) {
    this.file = e.target.files[0];
    let fecha = new Date(this.file.lastModified);
    this.fecha = fecha.toLocaleDateString();
    this.hora = fecha.toLocaleTimeString();

    let reader  = new FileReader();
    reader.onloadend =  () => {
      this.datos = JSON.parse(reader.result as string);
      this.tablas = Object.keys(this.datos)
      this.competencia = this.datos['competencias'][0]; 
    }
    reader.readAsText(this.file);
  }

  onUpload() {
    localStorage.clear();
    const tablas = ['categorias', 'clubes', 'distancias', 'competencias', 'consola', 'inscripciones', 'palistas', 'users'];
    tablas.forEach( tabla => {
      localStorage.setItem(tabla, JSON.stringify(this.datos[tabla]));
    });
    this.router.navigate(['home']);
    this.msg.ok('Inscripciones importadas satisfactoriamente');
  }

  goBack() {
    this.location.back();
  }
 
}
