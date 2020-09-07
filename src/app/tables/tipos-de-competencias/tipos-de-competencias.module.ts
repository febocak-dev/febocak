import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiposDeCompetenciasRoutingModule } from './tipos-de-competencias-routing.module';
import { TiposDeCompetenciasComponent } from './components/tipos-de-competencias.component';
import { TiposDeCompetenciasFormComponent } from './components/tipos-de-competencias-form.component';

@NgModule({
  declarations: [
    TiposDeCompetenciasComponent, TiposDeCompetenciasFormComponent
  ],
  imports: [
    CommonModule,
    TiposDeCompetenciasRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class TiposDeCompetenciasModule { }
