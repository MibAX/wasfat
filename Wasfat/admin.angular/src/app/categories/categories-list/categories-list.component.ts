import { Component, OnInit } from '@angular/core';
import { CategoryAdminService, CategoryDto } from '@proxy/categories';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: CategoryDto[] = [];

  constructor(
    private categoryAdminSvc: CategoryAdminService
  ) {
    console.log('CategoriesListComponent > constructor');
  }

  ngOnInit(): void {
    console.log('CategoriesListComponent > ngOnInit');

    this.categoryAdminSvc.getAllCategories().subscribe(data => this.categories = data);
  }
}
