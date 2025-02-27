import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionsRoutingModule } from './instructions-routing.module';
import { InstructionsListComponent } from './instructions-list/instructions-list.component';
import { CrudInstructionComponent } from './crud-instruction/crud-instruction.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InstructionsListComponent,
    CrudInstructionComponent
  ],
  imports: [
    CommonModule,
    InstructionsRoutingModule,
    SharedModule
  ]
})
export class InstructionsModule { }
