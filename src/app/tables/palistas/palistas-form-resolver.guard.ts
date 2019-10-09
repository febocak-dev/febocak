import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { ClubI } from '@models/club';
import { PalistaI } from '@models/palista';
import { CategoriaI } from '@models/categoria';
import { AuthService } from '@services/auth.service';
import { UserI } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class PalistasFormResolver implements Resolve<[PalistaI, ClubI[], CategoriaI[], PalistaI[], UserI]> {

  constructor(private crudService: CrudService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[PalistaI, ClubI[], CategoriaI[], PalistaI[], UserI]> {
    const id = route.paramMap.get('id');
    const currentUser = this.authService.getUser();
    const allData$ = forkJoin(
      this.crudService.getRecord$('palistas',id),
      this.crudService.getAllRecords$('clubes','nombre'),
      this.crudService.getAllRecords$('categorias','desde'),
      this.crudService.getAllRecords$('palistas'),
      of(currentUser)
    );
    
    return allData$;
  }
}