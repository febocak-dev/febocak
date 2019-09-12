import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { InscripcionI } from '@models/inscripcion';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesResolver implements Resolve<InscripcionI[]> {

  constructor(private crudService: CrudService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<InscripcionI[]> {
    const club = this.authService.getUser().club;
    return this.crudService.queryByField$('inscripciones','club',club);
  }
}