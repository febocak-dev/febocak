import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { CompetenciaI } from '@models/competencia';
import { CategoriaI } from '@models/categoria';

@Injectable({
  providedIn: 'root'
})
export class DistanciasFormResolver  implements Resolve<[CompetenciaI, CategoriaI[]]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[CompetenciaI, CategoriaI[]]> {
    const idCompetencia = route.paramMap.get('idCompetencia');
    const allData$ = forkJoin(
      this.crudService.getRecord$('competencias', idCompetencia),
      this.crudService.getAllRecords$('categorias','categoria')
    );
    
    return allData$;
  }
}