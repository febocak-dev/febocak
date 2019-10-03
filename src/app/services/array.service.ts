import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  constructor() { }

  sort(source: any[], parFields: string[], type = 'up') {
    const copySource = [...source];
    copySource.sort( (a, b) => this.biggerSmallerOrSame(a,b, parFields, type));
    return copySource;
  }

  groupAndFlat(source: any[], parFields: string[]) {
    const copySource = this.sort(source, parFields, 'down');
    
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
    copySource.sort( (a, b) => this.biggerSmallerOrSame(a,b, parFields));
    
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
    copySource.sort( (a, b) => this.biggerSmallerOrSame(a,b, parFields));
    
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
  console.log('TCL: ArrayService -> concatFields -> obj', obj)
  console.log('TCL: ArrayService -> concatFields -> fields', fields)
    
    let retorno = fields.reduce( (acc, el) => acc + this.toString(obj[el]).trim(), '');
    return retorno;
  }

  toString( parVariable: string | number | boolean) {
    if (typeof parVariable === 'number') {
      return parVariable.toString();
    }
    if (typeof parVariable === 'boolean') {
      return parVariable ? '1' : '0';
    }
    if (typeof parVariable === 'string') {
      return parVariable;
    }

  }

  biggerSmallerOrSame(parA: any, parB: any, fields: string[], type = 'up') {
    const A = this.concatFields(parA, fields);
    const B = this.concatFields(parB, fields);

    if (A > B ) {
      return type === 'up' ?  -1 : 1;
    }
    if (B > A ) {
      return type === 'up' ?  1 : -1;
    };
    return 0
  }

  find(source: any[], objSearch: any) {
    const fields = Object.keys(objSearch);

    let searchCondition = this.concatFields(objSearch, fields);
    return source.find( value => this.concatFields(value, fields) === searchCondition)
  }

  filter(source: any[], objSearch: any) {
    console.log('TCL: ArrayService -> filter -> objSearch', objSearch)
    console.log('TCL: ArrayService -> filter -> source', source)
    const fields = Object.keys(objSearch);
    console.log('TCL: ArrayService -> filter -> fields', fields)

    let searchCondition = this.concatFields(objSearch, fields);
    return source.filter( value => this.concatFields(value, fields) === searchCondition)
  }

}



/*

   --- ALGUNAS PRUEBAS ---
const contarArray = this.arrayService.groupAndCount(todasLasDistancias, ['embarcacion','distancia']);
    const sumarArray = this.arrayService.groupAndSum(todasLasDistancias, ['embarcacion','distancia'], 'distancia');
*/