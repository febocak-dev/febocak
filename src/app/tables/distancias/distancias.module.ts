import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistanciasRoutingModule } from './distancias-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DistanciasComponent } from './components/distancias.component';
import { DistanciasFormComponent } from './components/distancias-form.component';
import { TipoDeCompetenciaInfoComponent } from './components/tipo-de-competencia-info.component';

@NgModule({
  declarations: [ DistanciasComponent, DistanciasFormComponent, TipoDeCompetenciaInfoComponent ],
  imports: [
    CommonModule, DistanciasRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class DistanciasModule { }
