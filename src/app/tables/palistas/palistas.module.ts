import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PalistasRoutingModule } from './palistas-routing.module';

import { PalistasComponent } from './components/palistas.component';
import { PalistasFormComponent } from './components/palistas-form.component';

@NgModule({
  declarations: [PalistasComponent, PalistasFormComponent],
  imports: [
    CommonModule, PalistasRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class PalistasModule { }
