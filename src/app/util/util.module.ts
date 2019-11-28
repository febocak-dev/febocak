import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilRoutingModule } from './util-routing.module';
import { UtilMenuComponent } from './util-menu/util-menu.component';
import { FormsModule } from '@angular/forms';

import { BackupModule } from './backup/backup.module';
import { RestoreModule } from './restore/restore.module';
import { AddFieldToTableComponent } from './add-field-to-table/add-field-to-table.component';
import { ImportarPalistasModule } from './importar-palistas/importar-palistas.module';
import { CopiarDistanciasModule } from './copiar-distancias/copiar-distancias.module';


@NgModule({
  declarations: [UtilMenuComponent, AddFieldToTableComponent],
  imports: [
    CommonModule,
    UtilRoutingModule,
    FormsModule,
    BackupModule,
    RestoreModule,
    ImportarPalistasModule,
    CopiarDistanciasModule
  ]
})
export class UtilModule { }
