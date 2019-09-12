import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { ClubI } from '@models/club';
import { PalistaI } from '@models/palista';
import { CategoriaI } from '@models/categoria';

@Injectable({
  providedIn: 'root'
})
export class PalistasFormResolver implements Resolve<[PalistaI, ClubI[], CategoriaI[]]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[PalistaI, ClubI[], CategoriaI[]]> {
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('palistas',id),
      this.crudService.getAllRecords$('clubes','nombre'),
      this.crudService.getAllRecords$('categorias','desde')
    );
    
    return allData$;
  }
}