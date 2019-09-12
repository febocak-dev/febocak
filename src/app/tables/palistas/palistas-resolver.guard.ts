import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { PalistaI } from '@models/palista';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PalistasResolver implements Resolve<PalistaI[]> {

  constructor(private crudService: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<PalistaI[]> {
            console.log('Palistas resolver')
    return this.crudService.getAllRecords$('palistas','palista');
  }
}