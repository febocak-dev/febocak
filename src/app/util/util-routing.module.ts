import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilMenuComponent } from './util-menu/util-menu.component';
import { RestoreComponent } from './restore/restore.component';
import { BackupComponent } from './backup/backup.component';
import { AddFieldToTableComponent } from './add-field-to-table/add-field-to-table.component';
import { ImportarPalistasComponent } from './importar-palistas/importar-palistas.component';
import { CopiarDistanciasComponent } from './copiar-distancias/copiar-distancias.component';

const routes: Routes = [
  {
    path: '', component: UtilMenuComponent,
    children: [
      { path: 'backup', component: BackupComponent },
      { path: 'restore', component: RestoreComponent },
      { path: 'importar-palistas', component: ImportarPalistasComponent },
      { path: 'copiar-distancias', component: CopiarDistanciasComponent },
      { path: 'add-field-to-table', component: AddFieldToTableComponent },
    ]
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilRoutingModule { }

  /* { path: 'backup', loadChildren: () => import('./backup/backup.module').then(m => m.BackupModule) },
  { path: 'restore', loadChildren: () => import('./restore/restore.module').then(m => m.RestoreModule) },
  { path: 'importar-palistas', loadChildren: () => import('./importar-palistas/importar-palistas.module').then(m => m.ImportarPalistasModule) },
  { path: 'copiar-distancias', loadChildren: () => import('./copiar-distancias/copiar-distancias.module').then(m => m.CopiarDistanciasModule) },
 */