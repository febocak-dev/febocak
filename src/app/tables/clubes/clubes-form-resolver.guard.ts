import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

import { CrudService } from '@services/crud.service';
import { ClubI } from '@models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubesFormResolver implements Resolve<[ ClubI, ClubI[] ]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[ ClubI, ClubI[] ]> {
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('clubes',id),
      this.crudService.getAllRecords$('clubes')
    );
    return  allData$;
  }
}