import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { EditarSerieComponent } from './editar-serie.component';
import { FiltroSerieComponent } from './filtro-serie.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: EditarSerieComponent }
];

@NgModule({
  declarations: [
    EditarSerieComponent, FiltroSerieComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    MatCardModule, DragDropModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class EditarSerieModule { }
