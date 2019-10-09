import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CrudService } from '@services/crud.service';
import { PalistaI } from '@models/palista';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PalistasResolver implements Resolve<PalistaI[]> {

  constructor(private crudService: CrudService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<PalistaI[]> {
    const currentUser = this.authService.getUser();
   
    return this.crudService.getAllRecords$<PalistaI>('palistas','dni').pipe(
      map( data => data.filter( 
        palista => palista.club === currentUser.club )
      )
    );
  }
}