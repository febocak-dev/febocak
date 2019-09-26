import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportarInscripcionesComponent } from './importar-inscripciones.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ImportarInscripcionesComponent}
];

@NgModule({
  declarations: [ImportarInscripcionesComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ImportarInscripcionesModule { }
