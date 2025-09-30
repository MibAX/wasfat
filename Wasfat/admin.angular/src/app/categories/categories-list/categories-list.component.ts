import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryAdminService, CategoryDto } from '@proxy/categories';
import { GetAllRecipesInputDto } from '@proxy/recipes';
import { RECIPE_QUERY_PARAMS } from 'src/app/shared/constants/query-params.constants';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: CategoryDto[] = [];
  
  constructor(
    private categoryAdminSvc: CategoryAdminService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    console.log("CategoriesListComponent > ngOnInit");
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryAdminSvc.getAllCategories().subscribe(data => this.categories = data);
  }

  getQueryParams(categoryId: number): GetAllRecipesInputDto {
    return {
      [RECIPE_QUERY_PARAMS.CATEGORY_ID]: categoryId
    }
  }

  openDialog(categoryId?: number): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '20rem',
      disableClose: true,
      data: { categoryId: categoryId }
    })

    dialogRef.afterClosed().subscribe(() => this.getAllCategories());
  }
}
