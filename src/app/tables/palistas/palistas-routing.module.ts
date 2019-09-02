import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalistasComponent } from './components/palistas.component';
import { PalistasFormComponent } from './components/palistas-form.component';
import { PalistasResolver } from './palistas-resolver.guard';
import { PalistasFormResolver } from './palistas-form-resolver.guard';


const routes: Routes = [
  { path: '', resolve: { palistaData: PalistasResolver }, component: PalistasComponent },
  { path: ':action', resolve: { palistaData: PalistasFormResolver }, component: PalistasFormComponent },
  { path: ':action/:id', resolve: { palistaData: PalistasFormResolver }, component: PalistasFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalistasRoutingModule { }
