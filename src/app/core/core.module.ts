import { NgModule, ErrorHandler  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error/global-error-handler.service';

import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MessageComponent } from './message/message.component';
import { ShellComponent } from './shell/shell.component';
import { NavbarAdminComponent } from './shell/navbar-admin.component';
import { NavbarInscripcionComponent } from './shell/navbar-inscripcion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotFoundComponent, ErrorComponent, 
    SpinnerComponent, MessageComponent,
    ShellComponent, NavbarAdminComponent, NavbarInscripcionComponent,
    HomeComponent, LoginComponent 
  ],
  imports: [
    CommonModule, RouterModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    ShellComponent
  ],
  providers: [
    //{ provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class CoreModule { }
