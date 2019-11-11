import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { Observable, forkJoin } from 'rxjs';
import { TipoDeCompetenciaI } from '@models/tipo-de-competencia';
import { CategoriaI } from '@models/categoria';

@Injectable({
  providedIn: 'root'
})
export class DistanciasFormResolver  implements Resolve<[TipoDeCompetenciaI, CategoriaI[]]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[TipoDeCompetenciaI, CategoriaI[]]> {
    const idTipoDeCompetencia = route.paramMap.get('idTipoDeCompetencia');
    const allData$ = forkJoin(
      this.crudService.getRecord$('tipos-de-competencias', idTipoDeCompetencia),
      this.crudService.getAllRecords$('categorias','categoria')
    );
    
    return allData$;
  }
}