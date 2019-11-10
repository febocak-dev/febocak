import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeResolver } from '@core/home/home-resolver.guard';
import { HomeComponent } from '@core/home/home.component';
import { ErrorComponent } from '@core/error/error.component';
import { LoginComponent } from '@core/login/login.component';
import { NotFoundComponent } from '@core/not-found/not-found.component';
import { AuthLocalGuard } from '@core/login/authLocal.guard';
import { RedireccionarLoginComponent } from '@core/login/redireccionar-login.component';


const routes: Routes = [
  { path: 'home', resolve: { competenciaData: HomeResolver }, component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthLocalGuard] },
  { path: 'redireccionar-login', component: RedireccionarLoginComponent },
  { path: 'usuarios', loadChildren: () => import('./tables/usuarios/usuarios.module').then(m => m.UsuariosModule)},
  { path: 'categorias', loadChildren: './tables/categorias/categorias.module#CategoriasModule' },
  { path: 'clubes', loadChildren: () => import('./tables/clubes/clubes.module').then(m => m.ClubesModule) },
  { path: 'tipos-de-competencias', loadChildren: () => import('./tables/tipos-de-competencias/tipos-de-competencias.module').then(m => m.TiposDeCompetenciasModule) },
  { path: 'competencias', loadChildren: () => import('./tables/competencias/competencias.module').then(m => m.CompetenciasModule) },
  { path: 'distancias', loadChildren: () => import('./tables/distancias/distancias.module').then(m => m.DistanciasModule) },
  { path: 'palistas', loadChildren: () => import('./tables/palistas/palistas.module').then(m => m.PalistasModule) },
  { path: 'inscripciones', loadChildren: () => import('./procedures/inscripciones/inscripciones.module').then(m => m.InscripcionesModule) },
  { path: 'consola', loadChildren: () => import('./procedures/consola/consola.module').then(m => m.ConsolaModule) },
  { path: 'backup', loadChildren: () => import('./util/backup/backup.module').then(m => m.BackupModule) },
  { path: 'restore', loadChildren: () => import('./util/restore/restore.module').then(m => m.RestoreModule) },
  { path: 'importar-palistas', loadChildren: () => import('./util/importar-palistas/importar-palistas.module').then(m => m.ImportarPalistasModule) },
  { path: 'inicializar-competencia', loadChildren: () => import('./competencias/inicializar-competencia/inicializar-competencia.module').then(m => m.InicializarCompetenciaModule)},
  { path: 'importar-inscripciones', loadChildren: () => import('./competencias/importar-inscripciones/importar-inscripciones.module').then(m => m.ImportarInscripcionesModule)},
  { path: 'generar-series', loadChildren: () => import('./competencias/generar-series/generar-series.module').then(m => m.GenerarSeriesModule)},
  { path: 'editar-serie', loadChildren: () => import('./competencias/editar-serie/editar-serie.module').then(m => m.EditarSerieModule)},
  // { path: '**', component: NotFoundComponent }
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
