import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubesRoutingModule } from './clubes-routing.module';

import { ClubesComponent } from './components/clubes.component';
import { ClubesFormComponent } from './components/clubes-form.component';

@NgModule({
  declarations: [ClubesComponent, ClubesFormComponent],
  imports: [
    CommonModule, ClubesRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ClubesModule { }
