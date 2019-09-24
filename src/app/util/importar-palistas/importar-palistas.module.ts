import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ImportarPalistasComponent } from './importar-palistas.component';
import { ShowClubesComponent } from './show-clubes.component';
import { DetalleClubComponent } from './detalle-club.component';
import { ShowPalistasComponent } from './show-palistas.component';

const routes: Routes = [
  { path: '', component: ImportarPalistasComponent,
    children: [
      { path: 'show-clubs', component: ShowClubesComponent },
      { path: 'detalle-club/:entidad', component: DetalleClubComponent },
      { path: 'show-palistas/:tipo', component: ShowPalistasComponent }
    ]
  }
];

@NgModule({
  declarations: [ImportarPalistasComponent, ShowClubesComponent, DetalleClubComponent, ShowPalistasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ImportarPalistasModule { }
