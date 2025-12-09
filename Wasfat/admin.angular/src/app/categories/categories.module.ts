import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';

@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
