import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

import { from, combineLatest, BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { CrudService } from '@services/crud.service';
import { UserI } from '@models/user';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private subjectUsuario = new BehaviorSubject<UserI>( this.getUser() ); 

  constructor(public afAuth: AngularFireAuth, 
              private crudService: CrudService) {
  }

  getUser(): UserI | null {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  getUser$(): Observable<UserI> {
    return this.subjectUsuario.asObservable();
  }
  sendUser(usuario: UserI) {
    this.subjectUsuario.next(usuario);
  }
  
  login$(email: string, password:string) {
    const fsSignIn$ = from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe( map( data => data.user.email) );
    
    const usuario$ = this.crudService.getRecordByField$('users','email', email);
    
    const combinado$ = combineLatest(fsSignIn$, usuario$).pipe(
      map( data => data[1]), 
      tap( user => this.setAndSendUsuario(user))
    );
    return combinado$;
  
  }

  logoutUser() {
    this.setAndSendUsuario(null);
    return this.afAuth.auth.signOut();
  }

  setAndSendUsuario(usuario: UserI) {
    sessionStorage.setItem('currentUser', JSON.stringify(usuario));
    this.sendUser(usuario);
  }

}
