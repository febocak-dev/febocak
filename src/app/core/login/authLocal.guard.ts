import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthLocalGuard implements  CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( environment.modulo !== 'Competencias' ) {
      return true;
    }

    const usuarios = JSON.parse(localStorage.getItem('users'));
    if ( !!usuarios && !!usuarios[0].rol ) {
      return true;
    } else { 
      this.router.navigate(["redireccionar-login"]);
      return false;
    }
  }
}
