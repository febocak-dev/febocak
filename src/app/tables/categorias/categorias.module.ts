import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing.module';

import { CategoriasComponent } from './components/categorias.component';
import { CategoriasFormComponent } from './components/categorias-form.component';

@NgModule({
  declarations: [CategoriasComponent, CategoriasFormComponent],
  imports: [
    CommonModule, CategoriasRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class CategoriasModule { }
