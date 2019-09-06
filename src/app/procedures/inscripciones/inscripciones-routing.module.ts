import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscripcionesResolver } from './inscripciones-resolver.guard';
import { InscripcionesComponent } from './components/inscripciones.component';
import { InscripcionesFormComponent } from './components/inscripciones-form.component';
import { InscripcionesFormResolver } from './inscripciones-form-resolver.guard';


const routes: Routes = [
  { path: '', resolve: { inscripcionData: InscripcionesResolver }, component: InscripcionesComponent },
  { path: ':action', resolve: { inscripcionData: InscripcionesFormResolver}, component: InscripcionesFormComponent },
  { path: ':action/:id', resolve: { inscripcionData: InscripcionesFormResolver }, component: InscripcionesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
