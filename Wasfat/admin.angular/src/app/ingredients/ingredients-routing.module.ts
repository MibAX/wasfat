import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';

const routes: Routes = [
  {
  path: 'list',
  component: IngredientsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
