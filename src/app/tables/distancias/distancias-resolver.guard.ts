import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { Observable } from 'rxjs';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';

@Injectable({
  providedIn: 'root'
})
export class DistanciasResolver implements Resolve<TipoDeCompetenciaI> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<TipoDeCompetenciaI> {
    const id = route.paramMap.get('idTipoDeCompetencia');
    return this.crudService.getRecord$('tipos-de-competencias',id);
  }
}