import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionsRoutingModule } from './instructions-routing.module';
import { InstructionsListComponent } from './instructions-list/instructions-list.component';
import { CrudInstructionComponent } from './crud-instruction/crud-instruction.component';


@NgModule({
  declarations: [
    InstructionsListComponent,
    CrudInstructionComponent
  ],
  imports: [
    CommonModule,
    InstructionsRoutingModule
  ]
})
export class InstructionsModule { }
