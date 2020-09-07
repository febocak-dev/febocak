import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposDeCompetenciasComponent } from './components/tipos-de-competencias.component';
import { TiposDeCompetenciasFormComponent } from './components/tipos-de-competencias-form.component';
import { TiposDeCompeteciasResolver } from './tipos-de-competencias-resolver.guard';
import { TiposDeCompetenciasFormResolver } from './tipos-de-competencias-form-resolver.guard';


const routes: Routes = [
  { 
    path: '', 
    resolve: { tipoDeCompetenciaData: TiposDeCompeteciasResolver }, 
    component: TiposDeCompetenciasComponent
  },
  { 
    path: ':action', 
    resolve: { tipoDeCompetenciaData: TiposDeCompetenciasFormResolver }, 
    component: TiposDeCompetenciasFormComponent
  },
  { 
    path: ':action/:id', 
    resolve: { tipoDeCompetenciaData: TiposDeCompetenciasFormResolver }, 
    component: TiposDeCompetenciasFormComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposDeCompetenciasRoutingModule { }
