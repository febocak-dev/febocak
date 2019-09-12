import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BackupComponent } from './backup.component';

const routes: Routes = [
  { path: '', component: BackupComponent }
];
@NgModule({
  declarations: [BackupComponent],
  imports: [ 
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class BackupModule { }