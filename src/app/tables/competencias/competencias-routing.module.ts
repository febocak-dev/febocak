import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetenciasResolver } from './competencias-resolver.guard';
import { CompetenciasComponent } from './components/competencias.component';

import { CompetenciasFormResolver } from './competencias-form-resolver.guard';
import { CompetenciasFormComponent } from './components/competencias-form.component';

const routes: Routes = [
  { path: '', resolve: { competenciaData: CompetenciasResolver }, component: CompetenciasComponent },
  { path: ':action', resolve: { competenciaData: CompetenciasFormResolver }, component: CompetenciasFormComponent },
  { path: ':action/:id', resolve: { competenciaData: CompetenciasFormResolver }, component: CompetenciasFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenciasRoutingModule { }
