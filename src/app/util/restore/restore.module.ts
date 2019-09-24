import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RestoreComponent } from './restore.component';

const routes: Routes = [
  { path: '', component: RestoreComponent }
];

@NgModule({
  declarations: [RestoreComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class RestoreModule { }
