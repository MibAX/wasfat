import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsListComponent } from './instructions-list/instructions-list.component';
import { CrudInstructionComponent } from './crud-instruction/crud-instruction.component';

const routes: Routes = [
  {
    path: '',
    component: InstructionsListComponent
  },
  {
    path: 'list',
    component: InstructionsListComponent
  },
  {
    path: 'crud',
    component: CrudInstructionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionsRoutingModule { }
