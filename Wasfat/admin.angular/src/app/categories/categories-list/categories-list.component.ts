import { Component, OnInit } from '@angular/core';
import { CategoryAdminService, CategoryDto } from '@proxy/categories';
import { GetAllRecipesInputDto } from '@proxy/recipes';
import { RECIPE_QUERY_PARAMS } from 'src/app/shared/constants/query-params.constants';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: CategoryDto[] = [];
  
  constructor(private categoryAdminSvc: CategoryAdminService) {

  }

  ngOnInit(): void {
    console.log("CategoriesListComponent > ngOnInit");
    this.categoryAdminSvc.getAllCategories().subscribe(data => this.categories = data);
  }

  getQueryParams(categoryId: number): GetAllRecipesInputDto {
    return {
      [RECIPE_QUERY_PARAMS.CATEGORY_ID]: categoryId
    }
  }
}
