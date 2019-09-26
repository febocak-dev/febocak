import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarSeriesComponent } from './generar-series.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GenerarSeriesComponent}
];

@NgModule({
  declarations: [GenerarSeriesComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class GenerarSeriesModule { }
