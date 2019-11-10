import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposDeCompeteciasResolver implements Resolve<TipoDeCompetenciaI[]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<TipoDeCompetenciaI[]> {
    return this.crudService.getAllRecords$('tipos-de-competencias','tipo');
  }
}