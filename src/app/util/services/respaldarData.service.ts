import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, from, throwError, of } from "rxjs";
import { map, tap, flatMap, catchError, first, take, startWith } from "rxjs/operators";

interface RecordI {
  id?: string;
}
@Injectable({
  providedIn: "root"
})
export class RespaldarDataService {

  constructor(private afs: AngularFirestore) {
  }

  queryByField$<T extends RecordI>(tableName: string, field:string, queryValue: string): Observable<T[]> {
    let collection = this.afs.collection<T>(tableName, ref => ref.where(field, '==', queryValue));
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as T;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }
  getAllRecords$<T extends RecordI>(tableName: string, sort=''): Observable<T[]> {
    let collection: AngularFirestoreCollection;
    if (sort) {
      collection = this.afs.collection(tableName, ref => ref.orderBy(sort) );
    } else {
      collection = this.afs.collection(tableName);
    }
    return collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as T;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getRecord$<T extends RecordI>(tableName: string, id: string): Observable<T> {
    if (tableName === 'competencias') {
      console.log('get record competencia Id', id);
    }
    return this.afs.doc<T>(`${tableName}/${id}`).valueChanges();
  }

  getRecordByField$<T extends RecordI>(tableName:string, field:string, searchValue: string) {
    return this.afs.collection<T>(tableName, ref => ref.where(field, '==', searchValue)).valueChanges()
      .pipe( flatMap( data => data) );
  }
  
  addRecord$<T extends RecordI>(tableName: string, registro: T) {
    const collection = this.afs.collection(tableName);
    return from(collection.add(registro));
  }

  updateRecord$<T extends RecordI>(tableName: string, id: string, registro: T) {
    return from(this.afs.doc<T>(`${tableName}/${id}`).update(registro)).pipe(
      catchError(this.handleError)
    );
  }

  deleteRecord$<T extends RecordI>(tableName: string, id: string) {
    return from(this.afs.doc<T>(`${tableName}/${id}`).delete());
  }

  private handleError(err: any) {
    console.log('handleError');
    console.error(err);
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
