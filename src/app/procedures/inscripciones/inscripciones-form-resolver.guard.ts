import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { CrudService } from '@services/crud.service';
import { ClubI } from '@models/club';
import { InscripcionI } from '@models/Inscripcion';
import { CategoriaI } from '@models/categoria';
import { PalistaI } from '@models/palista';
import { CompetenciaI } from '@models/competencia';
import { DistanciaI } from '@models/distancia';

import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesFormResolver 
    implements Resolve<[InscripcionI, ClubI[], CategoriaI[], PalistaI[], InscripcionI[], DistanciaI[] ]> {

  constructor(private crudService: CrudService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<[InscripcionI, ClubI[], CategoriaI[], PalistaI[], InscripcionI[], DistanciaI[] ]> {
    

    const distancias$: Observable<DistanciaI[]> = this.crudService.getRecord$<CompetenciaI>('consola', '01').pipe(
      map( data => data.idCompetencia.trim()),
      mergeMap(idCompetencia => this.crudService.getRecord$<CompetenciaI>('competencias', idCompetencia)),
      map(competencia => competencia.distancia as DistanciaI[])
      );

    const club = this.authService.getUser().club;
    const id = route.paramMap.get('id');
    const allData$ = forkJoin(
      this.crudService.getRecord$('inscripciones',id),
      this.crudService.getAllRecords$('clubes','nombre'),
      this.crudService.getAllRecords$('categorias','desde'),
      this.crudService.queryByField$('palistas','club',club),
      this.crudService.queryByField$('inscripciones','club',club),
      distancias$
    );
    
    return allData$;
  }
}
