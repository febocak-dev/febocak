import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CrudService } from '@services/crud.service';
import { ClubI } from '@models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubesFormResolver implements Resolve<ClubI> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ClubI> {
    const id = route.paramMap.get('id');
    return  this.crudService.getRecord$('clubes',id);
  }
}