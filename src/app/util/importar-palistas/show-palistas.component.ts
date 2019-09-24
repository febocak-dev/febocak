import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { ArrayService } from '@services/array.service';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';

import * as print from 'print-js';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-show-palistas',
  templateUrl: './show-palistas.component.html',
  styles: []
})
export class ShowPalistasComponent implements OnInit {
  showBtnImprimir = true;
  palistas;
  palistas$;
  dataSource$ = this.shareDataService.data$;

  constructor( 
    private actRoute: ActivatedRoute,
    private shareDataService: ShareDataService,
    private arrayService: ArrayService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    const tipo = this.actRoute.snapshot.paramMap.get('tipo');
    this.palistas$ = this.dataSource$.pipe( map( data => data.palistas));
    this.dataSource$.pipe(
      map( data => data.palistas),
    )
    .subscribe( data => this.palistas = data );

  }

  imprimir() {
    print('printJS-table', 'html');
    
  }

}
