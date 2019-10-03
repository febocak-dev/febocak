import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CrudService } from '@services/crud.service';
import { CategoriaI } from '@models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasFormResolver implements Resolve<[ CategoriaI, CategoriaI[] ]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[ CategoriaI, CategoriaI[] ]> {
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('categorias',id),
      this.crudService.getAllRecords$('categorias','desde')
    );
    return  allData$;
  }
}