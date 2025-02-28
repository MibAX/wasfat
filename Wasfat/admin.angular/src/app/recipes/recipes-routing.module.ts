import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { CrudRecipeComponent } from './crud-recipe/crud-recipe.component';
import { InstructionsListComponent } from '../instructions/instructions-list/instructions-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: RecipesListComponent,
  },
  {
    path: 'create',
    component: CrudRecipeComponent,
  },
  {
    path: 'edit/:id',
    component: CrudRecipeComponent,
  },
  {
    path: ':id/instructions',
    component: InstructionsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule { }
