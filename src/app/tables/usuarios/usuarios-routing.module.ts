import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './components/usuarios.component';
import { UsuariosFormComponent } from './components/usuarios-form.component';
import { UsuariosResolver } from './usuarios-resolver.guard';
import { UsuariosFormResolver } from './usuarios-form-resolver.guard';

const routes: Routes = [
  { path: '', resolve: { usuarioData: UsuariosResolver }, component: UsuariosComponent },
  { path: ':action', resolve: { usuarioData: UsuariosFormResolver }, component: UsuariosFormComponent },
  { path: ':action/:id', resolve: { usuarioData: UsuariosFormResolver }, component: UsuariosFormComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
