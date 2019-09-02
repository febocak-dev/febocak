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
  { path: 'usuarios', loadChildren: './tables/usuarios/usuarios.module#UsuariosModule' }, 
  { path: 'categorias', loadChildren: './tables/categorias/categorias.module#CategoriasModule' },
  { path: 'clubes', loadChildren: './tables/clubes/clubes.module#ClubesModule' },
  { path: 'competencias', loadChildren: './tables/competencias/competencias.module#CompetenciasModule' },
  /*
  { path: 'distancias', loadChildren: './tables/distancias/distancias.module#DistanciasModule' },
  { path: 'palistas', loadChildren: './tables/palistas/palistas.module#PalistasModule' }
   */
  // { path: '**', component: NotFoundComponent }
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
