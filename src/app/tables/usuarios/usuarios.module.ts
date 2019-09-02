import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { UsuariosComponent } from './components/usuarios.component';
import { UsuariosFormComponent } from './components/usuarios-form.component';

@NgModule({
  declarations: [UsuariosComponent, UsuariosFormComponent],
  imports: [
    CommonModule, UsuariosRoutingModule,
    FormsModule, ReactiveFormsModule,
    SharedModule
  ]
})
export class UsuariosModule { }
