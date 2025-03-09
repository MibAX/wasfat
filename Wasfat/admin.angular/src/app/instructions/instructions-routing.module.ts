import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsListComponent } from './instructions-list/instructions-list.component';
import { CrudInstructionComponent } from './crud-instruction/crud-instruction.component';

const routes: Routes = [
  {
    path: 'list',
    component: InstructionsListComponent,
  },
  {
    path: 'create',
    component: CrudInstructionComponent,
  },
  {
    path: 'edit/:id',
    component: CrudInstructionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionsRoutingModule { }
