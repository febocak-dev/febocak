import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CrudService } from '@services/crud.service';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';

@Injectable({
  providedIn: 'root'
})
export class TiposDeCompetenciasFormResolver implements Resolve<[ TipoDeCompetenciaI, TipoDeCompetenciaI[] ]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[ TipoDeCompetenciaI, TipoDeCompetenciaI[] ]> {
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('tipos-de-competencias',id),
      this.crudService.getAllRecords$('tipos-de-competencias','tipo')
    );
    return  allData$;
  }
}