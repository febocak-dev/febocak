import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { CompetenciaI } from '@models/competencia';
import { ClubI } from '@models/club';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasFormResolver implements Resolve<[CompetenciaI, ClubI[], CompetenciaI[]]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[CompetenciaI, ClubI[], CompetenciaI[]]> {
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('competencias',id),
      this.crudService.getAllRecords$('clubes','nombre'),
      this.crudService.getAllRecords$('competencias')
    );
    
    return allData$;
  }
}