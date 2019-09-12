import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeResolver } from '@core/home/home-resolver.guard';
import { HomeComponent } from '@core/home/home.component';
import { ErrorComponent } from '@core/error/error.component';
import { LoginComponent } from '@core/login/login.component';
import { NotFoundComponent } from '@core/not-found/not-found.component';


const routes: Routes = [
  { path: 'home', resolve: { competenciaData: HomeResolver }, component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', loadChildren: () => import('./tables/usuarios/usuarios.module').then(m => m.UsuariosModule)},
  { path: 'categorias', loadChildren: './tables/categorias/categorias.module#CategoriasModule' },
  { path: 'clubes', loadChildren: () => import('./tables/clubes/clubes.module').then(m => m.ClubesModule) },
  { path: 'competencias', loadChildren: () => import('./tables/competencias/competencias.module').then(m => m.CompetenciasModule) },
  { path: 'distancias', loadChildren: () => import('./tables/distancias/distancias.module').then(m => m.DistanciasModule) },
  { path: 'palistas', loadChildren: () => import('./tables/palistas/palistas.module').then(m => m.PalistasModule) },
  { path: 'inscripciones', loadChildren: () => import('./procedures/inscripciones/inscripciones.module').then(m => m.InscripcionesModule) },
  { path: 'backup', loadChildren: () => import('./util/backup/backup.module').then(m => m.BackupModule) }
  // { path: '**', component: NotFoundComponent }
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
