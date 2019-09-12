import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { CompetenciaI } from '@models/competencia';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<CompetenciaI> {

  constructor(private dataService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<CompetenciaI> {
    const data = this.dataService.getRecord$<CompetenciaI>('consola','01');
    return data;
  }
}