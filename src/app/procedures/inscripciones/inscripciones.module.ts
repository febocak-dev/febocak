import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './components/inscripciones.component';
import { InscripcionesFormComponent } from './components/inscripciones-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InscripcionesComponent, InscripcionesFormComponent],
  imports: [
    CommonModule, InscripcionesRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class InscripcionesModule { }
