import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareValidatorDirective } from './compare-validator.directive';
import { UniqueEmailValidatorDirective } from './unique-email-validator.directive';

@NgModule({
  declarations: [
    CompareValidatorDirective,
    UniqueEmailValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompareValidatorDirective,
    UniqueEmailValidatorDirective
  ]
})
export class SharedModule { }
