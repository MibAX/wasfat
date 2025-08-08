import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { CrudRecipeComponent } from './crud-recipe/crud-recipe.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule { }
