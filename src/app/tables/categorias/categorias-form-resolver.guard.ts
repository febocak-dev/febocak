import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { CategoriaI } from '@models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasFormResolver implements Resolve<CategoriaI> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<CategoriaI> {
    const id = route.paramMap.get('id');
    return  this.crudService.getRecord$('categorias',id);
  }
}