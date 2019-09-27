import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicializarComponent } from './inicializar.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: InicializarComponent}
];

@NgModule({
  declarations: [InicializarComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class InicializarCompetenciaModule { }
