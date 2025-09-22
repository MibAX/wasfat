import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';


@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
