import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { CompetenciaI } from '@models/competencia';
import { ClubI } from '@models/club';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasFormResolver implements Resolve<[CompetenciaI, ClubI[], TipoDeCompetenciaI[], CompetenciaI[]]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[CompetenciaI, ClubI[], TipoDeCompetenciaI[], CompetenciaI[]]> {
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('competencias',id),
      this.crudService.getAllRecords$('clubes','nombre'),
      this.crudService.getAllRecords$('tipos-de-competencias'),
      this.crudService.getAllRecords$('competencias')
    );
    
    return allData$;
  }
}