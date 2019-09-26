import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CompetenciaI } from 'src/app/models/competencia';
import { CrudService } from '@services/crud.service';
import { MessageService } from '@core/message/message.service';

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styles: []
})
export class ConsolaComponent implements OnInit {

  tblCompetencias: CompetenciaI[];
  registro: CompetenciaI;
  nivelStatus = 0;
  desStatus = '';

  constructor(private crudService: CrudService, 
              private msg: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.getRecords();
    this.crudService.getAllRecords$('competencias').subscribe(
      data => this.tblCompetencias = data
    );
  }

  getRecords() {
    this.crudService.getRecord$('consola','01').subscribe(
      data => {
        this.registro = data;
        this.setState();
      }
    );
  }

  setState() {
    
    switch (this.registro.status) {
      case 'Establecer próxima competencia':
        this.nivelStatus = 1;
        this.desStatus = 'Próxima competencia';
        break;
      case 'Abrir inscripciones':
        this.nivelStatus = 2;
        this.desStatus = 'Inscripciones abiertas';
        break;
      case 'Cerrar inscripciones':
        this.nivelStatus = 3;
        this.desStatus = 'Inscripciones cerradas';
        break;
      case 'Exportar datos':
        this.nivelStatus = 4;
        this.desStatus = 'Inscripciones cerradas - Datos exportados';
        break;
      case 'Abrir competencia':
        this.nivelStatus = 5;
        this.desStatus = 'En competencia';
        break;
      case 'Importar datos':
        this.nivelStatus = 6;
        this.desStatus = 'Resultados de la competencia cargados';
        break;
      case 'Cerrar competencia':
        this.nivelStatus = 0;
        this.desStatus = 'Competencia guardada en el histórico';
        break;
   
      default:
        break;
    }
  }

  seleccionarCompetencia(registro: CompetenciaI){
    console.log('seleccionarCompetencia',registro);
    if (registro) {
      this.establecerProximaCompetencia(registro);
    }
  }

  establecerProximaCompetencia(registro: CompetenciaI) {
    if (this.nivelStatus !== 0) {
      this.msg.ok('Este proceso ya se realizó');
      return 
    }
    this.registro = registro;
    this.registro.status = 'Establecer próxima competencia';
    this.registro.id = '01';

    this.crudService.updateRecord$('consola','01', this.registro).subscribe(
      _ => {
        this.msg.ok('Competencia establecida satisfactoriamente');
        this.nivelStatus = 1;
      },
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => console.log("this.router.navigate(['home'])")
    );
  }

  abrirInscirpciones() {
    if (this.nivelStatus > 4) {
      this.msg.ok('No puede reabrir las inscripciones después de haber importado los datos de la competencia');
      return 
    }
    if (this.nivelStatus < 1) {
      this.msg.ok('Primero debe establecer la competencia');
      return 
    }
    this.registro.status = 'Abrir inscripciones';
    
    this.crudService.updateRecord$('consola','01', this.registro).subscribe(
      _ => {
        this.msg.ok('Inscripciones abiertas satisfactoriamente');
        this.nivelStatus = 2;
      },
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => console.log("this.router.navigate(['home'])")
    );
  }

  cerrarInscirpciones() {
    if (this.nivelStatus > 2) {
      this.msg.ok('Este proceso ya se realizó');
      return 
    }
    if (this.nivelStatus < 2) {
      this.msg.ok('Primero debe abrir inscripciones');
      return 
    }

    this.registro.status = 'Cerrar inscripciones';
    this.crudService.updateRecord$('consola','01', this.registro).subscribe(
      _ => {
        this.msg.ok('Inscripciones cerradas satisfactoriamente');
        this.nivelStatus = 3;
      },
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => console.log("this.router.navigate(['home'])")
    );
  }

  exportarDatos() {
    /* if (this.nivelStatus > 3) {
      this.msg.ok('Este proceso ya se realizó');
      return 
    } */
    if (this.nivelStatus < 3) {
      this.msg.ok('Primero debe cerrar inscripciones');
      return 
    }
    this.registro.status = 'Exportar datos';
    this.nivelStatus=4;

    this.guardarStatus('Datos exportados satisfactoriamente');
  }

  abrirCompetencia() {
    if (this.nivelStatus > 4) {
      this.msg.ok('Este proceso ya se realizó');
      return 
    }
    if (this.nivelStatus < 4) {
      this.msg.ok('Primero debe exportar los datos');
      return 
    }
    this.registro.status = 'Abrir competencia';
    this.nivelStatus=5;

    this.guardarStatus('Competencia abierta satisfactoriamente');
  }

  importarDatos() {
    if (this.nivelStatus > 5) {
      this.msg.ok('Este proceso ya se realizó');
      return 
    }
    if (this.nivelStatus < 5) {
      this.msg.ok('Primero debe abrir la competencia');
      return 
    }
    this.registro.status = 'Importar datos';
    this.nivelStatus++;

    this.guardarStatus('Datos importados satisfactoriamente');
  }

  cerrarCompetencia() {
    if (this.nivelStatus > 6) {
      this.msg.ok('Este proceso ya se realizó');
      return 
    }
    if (this.nivelStatus < 6) {
      this.msg.ok('Primero debe importar los datos');
      return 
    }
    this.registro.status = 'Cerrar competencia';
    this.nivelStatus++;

    this.guardarStatus('Competencia cerrada satisfactoriamente');
  }

  guardarStatus(mensaje: string) {
    this.crudService.updateRecord$('consola',this.registro.id, this.registro).subscribe(
      _ => this.msg.ok(mensaje),
      error => this.msg.error('Error al actualizar los datos: ' + error.statusText),
      () => console.log("this.router.navigate(['home'])")
    );
  }

}
