import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { InscripcionI } from 'src/app/models/inscripcion';
import { MessageService } from '@core/message/message.service';
import { CrudService } from '@services/crud.service';
import { SeriesService } from '../services/series.service';

@Component({
  selector: 'app-generar-series',
  templateUrl: './generar-series.component.html',
  styles: []
})
export class GenerarSeriesComponent implements OnInit {
  inscripciones = [];
  grupoSeries = [];
  series = [];
  detalleSeries = [];
  clubes = [];
  semis = [];
  finales = [];

  constructor(private router: Router, 
    private location: Location,
    private msg: MessageService,
    private crudService: CrudService,
    private dataService: SeriesService) {

  }

  ngOnInit() {
    this.limpiarCarreras();
    this.cargarInscripciones();

  }

  limpiarCarreras() {
    this.dataService.limpiarCarreras();
  }

  cargarInscripciones() {

    this.crudService.getAllRecords$<InscripcionI>('inscripciones').subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].distancia.length; j++) {
            this.inscripciones.push({...data[i], distancia: data[i].distancia[j]});
          }
        }
        this.inscripciones.sort(
          (a, b) => {
            let aValue = a.categoria + a.genero + a.distancia;
            let bValue = b.categoria + b.genero + b.distancia;
            return aValue === bValue ? 0 : aValue > bValue ? -1 : 1;
          }
        );

        this.generarClubes();
        this.generarSeries();
        this.generarFinalesYsemis();
      }
    )
  }

  generarClubes() {
    this.inscripciones.forEach( elemento => {
      if (this.clubes.indexOf(elemento.club) === -1) {
        this.clubes.push(elemento.club);
      }
    });
  }

  generarSeries() {
    let numCarrera = 0;
    let i = 0;
    while (i < this.inscripciones.length) {
      let elemento = this.inscripciones[i];

      numCarrera++;
      let registro = this.generarObjetoSerie(elemento, numCarrera);
      this.series.push(registro);
      this.agregraGrupoSeries(registro);
      let numero = 0;
      while ( i < this.inscripciones.length && 
              elemento.categoria + elemento.genero + elemento.distancia === 
              registro.categoria + registro.genero + registro. distancia &&
              this.series[numCarrera - 1].cantidad < 9 ) {
        
        numero++;
        this.contarGrupoSeries(registro);
        this.series[numCarrera - 1].cantidad++;
        this.detalleSeries.push( {...elemento, numero: numero.toString(), idSerie: registro.id, tiempo: ''} );

        i++;
        elemento = this.inscripciones[i];
      }
    }
   
  }

  generarObjetoSerie(data, contador: number) {
    return { 
      id: contador.toString().padStart(4, '0'),
      categoria: data.categoria, 
      genero: data.genero, 
      distancia: data.distancia,
      cantidad: 0,
      status: { asignarNumero: false, cargarTiempos: false,  generarResultados: false }
    };
  }

  agregraGrupoSeries(registro) {
    const encontro = this.grupoSeries.find( elemento => 
                    elemento.categoria + elemento.genero + elemento.distancia === registro.categoria + registro.genero + registro. distancia);
    if (!encontro) {
      this.grupoSeries.push({ 
        categoria: registro.categoria, genero: registro.genero, distancia: registro.distancia, total: 0
      });
    }
  }

  contarGrupoSeries(reg) {
    let indice = this.grupoSeries.findIndex( el => 
      el.categoria + el.genero + el.distancia === reg.categoria + reg.genero + reg.distancia);

    this.grupoSeries[indice].total++;
  }

  generarFinalesYsemis() {
    let condiciones = [
      { minimo: 10, maximo: 18, 
        carreras: { series: 2, semis: 1, final: 1 },
      },
      { minimo: 19, maximo: 27, 
        carreras: { series: 3, semis: 2, final: 1 },
      },
      { minimo: 28, maximo: 36, 
        carreras: { series: 4, semis: 3, final: 1 },
      },
      { minimo: 37, maximo: 45, 
        carreras: { series: 5, semis: 3, final: 1 },
      },
      { minimo: 46, maximo: 54, 
        carreras: { series: 6, semis: 3, final: 1 },
      },
      { minimo: 55, maximo: 63, 
        carreras: { series: 7, semis: 4, final: 1 },
      },
      { minimo: 64, maximo: 72, 
        carreras: { series: 8, semis: 4, final: 1 },
      }
    ];

    for (let i = 0; i < this.grupoSeries.length; i++) {
      let el = this.grupoSeries[i];
      for (let j = 0; j < condiciones.length; j++) {
        let condicion = condiciones[j] ;
        if (el.total >= condicion.minimo && el.total <= condicion.maximo) {
          this.grupoSeries[i] = {...el, carreras: condicion.carreras };
        }
      }
    }
    
    let contadorSemis = 0;
    let contadorFinales = 0;
    this.grupoSeries.forEach( el => {
      if (!!el.carreras) {
        for ( let i = 0; i < el.carreras.semis; i++) {
          contadorSemis++;
          this.semis.push({ 
            id: 'S' + contadorSemis.toString().padStart(3, '0'),
            categoria: el.categoria, 
            genero: el.genero,
            distancia: el.distancia, 
            cantidad: '0',
            status: { asignarNumero: false, cargarTiempos: false,  generarResultados: false }
          });
        }

        
        contadorFinales++;
        this.finales.push({ 
          id: 'F' + contadorFinales.toString().padStart(3, '0'),
          categoria: el.categoria, 
          genero: el.genero,
          distancia: el.distancia, 
          cantidad: '0',
          status: { asignarNumero: false, cargarTiempos: false,  generarResultados: false }
        });

      }
    });
  }
  

  onGenerar() {
    /* TODO: Verificar que no existan series, 
        si hay series mostrar warning, 
        si las series tienen tiempos cargados impedir generar series.
    */
    this.dataService.addAllGrupoSeries(this.grupoSeries);
    this.dataService.addAllSemifinales(this.semis);
    this.dataService.addAllFinales(this.finales);
    this.dataService.addSeriesLS$(this.series).subscribe(
      () => 
        this.dataService.addDetalleSeriesLS$(this.detalleSeries).subscribe(
          () => this.msg.ok('Proceso realizado satisfactoriamente')
      ),
      () => this.msg.error('Error generando las series'),
      () => this.router.navigate(['home'])
    );
  }

  goBack() {
    this.location.back();
  }
}
