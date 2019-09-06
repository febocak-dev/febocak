import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  constructor() { }

  groupAndFlat(source: any[], parFields: string[]) {
    const copySource = [...source];
    copySource.sort( (a, b) => this.mayMinOrEqual(a,b, parFields));
    
    let newArray = [];
    let group = this.concatFields(copySource[0], parFields);
    newArray.push(copySource[0]);

    for (let i = 0; i < copySource.length; i++) {
      let newGroup = this.concatFields(copySource[i], parFields)
      if ( newGroup !== group ) {
        group = newGroup;
        newArray.push(copySource[i]);
      }
    }

    return newArray;
  }

  groupAndCount(source: any[], parFields: string[]) {
    const copySource = [...source];
    copySource.sort( (a, b) => this.mayMinOrEqual(a,b, parFields));
    
    let newArray = [];

    let i = 0; 
    while (i < copySource.length) {
      let contador = 0;
      let group = this.concatFields(copySource[i], parFields);
      let element = copySource[i];
      while (i < copySource.length && group === this.concatFields(copySource[i], parFields)) {
        i++;
        contador++;
      }
      newArray.push({...element, cantidad: contador});
    }

    return newArray;
  }

  groupAndSum(source: any[], parFields: string[], fieldSum: number | string) {
    const copySource = [...source];
    copySource.sort( (a, b) => this.mayMinOrEqual(a,b, parFields));
    
    let newArray = [];

    let i = 0; 
    while (i < copySource.length) {
      let suma = 0;
      let group = this.concatFields(copySource[i], parFields);
      let element = copySource[i];
      while (i < copySource.length && group === this.concatFields(copySource[i], parFields)) {
        suma += +copySource[i][fieldSum];
        i++;
      }
      newArray.push({...element, suma});
    }

    return newArray;
  }

  concatFields(obj: any, fields: string[]) {
    return fields.reduce( (acc, el) => acc + obj[el].trim(), '');
  }

  mayMinOrEqual(parA: any, parB: any, fields: string[]) {
    const A = this.concatFields(parA, fields);
    const B = this.concatFields(parB, fields);

    if (A > B ) {
      return 1;
    }
    if (B > A ) {
      return -1;
    };
    return 0

  }

}

/*

   --- ALGUNAS PRUEBAS ---
const contarArray = this.arrayService.groupAndCount(todasLasDistancias, ['embarcacion','distancia']);
    console.log('TCL: InscripcionesFormComponent -> ngOnInit -> contarArray', contarArray)
    const sumarArray = this.arrayService.groupAndSum(todasLasDistancias, ['embarcacion','distancia'], 'distancia');
    console.log('TCL: InscripcionesFormComponent -> ngOnInit -> sumarArray', sumarArray)
*/