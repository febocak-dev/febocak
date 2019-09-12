import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { ClubI } from '@models/club';
import { UserI } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFormResolver implements Resolve<[UserI, ClubI[]]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[UserI, ClubI[]]> {
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('users',id),
      this.crudService.getAllRecords$('clubes','nombre')
    );
    
    return allData$;
  }
}