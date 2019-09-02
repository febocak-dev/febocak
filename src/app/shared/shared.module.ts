import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareValidatorDirective } from './compare-validator.directive';

@NgModule({
  declarations: [
    CompareValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompareValidatorDirective
  ]
})
export class SharedModule { }
