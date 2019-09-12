import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ClubI } from '@models/club';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasResolver implements Resolve<ClubI[]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ClubI[]> {
    return this.crudService.getAllRecords$('competencias','competencia');
  }
}