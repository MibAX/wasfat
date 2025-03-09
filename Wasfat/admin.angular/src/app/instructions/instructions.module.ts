import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionsRoutingModule } from './instructions-routing.module';
import { InstructionsListComponent } from './instructions-list/instructions-list.component';


@NgModule({
  declarations: [
    InstructionsListComponent
  ],
  imports: [
    CommonModule,
    InstructionsRoutingModule
  ]
})
export class InstructionsModule { }
