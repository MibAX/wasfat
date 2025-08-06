import { NgModule } from '@angular/core';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { CrudRecipeComponent } from './crud-recipe/crud-recipe.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RecipesListComponent,
    CrudRecipeComponent
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
