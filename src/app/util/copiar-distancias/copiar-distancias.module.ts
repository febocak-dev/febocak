import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopiarDistanciasComponent } from './copiar-distancias.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CopiarDistanciasComponent }
];

@NgModule({
  declarations: [CopiarDistanciasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CopiarDistanciasModule { }
