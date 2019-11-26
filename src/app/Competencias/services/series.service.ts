import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SerieI, DetalleSerieI } from 'src/app/models/serie';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from 'src/app/models/user';
import { AuthService } from '@services/auth.service';
import { UtilService } from '@services/util.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private collection: AngularFirestoreCollection<SerieI>;
  private usuario: UserI;

  

  constructor(private afs: AngularFirestore,
              private authService: AuthService,
              public util: UtilService) {
    this.usuario = this.authService.getUser();
  }

  private nombreDetalle(tipoCarrera: string) {
    return tipoCarrera === 'series' ? 'detalleSeries' : 
                    tipoCarrera === 'semis' ? 'detalleSemis' : 'detalleFinales';
  }

  limpiarCarreras() {
    localStorage.setItem('series', JSON.stringify([]));
    localStorage.setItem('detalleSeries', JSON.stringify([]));
    localStorage.setItem('semis', JSON.stringify([]));
    localStorage.setItem('detalleSemis', JSON.stringify([]));
    localStorage.setItem('finales', JSON.stringify([]));
    localStorage.setItem('detalleFinales', JSON.stringify([]));
  }

  /* Métodos para Editar series con Drag and Drop */
  getSerie(id: string): SerieI {
    const tabla: SerieI[] = JSON.parse(localStorage.getItem('series'));
    return tabla.find(elemento => elemento.id === id);
  }

  updateSerie(id: string, registro: SerieI) {
    registro.id = id;
    const tabla = JSON.parse(localStorage.getItem('series'));
    tabla.splice( tabla.findIndex(element => element.id === id), 1, registro );
    localStorage.setItem('series', JSON.stringify(tabla));
  }

  getSeries(): SerieI[] {
    return JSON.parse( localStorage.getItem('series') );
  }

  getDetalleSerie(id: string): DetalleSerieI[] {
    const series: DetalleSerieI[] = JSON.parse(localStorage.getItem('detalleSeries'));
    let serie = series.filter( elemento => elemento.idSerie === id)
    return serie;
  }
  
  updateDetalleSeries(id:string, tabla: DetalleSerieI[] ) {
    let series: DetalleSerieI[] = JSON.parse(localStorage.getItem('detalleSeries'));
    if (!series) {
      series = [];
    }
    let filtro = series.filter( elemento => elemento.idSerie !== id);
    localStorage.setItem('detalleSeries', JSON.stringify(tabla.concat(filtro)) );
  }
/* Semifinales y finales */

  getCarrera(tipoCarrera: string, id: string): SerieI {
    const tabla: SerieI[] = JSON.parse(localStorage.getItem(tipoCarrera));
    return tabla.find(elemento => elemento.id === id);
  }

  getCarreras(tipo: string): SerieI[] {
    return JSON.parse(localStorage.getItem(tipo) );
  }

  getDetalleCarrera(tipoCarrera:string, id: string): DetalleSerieI[] {
    const palistas: DetalleSerieI[] = JSON.parse(
      localStorage.getItem(this.nombreDetalle(tipoCarrera)) );
    return palistas.filter( elemento => elemento.idSerie === id);
  }

  updateCarrera(tipoCarrera:string, id: string, registro: SerieI) {
    const tabla = JSON.parse(localStorage.getItem(tipoCarrera));
    tabla.splice( tabla.findIndex(element => element.id === id), 1, registro );
    localStorage.setItem(tipoCarrera, JSON.stringify(tabla));
  }

  updateDetalleCarrera(tipoCarrera: string, id:string, tabla: DetalleSerieI[]  ) {
    const detalle = this.nombreDetalle(tipoCarrera);
    const series: DetalleSerieI[] = JSON.parse(localStorage.getItem(detalle)).
      filter( elemento => elemento.idSerie !== id);
    localStorage.setItem(detalle, JSON.stringify(series.concat(tabla)) );
  }
  /* **********   */

  getSemis(): SerieI[] {
    return JSON.parse( localStorage.getItem('semis') );
  }

  addAllSemifinales(tabla) {
    localStorage.setItem('semis', JSON.stringify(tabla));
  }

  updateDetalleSemis(id:string, tabla: DetalleSerieI[] ) {
    let series: DetalleSerieI[] = JSON.parse(localStorage.getItem('detalleSemis'));
    if (!series) {
      series = [];
    }
    let filtro = series.filter( elemento => elemento.idSerie !== id);
    localStorage.setItem('detalleSemis', JSON.stringify(tabla.concat(filtro)) );
  }


  getFinales(): SerieI[] {
    return JSON.parse( localStorage.getItem('finales') );
  }

  addAllFinales(tabla) {
    localStorage.setItem('finales', JSON.stringify(tabla));
  }

  updateDetalleFinales(id:string, tabla: DetalleSerieI[] ) {
    let series: DetalleSerieI[] = JSON.parse(localStorage.getItem('detalleFinales'));
    if (!series) {
      series = [];
    }
    let filtro = series.filter( elemento => elemento.idSerie !== id);
    localStorage.setItem('detalleFinales', JSON.stringify(tabla.concat(filtro)) );
  }

  addAllGrupoSeries(tabla) {
    localStorage.setItem('grupoSeries', JSON.stringify(tabla));
  }

  getGrupoSerie(categoria: string, genero: string, distancia: string) {
    const grupoSeries = JSON.parse( localStorage.getItem('grupoSeries') );
    return grupoSeries.find(
      el => el.categoria === categoria && el.genero === genero && el.distancia === distancia);

  }

/* */

  getRecords$(): Observable<SerieI[]> {
    return this.usuario.rol === 'Competencias' ? this.getRecordsLS$() : this.getRecordsFB$();
  }
  getRecordsLS$(): Observable<SerieI[]> {
    return of( JSON.parse(localStorage.getItem('series') ));
  }
  getRecordsFB$() {
    this.collection = this.afs.collection<SerieI>('series');
    return this.collection.snapshotChanges()
    .pipe( map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as SerieI;
        data.id = action.payload.doc.id;
        return data;
      })
    }));
  }

  getRecord$(id: string): Observable<SerieI> {
    const tabla: SerieI[] = JSON.parse(localStorage.getItem('series'));
    return of(tabla.find(elemento => elemento.id === id));
  }

  addRecord$(registro: SerieI){
    return this.usuario.rol === 'Competencias' ? this.addRecordLS$(registro) : this.addRecordFB$(registro);
  }
  addRecordLS$(registro: SerieI) {
    const tabla = JSON.parse(localStorage.getItem('series'));
    registro.id = this.util.generarID();
    tabla.push(registro);
    localStorage.setItem('series', JSON.stringify(tabla));
    return from(tabla);
  }
  addRecordFB$(registro: SerieI) {
    return from(this.collection.add(registro));
  }

  updateRecord$(id: string, registro: SerieI): Observable<any> {
    return this.usuario.rol === 'Competencias' ? this.updateRecordLS$(id, registro) : this.updateRecordFB$(id, registro);
  }
  updateRecordLS$(id: string, registro: SerieI): Observable<any> {
    registro.id = id;
    const tabla = JSON.parse(localStorage.getItem('series'));
    tabla.splice( tabla.findIndex(element => element.id === id), 1, registro );
    localStorage.setItem('series', JSON.stringify(tabla));
    return of(registro);
  }
  updateRecordFB$(id: string, registro: SerieI): Observable<any> {
    return from(this.afs.doc<SerieI>(`palistas/${id}`).update(registro));
  }

  deleteRecord$(id: string): Observable<any> {
    return this.usuario.rol === 'Competencias' ? this.deleteRecordLS$(id) : this.deleteRecordFB$(id);
  }
  deleteRecordLS$(id: string): Observable<any> {
    const tabla = JSON.parse(localStorage.getItem('series'));
    tabla.splice( tabla.findIndex(element => element.id === id), 1 );
    localStorage.setItem('series', JSON.stringify(tabla));
    return from(tabla);
  }
  deleteRecordFB$(id: string): Observable<any> {
    return from(this.afs.doc<SerieI>(`palistas/${id}`).delete());
  }

  addSeriesLS$(tabla ) {
    localStorage.setItem('series', JSON.stringify(tabla));
    return from(tabla);
  }

  addDetalleSeriesLS$(tabla ) {
    localStorage.setItem('detalleSeries', JSON.stringify(tabla));
    return from(tabla);
  }

  updateDetalleSeriesLS$(id, tabla ) {
    const series: DetalleSerieI[] = JSON.parse(localStorage.getItem('detalleSeries')).
      filter( elemento => elemento.idSerie !== id);
    localStorage.setItem('detalleSeries', JSON.stringify(series.concat(tabla)) );
    return from(tabla);
  }

  getDetalleSerieLS$(id: string): Observable<DetalleSerieI[]> {
    const series: DetalleSerieI[] = JSON.parse(localStorage.getItem('detalleSeries'));
    let serie = series.filter( elemento => elemento.idSerie === id)
    serie = serie.sort((a, b) => parseInt(a.numero) - parseInt(b.numero) < 0 ? -1 : 0);
    return of( serie );
  }
}
