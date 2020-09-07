import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistanciasResolver } from './distancias-resolver.guard';
import { DistanciasFormResolver } from './distancias-form-resolver.guard';

import { DistanciasComponent } from './components/distancias.component';
import { DistanciasFormComponent } from './components/distancias-form.component';

const routes: Routes = [
  { path: '', component: DistanciasComponent },
  { path: ':idTipoDeCompetencia', resolve: { distanciaData: DistanciasResolver }, component: DistanciasComponent },
  { path: ':idTipoDeCompetencia/:action', resolve: { distanciaData: DistanciasFormResolver }, component: DistanciasFormComponent },
  { path: ':idTipoDeCompetencia/:action/:id', resolve: { distanciaData: DistanciasFormResolver }, component: DistanciasFormComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistanciasRoutingModule { }
