import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { CrudService } from '@services/crud.service';
import { ClubI } from '@models/club';
import { InscripcionI } from '@models/Inscripcion';
import { CategoriaI } from '@models/categoria';
import { PalistaI } from '@models/palista';
import { DistanciaI, CompetenciaI } from '@models/competencia';

import { Observable, forkJoin } from 'rxjs';
import { map, tap, switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesFormResolver 
    implements Resolve<[InscripcionI, ClubI[], CategoriaI[], PalistaI[], InscripcionI[], CompetenciaI]> {

  constructor(private crudService: CrudService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<[InscripcionI, ClubI[], CategoriaI[], PalistaI[], InscripcionI[], CompetenciaI]> {
    
    const competencia = this.crudService.getRecord$<CompetenciaI>('consola','01').pipe(first());
    const club = this.authService.getUser().club;
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('inscripciones',id).pipe(first()),
      this.crudService.getAllRecords$('clubes','nombre').pipe(first()),
      this.crudService.getAllRecords$('categorias','desde').pipe(first()),
      this.crudService.queryByField$('palistas','club',club).pipe(first()),
      this.crudService.queryByField$('inscripciones','club',club).pipe(first()),
      this.crudService.getRecord$('competencias','lJBIk7KClZmifrIrSysT').pipe(first())
    );
    
    return allData$;
  }
}
