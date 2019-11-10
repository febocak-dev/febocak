import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposDeCompetenciasRoutingModule } from './tipos-de-competencias-routing.module';
import { TiposDeCompetenciasComponent } from './components/tipos-de-competencias.component';
import { TiposDeCompetenciasFormComponent } from './components/tipos-de-competencias-form.component';

console.log('TC module')
@NgModule({
  declarations: [
    TiposDeCompetenciasComponent, TiposDeCompetenciasFormComponent
  ],
  imports: [
    CommonModule,
    TiposDeCompetenciasRoutingModule
  ]
})
export class TiposDeCompetenciasModule { }
