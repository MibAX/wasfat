import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { CrudIngredientComponent } from './crud-ingredient/crud-ingredient.component';

@NgModule({
  declarations: [
    IngredientsListComponent,
    CrudIngredientComponent
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    SharedModule
  ]
})
export class IngredientsModule { }
