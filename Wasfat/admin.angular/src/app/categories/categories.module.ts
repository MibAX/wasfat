import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryDialogComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
