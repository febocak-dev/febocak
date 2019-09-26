import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { CategoriaI } from "src/app/models/categoria";
import { ClubI } from 'src/app/models/club';
import { CompetenciaI } from 'src/app/models/competencia';
import { InscripcionI } from 'src/app/models/inscripcion';
import { PalistaI } from 'src/app/models/palista';
import { UserI } from 'src/app/models/user';

@Injectable({
  providedIn: "root"
})
export class ExportarService {

  constructor(private afs: AngularFirestore) {
  }

  getCategorias$(): Observable<CategoriaI[]> {
    const collection = this.afs.collection<CategoriaI>("categorias", ref => ref.orderBy('desde'));
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CategoriaI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getClubes$(): Observable<ClubI[]> {
    const collection = this.afs.collection<ClubI>("clubes");
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ClubI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getCompetencias$(): Observable<CompetenciaI[]> {
    const collection = this.afs.collection<CompetenciaI>("competencias");
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CompetenciaI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getConsola$(): Observable<CompetenciaI[]> {
    const collection = this.afs.collection<CompetenciaI>("consola");
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CompetenciaI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getInscripciones$(): Observable<InscripcionI[]> {
    const collection = this.afs.collection<InscripcionI>("inscripciones");
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as InscripcionI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getPalistas$(): Observable<PalistaI[]> {
    const collection = this.afs.collection<PalistaI>("palistas");
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as PalistaI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getUsers$(): Observable<UserI[]> {
    const collection = this.afs.collection<UserI>("users");
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserI;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }
}