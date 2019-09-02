import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './components/categorias.component';
import { CategoriasFormComponent } from './components/categorias-form.component';

import { CategoriasResolver } from './categorias-resolver.guard';
import { CategoriasFormResolver } from './categorias-form-resolver.guard';

const routes: Routes = [
  { 
    path: '', 
    resolve: { categoriaData: CategoriasResolver }, 
    component: CategoriasComponent
  },
  { 
    path: ':action', 
    resolve: { categoriaData: CategoriasFormResolver }, 
    component: CategoriasFormComponent
  },
  { 
    path: ':action/:id', 
    resolve: { categoriaData: CategoriasFormResolver }, 
    component: CategoriasFormComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
