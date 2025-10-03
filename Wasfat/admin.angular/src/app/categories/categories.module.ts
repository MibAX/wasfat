import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CrudCategoryComponent } from './crud-category/crud-category.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CrudCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
