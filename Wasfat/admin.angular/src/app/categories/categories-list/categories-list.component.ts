import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryAdminService, CategoryDto } from '@proxy/categories';
import { CrudCategoryComponent } from '../crud-category/crud-category.component';

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
    console.log('CategoriesListComponent > constructor');
  }

  ngOnInit(): void {
    console.log('CategoriesListComponent > ngOnInit');

    this.getAllCategories();
  }

  private getAllCategories(): void {
    this.categoryAdminSvc.getAllCategories().subscribe(data => this.categories = data);
  }
  
  openDialog(categoryId?: number): void {
    const dialogRef = this.dialog.open(CrudCategoryComponent, {
      width: '20rem',
      disableClose: false,
      data: { categoryId: categoryId }
    })

    dialogRef.afterClosed().subscribe(() => this.getAllCategories())
  } 
}
