import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubesComponent } from './components/clubes.component';
import { ClubesFormComponent } from './components/clubes-form.component';
import { ClubesResolver } from './clubes-resolver.guard';
import { ClubesFormResolver } from './clubes-form-resolver.guard';

const routes: Routes = [
  { path: '', resolve: { clubData: ClubesResolver }, component: ClubesComponent},
  { path: ':action', resolve: { clubData: ClubesFormResolver }, component: ClubesFormComponent },
  { path: ':action/:id', resolve: { clubData: ClubesFormResolver }, component: ClubesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubesRoutingModule { }
