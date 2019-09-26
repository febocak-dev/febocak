import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolaRoutingModule } from './consola-routing.module';
import { ConsolaComponent } from './components/consola.component';
import { ModalCompetenciaComponent } from './components/modal-competencia.component';
import { ModalDownloadComponent } from './components/modal-download.component';


@NgModule({
  declarations: [ConsolaComponent, ModalCompetenciaComponent, ModalDownloadComponent],
  imports: [
    CommonModule,
    ConsolaRoutingModule
  ]
})
export class ConsolaModule { }
