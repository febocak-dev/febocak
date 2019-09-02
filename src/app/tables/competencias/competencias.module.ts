import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetenciasRoutingModule } from './competencias-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompetenciasComponent } from './components/competencias.component';
import { CompetenciasFormComponent } from './components/competencias-form.component';

@NgModule({
  declarations: [ CompetenciasComponent, CompetenciasFormComponent ],
  imports: [
    CommonModule, CompetenciasRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class CompetenciasModule { }
