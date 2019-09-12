import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CompetenciaI } from '@models/competencia';

@Injectable({
  providedIn: 'root'
})
export class DistanciasResolver implements Resolve<CompetenciaI> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<CompetenciaI> {
    const id = route.paramMap.get('idCompetencia');
    return this.crudService.getRecord$('competencias',id);
  }
}