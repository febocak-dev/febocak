import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { SeriesI, SerieI, DetalleSerieI } from "src/app/models/serie";
import { Router } from "@angular/router";
import { MessageService } from '@core/message/message.service';
import { SeriesService } from '../services/series.service';

@Component({
  selector: "app-editar-serie",
  templateUrl: "./editar-serie.component.html",
  styleUrls: ["./editar-serie.component.scss"]
})
export class EditarSerieComponent implements OnInit {
  mostrarSeries = false;
  title = "angular-drag-drop";
  series: SeriesI[] = [];

  constructor(
    private dataService: SeriesService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private msg: MessageService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  filtrarSeries(objFiltro) {
    this.series = [];
    const arrSeriesPrueba = this.dataService.getSeries()
    
    const arrSeries: string[] = this.dataService.getSeries()
      .filter( elemento => elemento.genero === objFiltro.genero && elemento.categoria === objFiltro.categoria && elemento.distancia === objFiltro.distancia)
      .map(elemento => elemento.id);
    this.getSeries(arrSeries);
    this.mostrarSeries = true;
  }

  getSeries(arrFiltro: string[]) {
    if (arrFiltro) {
      arrFiltro.forEach(elemento =>
        this.series.push({
          serie: elemento,
          detalleSerie: this.dataService.getDetalleSerie(elemento)
        })
      ); 
    } else {
      this.series = null;
    }
  }

  get SerieIds(): string[] {
    return this.series.map(serie => serie.serie);
  }

  onTalkDrop(event: CdkDragDrop<DetalleSerieI[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given task to the target data array. This happens if
    // a task has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onTrackDrop(event: CdkDragDrop<DetalleSerieI[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  limpiarFiltro() {
    this.getSeries(null);
    this.cdRef.detectChanges();
    this.mostrarSeries = false;
  }

  guardarCambios() {
    this.actualizarIdSerie();
    this.series.forEach(serie => {
      serie.detalleSerie.map( (el, index) => { 
        el.numero = (index+1).toString();
        return el;
      });
      this.dataService.updateDetalleSeries(serie.serie, serie.detalleSerie);
      let nuevaSerie = this.dataService.getSerie(serie.serie);
      nuevaSerie.cantidad = serie.detalleSerie.length.toString();
      this.dataService.updateSerie(serie.serie, nuevaSerie);
    });
    this.msg.ok('Proceso realizado satisfactoriamente');
    this.limpiarFiltro();
  }

  actualizarIdSerie() {
    this.series.forEach(serie =>
      serie.detalleSerie.map(palista => {
        palista.idSerie = serie.serie;
        return palista;
      })
    );
  }

  salir() {
    this.router.navigate(["/"]);
  }
}
