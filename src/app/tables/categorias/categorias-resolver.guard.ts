import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { CategoriaI } from '@models/categoria';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasResolver implements Resolve<CategoriaI[]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<CategoriaI[]> {
    return this.crudService.getAllRecords$('categorias','desde');
  }
}