import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetenciaI } from '@models/competencia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ['']
})
export class HomeComponent implements OnInit {
  competencia: CompetenciaI;
  strFecha: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.competencia = this.route.snapshot.data['competenciaData'];
    this.strFecha = this.formatFecha(this.competencia.desde, this.competencia.hasta);
  }

  descripcionDelStatus(status: string) {
    
    switch (status) {
      case 'Establecer próxima competencia':
        return 'Próxima competencia';
        break;
      case 'Abrir inscripciones':
        return 'Inscripciones abiertas';
        break;
      case 'Cerrar inscripciones':
        return 'Inscripciones cerradas';
        break;
      case 'Exportar datos':
        return 'Inscripciones cerradas - Datos exportados';
        break;
      case 'Abrir competencia':
        return 'En competencia';
        break;
      case 'Importar datos':
        return 'Resultados de la competencia cargados';
        break;
      case 'Cerrar competencia':
        return 'Competencia guardada en el histórico';
        break;
   
      default:
        break;
    }
  }

  formatFecha(parDesde, parHasta) {
    const desde = new Date(parDesde).toLocaleDateString();
    const hasta = new Date(parHasta).toLocaleDateString();
    return desde + ' hasta ' + hasta;
  }
}
